<template>
  <div>
    <!-- 用户列表区域 -->
    <template>
      <el-table :data="categoryList" style="width: 100%" stripe border>
        <el-table-column label="序号" prop="_id" />
        <el-table-column label="上级分类" prop="parent.name" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              :loading="loading"
              @click="$router.push(`/category/edit/${scope.row._id}`)"
            >
              修改
            </el-button>
            <el-button
              type="primary"
              :loading="loading"
              size="mini"
              @click="remove(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { getCategoryList, deleteOneCategory } from "@/api/category";
export default {
  name: "category",
  data() {
    return {
      categoryList: [],
      loading: false,
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    async getList() {
      let res = await getCategoryList();
      this.categoryList = res;
    },
    remove(row) {
      this.loading = true
      this.$confirm(`是否确定删除分类${row.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(async () => {
        const res = await deleteOneCategory(row._id);
        res.success
          ? (() => {
              this.$notify.success("删除成功");
              this.getList();
            })()
          : this.$notify.error("删除失败");
      });
      this.loading = false
    },
  },
};
</script>
<style lang="scss" scoped>
</style>