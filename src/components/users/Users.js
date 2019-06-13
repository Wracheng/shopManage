// 引入 axios
/* eslint-disable-next-line */
export default {
  data () {
    return {
      usersList: [
        {
          username: '王小虎',
          email: '123123123@qq.com',
          mobile: '1231231'
        }
      ],
      // 总个数
      total: 0,
      // 当前页
      pagenum: 1,
      // 查询内容
      searchText: '',
      // // 用户状态
      // mg_state : true
      // 显示添加用户对话框
      dialogAddUserVisible: false,
      // 添加用户 表单对象
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 校验规则
      rules: {
        username: [
          // 如果文本不写内容会触发
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // 格式不正确会 触发
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          // 如果文本不写内容会触发
          { required: true, message: '请输入密码', trigger: 'blur' },
          // 格式不正确会 触发
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          // 格式不正确会 触发
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        mobile: [
          // 格式不正确会 触发
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '手机格式不正确',
            trigger: 'blur'
          }
        ]
      },
      // 显示编辑用户对话框
      dialogEditUserVisible: false,
      // 编辑用户表单对象
      editUserForm: {
        username: '马哥',
        email: '',
        mobile: '',
        id: 0
      },
      // 分配角色 : 是否显示分配角色对话框
      dialogAssignRoleVisible: false,
      // 分配角色表单对象
      assignRoleForm: {
        username: '测试',
        // 角色id
        rid: '',
        // 用户id
        id: ''
      },
      // 角色列表
      rolesList: []
    }
  },
  created () {

    // 获取url路径下的页码
    const curpage = this.$route.params.page
    console.log(curpage);

    this.loadUsersList(curpage)
    this.loadRolesList()
  },
  methods: {
    // 加载用户数据
    async loadUsersList (pagenum = 1, query = '') {
      // pagenum = pagenum || 1;
      const URL = 'users'
      const opts = {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
      }

      let res = await this.$axios.get(URL, opts)
      console.log(res)
      this.usersList = res.data.data.users
      // 给总个数赋值
      this.total = res.data.data.total
      // 当前页
      this.pagenum = res.data.data.pagenum

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
    changePage (curPage) {
      // console.log('页码改变了',curPage);
       // 通过编程式导航跳转
      this.$router.push('/users/'+curPage)
      this.loadUsersList(curPage, this.searchText)
    },
    // 开始查询
    startQuery () {
      console.log(this.searchText)
      // 获取查询内容的第一页数据
      this.loadUsersList(1, this.searchText)
    },
    /**
     * 改变状态
     */
    async changeState (row) {
      // 1. 获取id 和 mg_state
      const { id, mg_state: mgState } = row

      // put(url地址, 请求参数, 配置项)
      // put(url地址 ,null, 请求头 )
      let res = await this.$axios.put(`users/${id}/state/${mgState}`)
      // let res = await this.$axios.put(
      //   `users/${id}/state/${mgState}`,
      //   null,
      //   {
      //     headers: {
      //       Authorization: localStorage.getItem('token')
      //     }
      //   }
      // )

      // console.log(res)
      if (res.data.meta.status === 200) {
        // 提示更新状态成功
        this.$message({
          message: '更新状态成功',
          type: 'success',
          duration: 800
        })
      }
    },
    /**
     * 删除用户
     */
    async delUser (id) {
      // 确定窗口
      try {
        await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        // 发送删除用户请求
        let res = await this.$axios.delete('users/' + id)
        console.log(res)

        if (res.data.meta.status === 200) {
          // 1. 给个提示 删除 成功
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 800
          })
          // 2. 重新刷新列表 (1)
          this.loadUsersList()
        }
      } catch (error) {
        console.log('点击了取消')
        this.$message({
          message: '取消删除',
          type: 'info',
          duration: 800
        })
      }
    },
    /**
     * 显示添加用户对话框
     */
    showAddUserDialog () {
      this.dialogAddUserVisible = true
    },
    /**
     * 添加用户
     */
    async addUser () {
      let res = await this.$axios.post('users', this.addUserForm)
      console.log(res)
      if (res.data.meta.status === 201) {
        // 1. 关闭对话框
        this.dialogAddUserVisible = false
        // 2. 提示添加成功
        this.$message({
          message: '添加用户 成功',
          type: 'success',
          duration: 800
        })
        // 3. 刷新列表
        this.loadUsersList()
      }
    },
    /**
     * 添加用户对话框关闭
     */
    addUserDialogClose () {
      console.log('关闭了')
      // 拿到表单重置
      this.$refs.addUserRef.resetFields()
    },
    /**
     * 显示编辑用户对话框
     */
    showEditUserDialog (row) {
      const { username, email, mobile, id } = row
      this.editUserForm.username = username
      this.editUserForm.email = email
      this.editUserForm.mobile = mobile
      this.editUserForm.id = id

      this.dialogEditUserVisible = true
    },
    /**
     * 编辑用户
     */
    async editUser () {
      const { id, email, mobile } = this.editUserForm

      let res = await this.$axios.put('users/' + id, {
        email,
        mobile
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        // 1. 关闭对话框
        this.dialogEditUserVisible = false
        // 2. 提示更新成功
        this.$message({
          message: '更新成功',
          type: 'success',
          duration: 800
        })
        // 3. 刷新列表  --编辑完成显示当前页
        this.loadUsersList(this.pagenum)
      }
    },
    /**
     * 获取角色列表
     */
    async loadRolesList () {
      let res = await this.$axios.get('roles')
      console.log(res)
      this.rolesList = res.data.data
    },
    /**
     * 显示分配角色对话框
     */
    async showAssignRoleDialog (row) {
      const { username, id } = row

      // 1.用户名
      this.assignRoleForm.username = username

      // 2.用户id
      this.assignRoleForm.id = id

      // 接口 : 用户 id  => 角色id
      // 缺少用户的角色id    ???????
      let res = await this.$axios.get('users/' + id)
      console.log(res.data.data.rid)
      //  rid = -1  , 本来是没有分配过角色的情况 我们希望提示 : 请选择角色  rid = ''
      // 3. 赋值 rid
      this.assignRoleForm.rid =
        res.data.data.rid === -1 ? '' : res.data.data.rid

      this.dialogAssignRoleVisible = true
    },
    /**
     * 开始分配角色
     */
    async startAssignRole () {
      const { id, rid } = this.assignRoleForm

      let res = await this.$axios.put(`users/${id}/role`, {
        rid
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        // 关闭对话框
        this.dialogAssignRoleVisible = false
        // 提示
        this.$message({
          message: '分配角色成功',
          type: 'success',
          duration: 800
        })
        // 刷新列表
        this.loadUsersList(this.pagenum)
      }
    }
  }
}
