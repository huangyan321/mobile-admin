<template>
  <div>
    <div class="title">
      <h1>{{ id ? "编辑" : "创建" }}广告</h1>
    </div>
    <el-form ref="adInfo" :model="adInfo" :rules="rules">
      <el-form-item label="标题" prop="name">
        <el-input v-model="adInfo.name" style="width: 50%"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="adInfo.items.push({})"
          ><i class="el-icon-plus">添加广告</i></el-button
        >
        <el-row type="flex" style="flex-wrap: wrap" :gutter="40">
          <el-col :md="6" v-for="(item, index) in adInfo.items" :key="index">
            <el-button
              size="mini"
              type="danger"
              @click="adInfo.items.splice(index, 1)"
            >
              删除
            </el-button>
            <el-form-item label="跳转链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片上传">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="
                  (res) => {
                    $set(item, 'image', res.url);
                  }
                "
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click.stop.prevent="save"
          style="margin-top: 20px"
          :loading="loading"
        >
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addAd, getOneAd, editOneAd } from "@/api/ad";
import { getCategoryList } from "@/api/category";
export default {
  props: {
    id: {
      type: String,
    },
  },
  created() {
    this.id ? this.getAd() : "";
  },
  data() {
    return {
      newsList: [],
      parentsList: [],
      adInfo: {
        name: "",
        categories: [],
      },
      rules: {
        name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            min: 1,
            message: "至少1个字符",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  mounted() {},

  methods: {
    save() {
      this.$refs.adInfo.validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        if (this.id) {
          var res = await editOneAd(this.id, this.adInfo);
        } else {
          var res = await addAd(this.adInfo);
        }
        res
          ? (() => {
              this.$notify.success("请求成功");
              this.$router.replace("/ad/list");
            })()
          : this.$notify.err("请求失败");
        this.loading = false;
      });
    },
    async getAd() {
      let res = await getOneAd(this.id);
      this.adInfo = Object.assign({}, this.adInfo, res);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>