<template>
  <div>
    <!-- 用户列表区域 -->
    <template>
      <el-table :data="heroList" style="width: 100%" stripe border>
        <el-table-column label="序号" prop="_id" />
        <el-table-column label="物品图标">
        <template slot-scope="scope">
          <div >
            <img
              :src="scope.row.avatar"
              alt=""
              style="width: 50px;height: 50px"
            />
          </div>
        </template>
        </el-table-column>
        <el-table-column label="物品名称" prop="name" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              :loading="loading"
              @click="$router.push(`/hero/edit/${scope.row._id}`)"
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
import { getHeroList, deleteOneHero } from "@/api/hero";
export default {
  name: "hero",
  data() {
    return {
      heroList: [],
      loading: false,
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    async getList() {
      let res = await getHeroList();
      this.heroList = res;
    },
    remove(row) {
      this.loading = true;
      this.$confirm(`是否确定删除分类${row.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(async () => {
        const res = await deleteOneHero(row._id);
        res.success
          ? (() => {
              this.$notify.success("删除成功");
              this.getList();
            })()
          : this.$notify.error("删除失败");
      });
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>