<template>
  <div id="login">
    <div class="login">

      <!--logo-->
        <div class="logo">
         <span>Giz</span>
        </div>

      <!--登录表单-->
      <div class="loginT">
        <div class="username">
            <input  placeholder="请输入用户名" v-model="loginForm.username" @focus="loginError = false"/>
        </div>
        <div class="password">
          <input type="password" placeholder="请输密码" v-model="loginForm.password" @focus="loginError = false"/>
          <p v-if="loginError">{{errorMsg}}</p>
        </div>
      </div>

      <!--小操作-->
      <div class="options">
        <div>
          <el-checkbox v-model="checked">记住密码</el-checkbox>
          <a class="forgetPassword">忘记密码？</a>
        </div>
      </div>

      <!--登录-->
      <div class="submitLogin">
        <el-button type="primary" style="margin-top: 20px;width: 400px;" @click="login()">登&#160&#160&#160录</el-button>
      </div>

      <div class="toRegist">
        <el-button  style="margin-top: 20px;width: 400px;clear: both">注&#160&#160&#160册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      checked:false,
      loginError:false,
      errorMsg:"请输入用户名和密码！",
      loginForm:{
        username:"",
        password:"",
      }
    }
  },
  beforeRouteEnter:(to,from,next) => {
    //组件内守卫
    //已登录状态回到登录界面，即 登出
    next(vm => {
      vm.$cookie.delete("token");
    });
  },
  methods:{
    // 登录
    login:function () {
      let that = this;
      // 检查表单
      if (that.loginForm.username == "" || that.loginForm.password == ""){
          that.loginError = true;
      } else{
        this.$axios.post('/auth',
        {
          "password": that.loginForm.password,
          "username": that.loginForm.username,
        }
        )
          .then(res => {
            console.log(res);
            if (res.data.code == 1){
              // 登录成功
              that.$cookie.set("token",res.data.data.token);
              that.$router.push({path:'/index'});
            }else {
              that.errorMsg = res.data.msg;
              that.loginError = true;
            }
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
  }
}
</script>

<style scoped>
#login{
  width: 100%;
  height: 100%;
  position: relative;
}
  .login{
    width: 40%;
    /*height: 600px;*/
    display: flex;
    margin-left: auto;
    margin-right: auto;
    flex: 1;
    /*text-align: center;*/
    /*border: 1px red dashed;*/
    flex-direction:column;
  }
  .login .logo{
    margin-top: 60px;
    text-align: center;
  }
  /*.login .logo span{*/
    /*font-size: 100px;*/
    /*font-weight: 600;*/
    /*color: green;*/
    /*display: block;*/
  /*}*/
.login .logo span:first-letter{
  font-size: 120px;
}
.login .logo span{
  font-size: 100px;
  font-weight: 600;
  display: block;
  /*color: #00a000;*/
  /*linear-gradient(to left, #00a000, transparent );*/
  background: -webkit-linear-gradient(left top, #409eff, #ece5f5);
  -webkit-background-clip: text;
  color: transparent;
}
 .login .loginT{
   text-align: center;
 }

  .login .loginT .username input{
    height: 40px;
    width: 400px;
    border-bottom: 1px solid #dbdbdb;
    border-top:0px;
    border-left:0px;
    border-right:0px;
    outline: none;
  }
.login .loginT .password input{
  height: 40px;
  margin-top: 20px;
  width: 400px;
  border-bottom: 1px solid #dbdbdb;
  border-top:0px;
  border-left:0px;
  border-right:0px;
  outline: none;
}
.login .options{
  margin-top: 20px;
}
.login .forgetPassword{
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  float: right;
}
.login .options div{
  width: 400px;
  margin: 0 auto;
}
  .login .submitLogin{
  text-align: center;
  }
 .login .toRegist{
   text-align: center;
 }
  .login .loginT .password p{
    font-size: 10px;
    color: red;
  }
</style>
