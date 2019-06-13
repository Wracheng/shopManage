/* eslint-disable */
export default {
  data() {
    return {
      // 控制步骤条
      activeStep: 1,
      // 控制标签页
      activeName: 'one',
      // 添加商品对象
      goodsAddForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: [],
        goods_isPromotion : false
      },
      defaultProps: {
        label: 'cat_name',
        value : 'cat_id'
      },
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
      ]
    }
  },
  created() {
    this.loadCatList()
  },
  methods: {
    // 点击了标签页
    clickTabs(el) {
      console.log(el.index)
      this.activeStep = +el.index + 1
    },
    // 下一步
    next(name, index) {
      this.activeName = name
      this.activeStep = index
    },
    // 获取所有的分类
    async loadCatList() {
      let res = await this.$axios.get('categories', {
        params: {
          type: 3
        }
      })
      console.log(res.data.data)
      this.options = res.data.data
    }
  }
}
