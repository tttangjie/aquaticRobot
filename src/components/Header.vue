<template>
  <div>
    <header>
      <span>欢迎您，{{role}} {{username}}</span>
      <el-dropdown @command="handleCommand">
        <img class="image-style el-dropdown-link"
             :src="imageURL"/>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>
            <div class="display_info">
              <img :src="imageURL"/>
              <div>
                <p>{{username}}</p>
                <p>{{role}}</p>
              </div>
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="info" v-show="role !== '超级管理员'">个人空间</el-dropdown-item>
          <el-dropdown-item command="image" v-show="role === '超级管理员'">修改头像</el-dropdown-item>
          <el-dropdown-item command="pwd" v-show="role === '超级管理员'">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span @click="toLogin"class="exit">【退出】</span>
    </header>

    <el-dialog title="修改密码"
               :visible.sync="showModifyPWDDialog"
               width="450px">
      <el-form :model="PWDForm" size="mini" :rules="pwdRules">
        <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldPassword">
          <el-input v-model="PWDForm.oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
          <el-input v-model="PWDForm.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="againPassword">
          <el-input v-model="PWDForm.againPassword" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="plain_button" @click="showModifyPWDDialog = false">取 消</el-button>
        <el-button class="normal_button" @click="modifyPWD">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改头像"
               :visible.sync="showModifyHeadImageDialog"
               width="300px"
               @closed="handleImageClose">
          <el-upload
            class="avatar-uploader"
            :action="GLOBAL.Base_URL"
            :auto-upload="false"
            :on-change="handleImageChange"
            :show-file-list="false"
            style="text-align: center;"
            v-if="showModifyHeadImageDialog">
            <img v-if="modifyImageURL" :src="modifyImageURL" class="avatar" >
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button class="plain_button" @click="showModifyHeadImageDialog = false">取 消</el-button>
        <el-button class="normal_button" @click="modifyHeadImage">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "appHeader",
        data() {
          let validatorCheckPWD = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.PWDForm.newPassword) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
          return{
            role:'',
            username:this.$cookie.get('username'),
            image:this.$cookie.get('image'),
            imageURL:'',
            modifyImageURL:'',
            formLabelWidth:'120px',
            personalInfoForm:{},
            showModifyPWDDialog:false,
            showModifyHeadImageDialog:false,
            PWDForm:{
              oldPassword:'',
              newPassword:'',
              againPassword:'',
            },
            pwdRules:{
              oldPassword: [
                { required: true, message: '请输入原密码', trigger: 'blur' },
              ],
              newPassword: [
                { required: true, message: '请输入新密码', trigger: 'blur' },
              ],
              againPassword: [
                { required:true, validator: validatorCheckPWD, trigger: 'blur' },
              ],
            },
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
            modifyPWD() {
              for(let item in this.PWDForm) {
                if(this.PWDForm[item].length === 0)
                  return;
              }
              if(this.PWDForm.newPassword !== this.PWDForm.againPassword)
                return;
              this.$axios.put('/user/password?oldPassword='+this.PWDForm.oldPassword+'&newPassword='+this.PWDForm.newPassword)
                .then((res) => {
                  if(res.data.code === 1) {
                    this.$message({
                      message:'密码修改成功，即将跳转至登录界面..',
                      type:'success'
                    })
                    setTimeout(() => {
                      this.toLogin();
                    }, 2000)
                  }
                })
            },
            handleImageChange(file) {
              this.modifyImageURL = URL.createObjectURL(file.raw);
              this.image = file.raw
            },
            handleImageClose() {
              this.modifyImageURL = this.imageURL;
            },
            modifyHeadImage() {
              let formdata = new FormData();
              formdata.append("file",this.image);
              this.$axios.post('/user/image',formdata)
                .then((res) =>{
                  this.$cookie.set('image', res.data.data.image);
                  this.imageURL = res.data.data.image;
                  this.modifyImageURL = this.imageURL;
                  this.showModifyHeadImageDialog = false;
                })
                .catch((err) => {
                  console.log(err)
                })
            },
            handleCommand(command) {
              if(command === 'info') {
                this.$router.push('/personal')
              }else if(command === 'pwd') {
                this.showModifyPWDDialog = true;
              }else if(command === 'image') {
                this.showModifyHeadImageDialog = true;
              }
            }
        },
        mounted(){
          if(this.image.split('/')[this.image.split('/').length-1] === 'null' ) {
            this.imageURL = '../../static/img/default-image.jpg';
            this.modifyImageURL = this.imageURL;
          }
          else {
            this.imageURL = this.image;
            this.modifyImageURL = this.image;
          }
          this.getRole();
        }
    }
</script>

<style scoped>
header{
  width: 100%;
  height: 32px;
/*
  background: rgba(235, 235, 235, 0.4);
*/
  background: linear-gradient(to right, white, rgba(201, 201, 201, 0.4),white);
  text-align: right;
  line-height: 32px;
}
  header span{
    line-height: 32px;
  }
  header a{
    cursor: pointer;
    margin-right: 5%;
  }
  header a:hover{
    color: #9e9e9e;
  }

  .el-dropdown-menu{
    padding: 0;
    margin: 0;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 30px;
  }
  .el-dropdown-menu__item{
    padding: 0;
    margin: 0;
    text-align: center;
  }
  .display_info {
    display: inline-flex;
    padding: 15px 35px;
    background: rgba(70, 140, 233, 0.71);;
    border-top-left-radius: 30px;
    border-top-right-radius: 3px;
  }
  .display_info img {
    width: 66px;
    height: 66px;
    border-radius: 3px;
  }
  .display_info p {
    margin-left: 15px;
  }
  .display_info p:nth-child(1) {
    font-size: 18px;
    line-height: 20px;
    color: #fff;
  }
  .display_info p:nth-child(2) {
    font-size: 14px;
    line-height: 1px;
    color: rgba(255, 255, 255, 0.62);
  }

  .image-style{
    width: 28px;
    height: 28px;
    line-height: 32px;
    border-radius: 90px;
    vertical-align: top;
    cursor: pointer;
    margin: 0 0 0 10px;
  }
  .exit {
    cursor: pointer;
    color: #6d6d6d;
  }
  .exit:hover{
    color: #000;
  }
  /*图片样式*/
  .avatar-uploader-icon {
    font-size: 28px;
    color: #ced5df;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
  .item_img {
    width: 100px;
    height: 100px;
  }
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
</style>
