export default {
  data () {
    return {
      rolesList: [
        {
          roleName: '主管',
          roleDesc: '技术负责人'
        },
        {
          roleName: '主管',
          roleDesc: '技术负责人'
        }
      ],
      // 是否显示分配权限对话框
      dialogAssignRightsVisible: false,
      // tree的数据
      data2: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        // children : 结构
        children: 'children',
        // label : 显示名称
        label: 'authName'
      },
      // 角色id
      roleId: 0
    }
  },
  created () {
    this.loadRolesList()
    this.loadRightsList()
  },
  methods: {
    // 处理索引
    indexMethod (index) {
      return index
    },
    /**
     * 加载角色列表数据
     */
    async loadRolesList () {
      let res = await this.$axios.get('roles')
      console.log(res)
      this.rolesList = res.data.data
    },
    /**
     * 加载权限列表数据
     */
    async loadRightsList () {
      let res = await this.$axios.get('rights/tree')
      // console.log(res.data.data);
      this.data2 = res.data.data
    },
    /**
     * 显示分配权限对话框
     */
    showAssignRightsDialog (row) {
      // 弹出对话框的时候,把id拿到保存起来
      this.roleId = row.id

      // 1. 展示对话框
      this.dialogAssignRightsVisible = true

      {
        // 2.显示已经拥有的权限  添加商品
        // DOM异步更新
        // 方式1 : 延时器
        // setTimeout(() => {
        //   console.log(this.$refs)
        // }, 1000)
        // 方式2 : nextTick DOM更新完毕自动调用回调
      }

      // 2. 获取当前角色的第三层id
      let keys = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            // console.log(item3.id)
            keys.push(item3.id)
          })
        })
      })

      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(keys)
      })
    },
    /**
     * 发送请求 分配权限
     */
    async startAssignRights () {
      // rids 所有的权限id
      // 半选的 -
      // 选中的 √
      let keys1 = this.$refs.tree.getHalfCheckedKeys()
      let keys2 = this.$refs.tree.getCheckedKeys()
      let keys = [...keys1, ...keys2]
      // [1,2,3]  => "1,2,3"

      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: keys.join(',')
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        // 关闭对话框
        this.dialogAssignRightsVisible = false

        // 刷新列表
        this.loadRolesList()

        // 提示更新成功
        this.$message({
          message: '更新成功',
          type: 'success',
          duration: 800
        })
      }
    }
  }
}
