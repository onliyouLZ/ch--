<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">北湖泵站管理系统</div>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input
                      v-model="loginForm.username"
                      placeholder="用户名"
                      prefix-icon="iconfont icon-yonghutouxiang">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                      type="password"
                      placeholder="密码"
                      v-model="loginForm.password"
                      prefix-icon="iconfont icon-mimasuo"
                      @keyup.enter.native="submitForm('loginForm')">
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button
                      type="primary"
                      @click="submitForm('loginForm')"
                      @keyup.enter.native="submitForm('loginForm')">登录</el-button>
                </div>
                <!--<p class="login-tips">Tips : 用户名和密码随便填。</p>-->
            </el-form>
        </div>
    </div>
</template>

<script>
  export default {
    data: function(){
        return {
          loginForm: {
                username: 'admin',
                password: '1'
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                  this.$http.get("http://localhost:3000/users?name="+this.loginForm.username).then(res=>{
                    if(res.data.length>0){
                      console.info("拉取用户信息成功",res.data);
                      this.$store.commit("LoginByUser",res.data[0]); //store 存储 此处登录没有连接后台 连接后台后以便存储token
                      this.$router.push('/dashboard');
                      this.$message.success("登录成功");
                    }else{
                      this.$message.error("用户不存在");
                      return false;
                    }
                  });
                } else {
                  this.$message.error("登录失败");
                  return false;
                }
            });
        }
    },

  }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>
