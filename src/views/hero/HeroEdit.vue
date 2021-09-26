<template>
  <div>
    <div class="title">
      <h1>{{ id ? "编辑" : "创建" }}英雄</h1>
    </div>
    <el-form ref="heroInfo" :model="heroInfo" :rules="rules">
      <el-form-item label="名称" prop="name">
        <el-input v-model="heroInfo.name"> </el-input>
      </el-form-item>
      <el-form-item label="称号" prop="name">
        <el-input v-model="heroInfo.title"> </el-input>
      </el-form-item>
      <el-form-item label="职业" prop="name">
        <el-select v-model="heroInfo.categories" multiple placeholder="请选择">
          <el-option
            v-for="item in occupationList"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="heroInfo.avatar" :src="heroInfo.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
import {addHero, getOneHero, editOneHero } from "@/api/hero";
import {getCategoryList} from "@/api/category"
export default {
  props: {
    id: {
      type: String,
    },
  },
  created() {
    this.id ? this.getOneHero() : "";
    this.getList();
  },
  data() {
    return {
      occupationList: [],
      heroInfo: {
        name: "",
        avatar: "",
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
      this.$refs.heroInfo.validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        if (this.id) {
          var res = await editOneHero(this.id, this.heroInfo);
        } else {
          var res = await addHero(this.heroInfo);
        }
        res
          ? (() => {
              this.$notify.success("请求成功");
              this.$router.replace("/hero/list");
            })()
          : this.$notify.err("请求失败");
        this.loading = false;
      });
    },
    async getOneHero() {
      let res = await getOneHero(this.id);
      this.heroInfo = res;
    },
    handleAvatarSuccess(res) {
      this.heroInfo.avatar = res.url;
    },
    async getList() {
      let res = await getCategoryList();
      this.occupationList = res.filter(item => {
       return item.parent ? item.parent.name === "职业" : ""
      })
    }
  },
    TODO

};
</script>
<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>