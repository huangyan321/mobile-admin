<template>
  <div>
    <div class="title">
      <h1>{{ id ? "编辑" : "创建" }}分类</h1>
    </div>
    <el-form ref="categoryInfo" :model="categoryInfo" :rules="rules">
      <el-form-item label="上级分类" prop="parent">
        <el-select v-model="categoryInfo.parent" placeholder="请选择父级分类">
          <el-option
            v-for="item in parentsList"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="categoryInfo.name"> </el-input>
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
import {
  getCategoryList,
  addCategory,
  getOneCategory,
  editOneCategory,
} from "@/api/category";
export default {
  props: {
    id: {
      type: String,
    },
  },
  created() {
    this.id ? this.getCategory() : "";
    this.getList();
  },
  data() {
    return {
      parentsList: [],
      categoryInfo: {
        name: "",

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
      this.$refs.categoryInfo.validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        if (this.id) {
          var res = await editOneCategory(this.id, this.categoryInfo);
        } else {
          var res = await addCategory(this.categoryInfo);
        }
        res
          ? (() => {
              this.$notify.success("请求成功");
              this.$router.replace("/category/list");
            })()
          : this.$notify.err("请求失败");
        this.loading = false;
      });
    },
    async getCategory() {
      let res = await getOneCategory(this.id);
      this.categoryInfo = res;
    },
    async getList() {
      let res = await getCategoryList();
      this.parentsList = res.data;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>