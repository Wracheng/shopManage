
<template>
  <div>
    <el-button plain type='success' @click="$router.push('/goods-add')" >添加商品</el-button>
    <el-table :data="goodsList" style="width: 100%">
      <el-table-column prop="goods_name" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="goods_price" label="商品价值" width="180"></el-table-column>
      <el-table-column prop="goods_number" label="商品数量"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.add_time | dateFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
/* eslint-disable */
import moment from "moment";

export default {
  data() {
    return {
      goodsList: []
    };
  },
  created() {
    this.loadGoodsList();
  },
  methods: {
    // 加载商品数据
    async loadGoodsList() {
      let res = await this.$axios.get("goods", {
        params: {
          query: "",
          pagenum: 1,
          pagesize: 4
        }
      });
      console.log(res);
      this.goodsList = res.data.data.goods;
    }
  },
  filters: {
    dateFilter(res) {
      return moment(res).format("YYYY-MM-DD hh:mm:ss");


    }
  }
};
</script>

<style>
</style>
