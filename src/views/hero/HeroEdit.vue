<template>
  <div>
    <div class="title">
      <h1>{{ id ? "编辑" : "创建" }}英雄</h1>
    </div>
    <el-form ref="heroInfo" :model="heroInfo" :rules="rules">
      <el-tabs type="border-card" value="基本信息">
        <el-tab-pane label="基本信息" name="基本信息">
          <el-form-item label="名称" prop="name">
            <el-input v-model="heroInfo.name"> </el-input>
          </el-form-item>
          <el-form-item label="称号" prop="name">
            <el-input v-model="heroInfo.title"> </el-input>
          </el-form-item>
          <el-form-item label="职业" prop="name">
            <el-select
              v-model="heroInfo.categories"
              multiple
              placeholder="请选择职业"
            >
              <el-option
                v-for="item in occupationList"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度" prop="scores.difficulty">
            <div class="block">
              <el-rate
                v-model="heroInfo.scores.difficulty"
                show-score
                allow-half
                :max="10"
              ></el-rate>
            </div>
          </el-form-item>
          <el-form-item label="技巧" prop="scores.skills">
            <div class="block">
              <el-rate
                v-model="heroInfo.scores.skills"
                show-score
                allow-half
                :max="10"
              ></el-rate>
            </div>
          </el-form-item>
          <el-form-item label="攻击" prop="scores.attack">
            <div class="block">
              <el-rate
                v-model="heroInfo.scores.attack"
                show-score
                allow-half
                :max="10"
              ></el-rate>
            </div>
          </el-form-item>
          <el-form-item label="生存" prop="scores.survive">
            <div class="block">
              <el-rate
                v-model="heroInfo.scores.survive"
                show-score
                allow-half
                :max="10"
              ></el-rate>
            </div>
          </el-form-item>
          <el-form-item label="顺风出装" prop="name">
            <el-select
              v-model="heroInfo.itemsD"
              multiple
              placeholder="请选择装备"
            >
              <el-option
                v-for="item in itemList"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装" prop="name">
            <el-select
              v-model="heroInfo.itemsU"
              multiple
              placeholder="请选择装备"
            >
              <el-option
                v-for="item in itemList"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧" prop="usageTips">
            <el-input type="textarea" v-model="heroInfo.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧" prop="battleTips">
            <el-input type="textarea" v-model="heroInfo.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路" prop="meleeTips">
            <el-input type="textarea" v-model="heroInfo.meleeTips"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img
                v-if="heroInfo.avatar"
                :src="heroInfo.avatar"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-button
            type="primary"
            @click.stop.prevent="save"
            style="margin-top: 20px"
            :loading="loading"
          >
            保存
          </el-button>
        </el-tab-pane>
        <el-tab-pane name="英雄技能" label="英雄技能">
          <el-button type="text" @click="heroInfo.skills.push({})"
            ><i class="el-icon-plus">添加技能</i></el-button
          >
          <el-row type="flex" style="flex-wrap: wrap" :gutter="40">
            <el-col
              :md="6"
              v-for="(item, index) in heroInfo.skills"
              :key="index"
            >
              <el-button
                size="mini"
                type="danger"
                @click="heroInfo.skills.splice(index, 1)"
              >
                删除
              </el-button>
              <el-form-item label="名称">
                <el-input v-model="item.name"> </el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="
                    (res) => {
                      $set(item, 'icon', res.url);
                    }
                  "
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips"> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-button
            type="primary"
            @click.stop.prevent="save"
            style="margin-top: 20px"
            :loading="loading"
          >
            保存
          </el-button>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>
<script>
import { addHero, getOneHero, editOneHero } from "@/api/hero";
import { getCategoryList } from "@/api/category";
import { getItemList } from "@/api/item";
export default {
  props: {
    id: {
      type: String,
    },
  },
  created() {
    this.id ? this.getOneHero() : "";
    this.getCategoryList();
    this.getItemList();
  },
  data() {
    return {
      occupationList: [],
      itemList: [],
      heroInfo: {
        name: "",
        avatar: "",
        scores: {},
        itemsD: [],
        itemsU: [],
        skills: {},
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
      // console.log(res);
      //assign后面的对象覆盖前面的对象
      this.heroInfo = Object.assign({}, this.heroInfo, res);
    },
    handleAvatarSuccess(res) {
      this.heroInfo.avatar = res.url;
    },
    handleIconSuccess(res) {
      console.log(res);
      // this.heroInfo.skills[index].icon = res.url
    },
    async getCategoryList() {
      const { data } = await getCategoryList();
      this.occupationList = data.filter((item) => {
        return item.parent ? item.parent.name === "职业" : "";
      });
    },
    async getItemList() {
      let res = await getItemList();
      this.itemList = res.data;
    },
  },
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