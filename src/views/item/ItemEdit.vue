<template>
  <div>
    <div class="title">
      <h1>{{ id ? "编辑" : "创建" }}物品</h1>
    </div>
    <el-form ref="itemInfo" :model="itemInfo" :rules="rules">
      <el-form-item label="物品名称" prop="name">
        <el-input v-model="itemInfo.name"> </el-input>
      </el-form-item>
      <el-form-item label="物品图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :headers="getHeaders()"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="itemInfo.icon" :src="itemInfo.icon" class="avatar" />
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
import { getItemList, addItem, getOneItem, editOneItem } from "@/api/item";
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
        icon: ""
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
    handleAvatarSuccess(res) {
      this.$set(this.itemInfo,'icon',res.url)
    }
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