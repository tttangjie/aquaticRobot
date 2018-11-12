<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="adminList"
      tooltip-effect="dark"
      size="mini"
      style="width: 100%;"
      height="550"
      highlight-current-row>
      <el-table-column
        align="center"
        label="姓名">
        <template slot-scope="scope">{{ scope.row.realname }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="用户名">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="工号">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="部门">
        <template slot-scope="scope">{{ scope.row.department }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="所属用户组">
        <template slot-scope="scope">{{ scope.row.user_group }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="登录时间">
        <template slot-scope="scope">{{ scope.row.login_time }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="密码保护">
        <template slot-scope="scope">
          <p @click="initPassword(scope.row.status, scope.row.username)" style="cursor: pointer">修改密码</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="权限管理"
        width="180">
        <template slot-scope="scope">
          <el-radio-group v-model="scope.row.status"
                          size="mini"
                          @change="changePower(scope.row.status, scope.row.username)">
            <el-radio-button label="1">启用</el-radio-button>
            <el-radio-button label="0">禁用</el-radio-button>
          </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="修改">
        <template slot-scope="scope">
          <p @click="modifyRow(scope.row)" style="cursor: pointer">更新</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="备注">
        <template slot-scope="scope">{{ scope.row.remark }}</template>
      </el-table-column>
    </el-table>
    <div class="btns">
      <el-button size="medium" @click="showRegisterDialog = true">新建</el-button>
      <el-button size="medium" type="primary" plain @click="exportExcel">导出excel</el-button>
    </div>

    <el-pagination
      style="text-align: center"
      @current-change="jumpToOtherPage"
      :current-page.sync="page.num"
      :page-size="page.size"
      layout="prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>

    <!-- 新建用户的对话框 -->
    <el-dialog
      title="一般管理员注册"
      :visible.sync="showRegisterDialog"
      width="450px">
      <el-form :model="adminForm">
        <el-form-item label="* 用户名" :label-width="formLabelWidth">
          <el-input v-model="adminForm.username"></el-input>
        </el-form-item>
        <el-form-item label="所属用户组" :label-width="formLabelWidth">
          <el-input v-model="adminForm.user_group" disabled></el-input>
        </el-form-item>
        <el-form-item label="工号" :label-width="formLabelWidth">
          <el-input v-model="adminForm.number"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="adminForm.realname"></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input v-model="adminForm.department"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-radio-group v-model="adminForm.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="adminForm.remark"></el-input>
        </el-form-item>


      </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showRegisterDialog = false">取 消</el-button>
          <el-button type="primary" @click="registerExpert">注 册</el-button>
        </span>
    </el-dialog>

    <!-- 更新用户的对话框 -->
    <el-dialog
      title="管理员更新"
      :visible.sync="showModifyDialog"
      width="450px">
      <el-form :model="currentModify">
        <el-form-item label="* 用户名" :label-width="formLabelWidth">
          <el-input v-model="currentModify.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input v-model="currentModify.department"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="currentModify.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showModifyDialog = false">取 消</el-button>
    <el-button type="primary" @click="modifyAdmin">保 存</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "AdminController",
    data() {
      return {
        adminList:[],
        currentModify:{},
        page:{
          num: 1,
          size: 10,
          pages: 0,
          total: 0,
        },
        adminForm:{
          user_group:'一般管理员',
          status:1
        },
        showRegisterDialog:false,
        showModifyDialog:false,
        formLabelWidth:'120px'
      }
    },
    methods:{
      loadList() {
        this.$axios.get('/admin/list',
          {
            params:{
              pageNum:this.page.num,
              pageSize:this.page.size,
              orderBy:null,
              condition:null,
            }
          }
        )
          .then((res) => {
            console.log(res)
            if(res.data.code === 1) {
              this.adminList = res.data.data.list;
              this.page.pages = res.data.data.pages;
              this.page.total = res.data.data.total;
              for (let item in this.adminList) {
                if(this.adminList.hasOwnProperty(item)) {
                  this.adminList[item].login_time = this.adminList[item].login_time.substring(0, 11);
                }
              }
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      jumpToOtherPage() {
        this.loadList();
      },
      registerExpert() {
        this.$axios.post('/admin/', this.adminForm)
          .then((res) => {
            if(res.data.code === 50003){
              this.$message({
                message: '用户名已存在',
                type: 'error',
              })
            }
            else if(res.data.code === 1) {
              this.$message({
                message:'一般管理员注册成功！',
                type:'success'
              })
              this.loadList();
              this.showRegisterDialog = false;
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      initPassword(status, username) {
        if(status == 1) {
          this.$message({
            message:'请先禁用该管理员权限！',
            type:'warning'
          });
          return;
        }
        this.$confirm('是否初始化该管理员密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type:'warning'
        })
          .then(() => {
            this.$axios.put('/admin/password?username='+username)
              .then((res) => {
                if(res.data.code === 1) {
                  this.$message({
                    message:'管理员密码初始化成功！',
                    type:'success'
                  })
                }
              })
              .catch((err) => {
                console.log(err)
              })
          })
          .catch(() => {

          })
      },
      changePower(status, username) {
        this.$axios.put('/admin/power?status='+parseInt(status)+'&username='+username)
          .then((res) => {
            if(res.data.code !== 1) {
              console.log(res)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      modifyRow(value) {
        this.currentModify = Object.assign({}, value);
        console.log(this.currentModify)
        this.showModifyDialog = true;
      },
      modifyAdmin() {
        this.$axios.put('/admin/info?department='+this.currentModify.department+'&username='+this.currentModify.username+'&remark='+this.currentModify.remark)
          .then((res) => {
            if(res.data.code === 1) {
              this.loadList();
              this.showModifyDialog = false;
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      exportExcel() {
        this.$axios.get('/excel/admin',{
          responseType:'blob'
        })
          .then((res) =>{
            let link = document.createElement('a');
            let blob = new Blob([res.data],{
              type:'application/vnd.ms-excel'
            }) ;
            link.href = window.URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
      },
    },
    mounted() {
      this.loadList();
    }
  }
</script>

<style scoped>
  .btns {
    margin: 10px 30px;
  }
  .btns .el-button {
    margin-left: 0;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
</style>
