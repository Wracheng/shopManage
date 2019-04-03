// 引入 axios
/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      usersList: [
        {
          username: "王小虎",
          email: "123123123@qq.com",
          mobile: "1231231"
        }
      ],
      // 总个数
      total: 0,
      // 当前页
      pagenum: 1,
      // 查询内容
      searchText: ""
    };
  },
  created() {
    this.loadUsersList();
  },
  methods: {
    // 加载用户数据
    async loadUsersList(pagenum = 1, query = "") {
      // pagenum = pagenum || 1;
      const URL = "http://localhost:8888/api/private/v1/users";
      const opts = {
        params: {
          query,
          pagenum,
          pagesize: 2
        },
        headers: {
          Authorization: localStorage.getItem("token")
        }
      };

      let res = await axios.get(URL, opts);
      console.log(res);
      this.usersList = res.data.data.users;
      // 给总个数赋值
      this.total = res.data.data.total;
      // 当前页
      this.pagenum = res.data.data.pagenum;

      // axios.get(URL, opts).then(res => {
        // console.log(res);
        // this.usersList = res.data.data.users;
        // // 给总个数赋值
        // this.total = res.data.data.total;
        // // 当前页
        // this.pagenum = res.data.data.pagenum;
      // });
    },
    // 改变页数
    changePage(curPage) {
      // console.log('页码改变了',curPage);
      this.loadUsersList(curPage, this.searchText);
    },
    // 开始查询
    startQuery() {
      console.log(this.searchText);
      // 获取查询内容的第一页数据
      this.loadUsersList(1, this.searchText);
    }
  }
};
