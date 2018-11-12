<template>
    <div>
      <el-row class="personal_header">
        <el-col :span="8" :offset="2">
          <p class="logo" @click="$router.push('/index/robot')">Giz</p>
        </el-col>
        <el-col :span="14">
          <div class="personal_info">
            <span>{{role}} {{username}}</span>
            <img class="image-style"
                 :src="image"/>
            <a @click="toLogin()">【退出】</a>
          </div>
        </el-col>
      </el-row>
      <div class="personal_body">
        <el-tabs tab-position="left" class="tabs_menu"  v-model="activePersonal">
          <el-tab-pane name="modifyInfo">
            <span slot="label"> 个人信息 </span>
            <modify-info></modify-info>
          </el-tab-pane>
          <el-tab-pane name="modifyPWD">
            <span slot="label" > 密码修改 </span>
            <modify-pwd></modify-pwd>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
    import ModifyPWD from './ModifyPWD'
    import ModifyInfo from './ModifyInfo'
    export default {
        name: "Personal",
        components:{
          'modify-pwd':ModifyPWD,
          'modify-info':ModifyInfo,
        },
        data() {
          return{
            activePersonal:'modifyInfo',
            role:'',
            username:this.$cookie.get('username'),
            image:this.$cookie.get('image'),
            imageURL:'',
          }
        },
        methods:{
          toLogin:function () {
            this.$router.push({path:'/'})
          },
          getRole() {
            let role = this.$cookie.get('role').slice(5);
            switch (role) {
              case 'ADMIN':
                this.role = '超级管理员';
                break;
              case 'MANAGER':
                this.role = '一般管理员';
                break;
              case 'TECHNOLOGY':
                this.role = '技术人员';
                break;
              case 'CUSTOMER':
                this.role = '客户';
                break;
              case 'EXPERT':
                this.role = '专家';
                break;
            }
          },
        },
        mounted(){
          if(this.image.split('/')[this.image.split('/').length-1] === 'null' ) {
            this.image = '../../static/img/default-image.jpg';
            this.imageURL = this.image;
          }
          else this.imageURL = this.image;
          this.getRole();
        }
    }
</script>

<style scoped>
  .personal_header{
    background: linear-gradient(to top right, #8e8d8a, #f1f1f0);
  }
  .tabs_menu {
    padding-top: 3%;
    padding-left: 10%;
    height: 100%;
  }

  .logo{
    font-size: 46px;
    font-weight: 600;
    display: block;
    color: #1d4e79;
    margin: 0 ;
  }
  .logo:hover {

  }
  .logo:first-letter{
    font-size: 56px;
    color: #f9f9f9;
  }

  .personal_info {
    line-height: 70px;
    margin-right: 15px;
    float: right;
  }
  .image-style{
    width: 26px;
    height: 26px;
    border-radius: 90px;
    vertical-align: center;
  }
  .personal_info a{
    cursor: pointer;
  }
  .personal_info a:hover{
    color: #9e9e9e;
  }

</style>
