
<template>
  <!--
el-form  表单父组件
   :model 表单数据  (对象格式)
    :rules="rules"  校验
    ref="ruleForm" : 注册ref 获取DOM元素/组件
    label-width="100px" 表单子组件里 label的宽度
       - 如果设置了一个尺寸 , 会和表单在一行显示
       - 如果不设置尺寸 , 会放到上面这一行

el-form-item 表单子组件
 label : 标题
 prop="name" 后面校验和重置用到

el-button 按钮组件
type="primary"  颜色 primary(蓝色) success(绿色) 红色(danger)

  -->
  <el-row class="row1" type="flex" justify="center" align="middle">
    <el-col class="col1" :span="8">
      <el-form class="form" :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="startLogin()">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
/* eslint-disable */
import axios from "axios";

export default {
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          // 如果文本不写内容会触发
          { required: true, message: "请输入用户名", trigger: "blur" },
          // 格式不正确会 触发
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          // 如果文本不写内容会触发
          { required: true, message: "请输入密码", trigger: "blur" },
          // 格式不正确会 触发
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 开始登录
    startLogin() {
      // 在 事件中对表单再次校验 (格式)

      this.$refs.ruleForm.validate(async valid => {
        // 如果校验不成功 中止
        if (!valid) {
          return;
        }
        // 校验成功
        // console.log("开始登录");

        let res = await axios.post(
          "http://localhost:8888/api/private/v1/login",
          this.ruleForm
        );
        console.log(res);

        if (res.data.meta.status === 200) {
          //0. 保存token到本地
          // console.log(res.data.data.token);
          localStorage.setItem("token", res.data.data.token);

          //1. 登录成功提示
          this.$message({
            message: res.data.meta.msg,
            type: "success",
            duration: 800
          });
          //2. 跳转到home页面 (编程式导航)
          this.$router.push("/home");
        } else {
          this.$message({
            message: res.data.meta.msg,
            type: "error",
            duration: 800
          });
        }

        // axios
        //   .post("http://localhost:8888/api/private/v1/login", this.ruleForm)
        //   .then(res => {
        //     console.log(res);
        //     if (res.data.meta.status === 200) {
        //       //0. 保存token到本地
        //       // console.log(res.data.data.token);
        //       localStorage.setItem("token", res.data.data.token);

        //       //1. 登录成功提示
        //       this.$message({
        //         message: res.data.meta.msg,
        //         type: "success",
        //         duration: 800
        //       });
        //       //2. 跳转到home页面 (编程式导航)
        //       this.$router.push("/home");
        //     } else {
        //       this.$message({
        //         message: res.data.meta.msg,
        //         type: "error",
        //         duration: 800
        //       });
        //     }
        //   });
      });
    },
    // 重置
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style scoped>
/* 自己加的类 */
.row1 {
  height: 100%;
  background: #2d434c;
}

/* 自己加的类 */
.col1 {
  background: #fff;
  padding: 25px 40px;
  border-radius: 15px;
}

h1 {
  color: red;
}
</style>

