<template>
  <div>
    <div class="title">
      <h1>{{ id ? "编辑" : "创建" }}物品</h1>
    </div>
    <el-form ref="itemInfo" :model="itemInfo" :rules="rules">
      <el-form-item label="物品名称" prop="name">
        <el-input v-model="itemInfo.name"> </el-input>
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
  getItemList,
  addItem,
  getOneItem,
  editOneItem,
} from "@/api/item";
export default {
  props: {
    id: {
      type: String,
    },
  },
  created() {
    this.id ? this.getOneItem() : "";
    // this.getList();
  },
  data() {
    return {
      itemInfo: {
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
      this.$refs.itemInfo.validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        if (this.id) {
          var res = await editOneItem(this.id, this.itemInfo);
        } else {
          var res = await addItem(this.itemInfo);
        }
        res
          ? (() => {
              this.$notify.success("请求成功");
              this.$router.replace("/item/list");
            })()
          : this.$notify.err("请求失败");
        this.loading = false;
      });
    },
    async getOneItem() {
      let res = await getOneItem(this.id);
      this.itemInfo = res;
    },
    // async getList() {
    //   let res = await getItemList();
    //   this.itemInfo = res;
    // },
  },
};
</script>
<style lang="scss" scoped>
</style>