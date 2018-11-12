<template>
    <el-row class="modify_info_body">
      <el-col :span="6">
        <el-upload
          class="avatar-uploader"
          :action="GLOBAL.Base_URL"
          :auto-upload="false"
          :on-change="handleImageChange"
          :show-file-list="false">
          <img v-if="image" :src="imageURL" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!--<el-button @click="modifyHeadImage" type="primary" class="modify_image_btn">修改头像</el-button>-->
      </el-col>
      <el-col :span="10">
        <el-form :model="info" style="width: 400px;" size="medium" v-if="role === 'EXPERT'">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="info.username" disabled ></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="info.realname"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="info.tel"></el-input>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth">
            <el-input v-model="info.age"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio-group v-model="info.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="产品类别" :label-width="formLabelWidth">
            <el-input v-model="info.product"></el-input>
          </el-form-item>
          <el-form-item label="学位" :label-width="formLabelWidth">
            <el-input v-model="info.degree"></el-input>
          </el-form-item>
          <el-form-item label="公司" :label-width="formLabelWidth">
            <el-input v-model="info.company"></el-input>
          </el-form-item>
          <el-form-item label="主修课程" :label-width="formLabelWidth">
            <el-input v-model="info.major"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="info.email"></el-input>
          </el-form-item>
          <el-form-item label="地区" :label-width="formLabelWidth">
            <three-link v-on:areaDate = areaDate> </three-link>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="info.address"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth" >
            <el-input v-model="info.remark" type="textarea"></el-input>
          </el-form-item>
        </el-form>

        <el-form :model="info" :label-width="formLabelWidth" style="width: 400px;"  size="medium" v-if="role === 'TECHNOLOGY'">
          <el-form-item label="用户名">
            <el-input v-model="info.username" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="info.number" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="info.realname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="info.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="info.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="info.position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地区">
            <three-link v-on:areaDate = areaDate> </three-link>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="info.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="info.tel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="info.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <el-form :model="info" style="width: 400px;"  size="medium" v-if="role === 'MANAGER'">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="info.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="工号" :label-width="formLabelWidth">
            <el-input v-model="info.number" disabled></el-input>
          </el-form-item>
          <el-form-item label="部门" :label-width="formLabelWidth">
            <el-input v-model="info.department"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="info.remark" type="textarea"></el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" class="save_btn" @click="modifyInfo" v-show="role !== 'ADMIN'">保 存</el-button>
      </el-col>
    </el-row>
</template>

<script>
    import ThreeLink from '../tools/ThreeLink'
    export default {
        name: "ModifyInfo",
        components:{
          'three-link':ThreeLink,
        },
        data(){
          return {
            image:this.$cookie.get('image'),
            imageURL:'',
            id: this.$cookie.get('user_id'),
            role:this.$cookie.get('role').slice(5),
            info:{},
            formLabelWidth:'120px',
            areaSelection:{},
          }
        },
        methods:{
          toLogin:function () {
            this.$router.push({path:'/'})
          },
          loadInfo() {
            let role = this.role;
            if(this.role === 'MANAGER')
              role = 'admin';
            else if(this.role === 'ADMIN')
              role ='user'
            this.$axios.get('/'+role.toLowerCase()+'/'+ this.id)
              .then((res) =>{
                console.log(res)
                this.info = res.data.data;
                this.info.sex += '';
              })
              .catch((err) => {
                console.log(err)
              })
          },
          handleImageChange(file) {
            this.imageURL = URL.createObjectURL(file.raw);
            this.image = file.raw
            this.modifyHeadImage();
          },
          modifyHeadImage() {
            let formdata = new FormData();
            formdata.append("file",this.image);
            this.$axios.post('/user/image',formdata)
              .then((res) =>{
                this.$cookie.set('image', res.data.data.image);
                this.image = res.data.data.image;
              })
              .catch((err) => {
                console.log(err)
              })
          },
          areaDate(value) {
            this.areaSelection = value;
          },
          modifyExpert() {
            if(this.areaSelection.province)
              this.info.province = this.areaSelection.province.slice(0,this.areaSelection.province.length-1);
            else this.info.province = '';
            if(this.areaSelection.city)
              this.info.city = this.areaSelection.city.slice(0,this.areaSelection.city.length-1);
            else this.info.city = '';
            if(this.areaSelection.block)
              this.info.county = this.areaSelection.block.slice(0,this.areaSelection.block.length-1);
            else this.info.county = '';
            this.$axios.put('/expert/'+this.id,{
              realname:this.info.realname,
              major:this.info.major,
              product:this.info.product,
              degree:this.info.degree,
              company:this.info.company,
              tel:this.info.tel,
              email:this.info.email,
              age:this.info.age,
              city: this.info.city,
              county: this.info.county,
              province: this.info.province,
              address:this.info.address,
              remark:this.info.remark
            })
                .then((res) => {
                if(res.data.code === 1) {
                  this.$message({
                    message:'信息更新成功！',
                    type:'success'
                  })
                }
              })
              .catch((err)=> {
                console.log(err)
              })
          },
          modifyTechnology() {
            if(this.areaSelection.province)
              this.info.province = this.areaSelection.province.slice(0,this.areaSelection.province.length-1);
            else this.info.province = '';
            if(this.areaSelection.city)
              this.info.city = this.areaSelection.city.slice(0,this.areaSelection.city.length-1);
            else this.info.city = '';
            if(this.areaSelection.block)
              this.info.county = this.areaSelection.block.slice(0,this.areaSelection.block.length-1);
            else this.info.county = '';
            this.$axios.put('/technology/' + this.id,{
              "address": this.info.address,
              "age": this.info.age,
              "email": this.info.email,
              "number": this.info.number,
              "position": this.info.position,
              "realname":this.info.realname,
              "sex": this.info.sex,
              "tel": this.info.tel,
              "username": this.info.username,
              "province": this.info.province,
              "city": this.info.city,
              "county": this.info.county,
            })
              .then( res => {
                console.log(res);
                if (res.data.code === 1){
                  this.$message({
                    message:'信息更新成功！',
                    type:'success'
                  })
                }
              })
              .catch( err => {
                console.log(err);
              })
          },
          modifyManager() {
            this.$axios.put('/admin/info?department='+this.info.department+'&username='+this.info.username+'&remark='+this.info.remark)
              .then((res) => {
                if(res.data.code === 1) {
                  this.$message({
                    message:'信息更新成功！',
                    type:'success'
                  })
                }
              })
              .catch((err) => {
                console.log(err)
              })
          },
          modifyInfo() {
            if(this.role === 'MANAGER')
              this.modifyManager();
            else if(this.role === 'EXPERT')
              this.modifyExpert();
            else if(this.role === 'TECHNOLOGY')
              this.modifyTechnology();
          }
        },
        mounted() {
          if(this.image.split('/')[this.image.split('/').length-1] === 'null' ) {
            this.image = '../../static/img/default-image.jpg';
            this.imageURL = this.image;
          }
          else this.imageURL = this.image;
          this.loadInfo();
        }
    }
</script>

<style scoped>
  .modify_info_body {
    padding: 30px 10%;
  }
  .modify_image_btn {
    width: 110px;
    margin: 15px 17px;
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

  .save_btn {
    width: 120px;
    margin-left: 280px;
    margin-top: 40px;
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

