<template>
  <div class="modify_pwd_body">
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
    <el-button @click="modifyPWD" type="primary">确 定</el-button>
  </div>
</template>

<script>
    export default {
        name: "ModifyPWD",
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
            PWDForm:{
              oldPassword:'',
              newPassword:'',
              againPassword:'',
            },
            formLabelWidth:'150px',
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
                } else if (res.data.code === 20006) {
                  this.$message({
                    message:'原密码输入错误',
                    type:'error'
                  })
                }
              })
          },
        }
    }
</script>

<style scoped>
  .modify_pwd_body {
    width: 400px;
    margin: 5%;
  }
  .modify_pwd_body .el-button{
    float: right;
    width: 120px;
    margin-top: 30px;
  }
</style>
