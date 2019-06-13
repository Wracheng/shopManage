export default {
  data () {
    return {
      catList: [],
      // 显示添加分类 对话框
      dialogAddCatVisible: false,
      // 添加分类表单对象
      addCatForm: {
        cat_name: '',
        cat_pid_arr: []
      },
      // 级联选择器的数据
      options: [
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],
      // 配置项
      defaulProps: {
        label: 'cat_name',
        value: 'cat_id'
      }
    }
  },
  created () {
    this.loadCategoriesList()
    this.loadCategoriesList2()
  },
  methods: {
    // 获取分类列表数据 (3级)
    async loadCategoriesList () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 3,
          pagenum: 1,
          pagesize: 4
        }
      })

      console.log(res)
      this.catList = res.data.data.result
    },
    // 获取分类列表数据 (2级)
    async loadCategoriesList2 () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })
      console.log(res)
      this.options = res.data.data
    },
    // 显示添加分类对话框
    showAddCatDialog () {
      this.dialogAddCatVisible = true
    },
    // 添加分类
    async startAddCat () {
      // 1. 把已知数据拿到
      const { cat_name, cat_pid_arr } = this.addCatForm
      // [4.8]

      let res = await this.$axios.post('categories', {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1], // 父类父id  数组最后一个元素
        cat_name,
        cat_level: cat_pid_arr.length // 层级  == 数组的长度
      })

      console.log(res)
      if (res.data.meta.status === 201) {
        // 关闭对话框
        this.dialogAddCatVisible = false
        // 刷新列表
        this.loadCategoriesList()
      }
    }
  }
}
