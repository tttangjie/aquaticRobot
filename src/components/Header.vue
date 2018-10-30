<template>
  <div>
    <header>
      <span>欢迎您，{{role}} {{username}}</span>
      <span v-show="!showDefault">
        <img class="image-style"
             @click="showModifyHeadImageDialog = true"
             :src="image"/>
      </span>
      <span v-show="showDefault">
        <img class="image-style"
             @click="showModifyHeadImageDialog = true"
             src="../../static/img/default-image.jpg"/>
      </span>
      <a @click="toLogin()">【退出】</a>
    </header>

    <el-dialog title="修改头像"
                :visible.sync="showModifyHeadImageDialog"
                width="300px"
                align="center">
      <el-upload
        class="avatar-uploader"
        :action="GLOBAL.Base_URL"
        :auto-upload="false"
        :on-change="handleImageChange"
        :show-file-list="false">
        <img v-if="image" :src="imageURL" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModifyHeadImageDialog = false">取 消</el-button>
        <el-button @click="modifyHeadImage" type="primary">确 定</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "appHeader",
        data() {
          return{
            role:'',
            username:this.$cookie.get('username'),
            image:this.$cookie.get('image'),
            imageURL:'',
            showDefault:false,
            showModifyHeadImageDialog:false,
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
            modifyHeadImage() {
              let formdata = new FormData();
              formdata.append("file",this.image);
              this.$axios.post('/user/image',formdata)
                .then((res) =>{
                  this.$cookie.set('image', res.data.data.image);
                  this.image = res.data.data.image;
                  this.showDefault = false;
                  this.showModifyHeadImageDialog = false;
                })
                .catch((err) => {
                  console.log(err)
                })
            },
          handleImageChange(file) {
            this.imageURL = URL.createObjectURL(file.raw);
            this.image = file.raw
          },
        },
        mounted(){
          if(this.image === 'null' ) {
            this.showDefault = true;
            this.imageURL = null;
          }
          else this.imageURL = this.image;
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

  .image-style{
    width: 28px;
    height: 28px;
    line-height: 32px;
    border-radius: 90px;
    vertical-align: top;
  }
  /*图片样式*/
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
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
