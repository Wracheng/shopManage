
<template>
  <div>
    <el-breadcrumb class='bread' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="rightsList" style="width: 100%">
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="等级">
        <template slot-scope="scope">
          <span v-if="scope.row.level == 0">一级</span>
          <span v-else-if="scope.row.level==1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      rightsList: [
        {
          authName: "王小虎",
          path: "goods",
          level: "三级"
        }
      ]
    };
  },
  created() {
    this.loadRightsList();
  },
  methods: {
    // 加载权限列表数据
    async loadRightsList() {
      let res = await this.$axios.get("rights/list");
      console.log(res);
      this.rightsList = res.data.data;
    },
    // 处理索引
    // 返回一个参数 index 从0开始的
    indexMethod(index) {
      console.log(index);

      return index;
    }
  }
};
</script>

<style scoped lang='less'>

.bread {
  background: #d4dae0;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
}

</style>
