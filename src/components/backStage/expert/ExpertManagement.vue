<template>
  <div>
    <strategy v-on:queryData = queryData> </strategy>
    <el-table
      ref="multipleTable"
      :data="expertList"
      tooltip-effect="dark"
      size="mini"
      style="width: 100%;"
      height="550"
      highlight-current-row
      @selection-change="handleSelectionChange">
      <el-table-column
        align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        align="center"
        label="地区">
        <template slot-scope="scope">{{ scope.row.city }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="产品类别">
        <template slot-scope="scope">{{ scope.row.product }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="负责类别">
        <template slot-scope="scope">{{ scope.row.major }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="签约时间">
        <template slot-scope="scope">{{ scope.row.registerTime }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="联系人">
        <template slot-scope="scope">{{ scope.row.realname }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="性别"
        width="55">
        <template slot-scope="scope">{{ scope.row.sexString }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="年龄"
        width="55">
        <template slot-scope="scope">{{ scope.row.age }}</template>
      </el-table-column>
      <el-table-column
        label="联系电话"
        align="center">
        <template slot-scope="scope">{{ scope.row.tel }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="工号">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="学位证书">
        <template slot-scope="scope">{{ scope.row.remark }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="所在单位">
        <template slot-scope="scope">{{ scope.row.company }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="编辑"
        width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="modifyRow(scope.row)">修改</el-button>
          <el-button size="mini" @click="deleteRow(scope.row.id)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="btns">
      <el-button size="medium" @click="showRegisterDialog = true">新建</el-button>
      <el-button size="medium" @click="batchDelete">批量删除</el-button>
      <el-button size="medium">打印</el-button>
      <el-button size="medium" type="primary" plain>导出word</el-button>
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
      title="专家注册"
      :visible.sync="showRegisterDialog"
      width="450px">
      <el-form :model="expertForm">
        <el-form-item label="* 用户名" :label-width="formLabelWidth">
          <el-input v-model="expertForm.username"></el-input>
        </el-form-item>
        <el-form-item label="* 编号" :label-width="formLabelWidth">
          <el-input v-model="expertForm.number"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="expertForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="真名" :label-width="formLabelWidth">
          <el-input v-model="expertForm.realname"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="expertForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio v-model="expertForm.sex" :label=0>男</el-radio>
          <el-radio v-model="expertForm.sex" :label=1>女</el-radio>
        </el-form-item>
        <el-form-item label="产品类别" :label-width="formLabelWidth">
          <el-input v-model="expertForm.product"></el-input>
        </el-form-item>
        <el-form-item label="人员类别" :label-width="formLabelWidth">
          <el-input v-model="expertForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="学位" :label-width="formLabelWidth">
          <el-input v-model="expertForm.degree"></el-input>
        </el-form-item>
        <el-form-item label="公司" :label-width="formLabelWidth">
          <el-input v-model="expertForm.company"></el-input>
        </el-form-item>
        <el-form-item label="主修课程" :label-width="formLabelWidth">
          <el-input v-model="expertForm.major"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="expertForm.email"></el-input>
        </el-form-item>
        <el-form-item label="省份" :label-width="formLabelWidth">
          <el-input v-model="expertForm.province"></el-input>
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth">
          <el-input v-model="expertForm.city"></el-input>
        </el-form-item>
        <el-form-item label="地区" :label-width="formLabelWidth">
          <el-input v-model="expertForm.county"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="expertForm.address"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showRegisterDialog = false">取 消</el-button>
    <el-button type="primary" @click="registerExpert">注 册</el-button>
  </span>
    </el-dialog>

    <!--更新信息的对话框-->
    <el-dialog
      title="专家信息更新"
      :visible.sync="showModifyDialog"
      width="450px">
      <el-form :model="currentModify">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="currentModify.username" disabled ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="currentModify.tel"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="currentModify.age"></el-input>
        </el-form-item>
        <el-form-item label="人员类别" :label-width="formLabelWidth">
          <el-input v-model="currentModify.remark"></el-input>
        </el-form-item>
        <el-form-item label="学位" :label-width="formLabelWidth">
          <el-input v-model="currentModify.degree"></el-input>
        </el-form-item>
        <el-form-item label="公司" :label-width="formLabelWidth">
          <el-input v-model="currentModify.company"></el-input>
        </el-form-item>
        <el-form-item label="主修课程" :label-width="formLabelWidth">
          <el-input v-model="currentModify.major"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="currentModify.email"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="currentModify.address"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showRegisterDialog = false">取 消</el-button>
    <el-button type="primary" @click="modifyExpert">修 改</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    import Strategy from '../tools/Strategy'
    export default {
        name: "ExpertManagement",
        components:{
          'strategy':Strategy
        },
        data() {
          return {
            expertList:[],
            currentModify:{},
            page:{
              num: 1,
              size: 10,
              pages: 0,
              total: 0,
            },
            selectionData:[],
            selectIDs:'',
            showRegisterDialog:false,
            showModifyDialog:false,
            expertForm:{
              sex:0,
            },
            formLabelWidth:'120px'
          }
        },
        methods:{
          loadList() {
            this.$axios.get('/expert/',
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
                if(res.data.code === 1) {
                  this.expertList = res.data.data.list;
                  this.page.pages = res.data.data.pages;
                  this.page.total = res.data.data.total;
                  for (let item in this.expertList) {
                    if(this.expertList.hasOwnProperty(item)) {
                      this.expertList[item].registerTime = this.expertList[item].sign_time.substring(0, 11);
                      if(this.expertList[item].sex === 0 )
                        this.expertList[item].sexString = '男';
                      else this.expertList[item].sexString = '女';
                    }
                  }
                }
              })
              .catch((err) => {
                console.log(err)
              })
          },
          handleSelectionChange(val) {
            this.selectionData = val;
          },
          modifyRow(row) {
            this.showModifyDialog = true;
            this.currentModify.id = row.id;
            this.currentModify.username = row.username;
            this.currentModify.major = row.major;
            this.currentModify.degree = row.degree;
            this.currentModify.company = row.company;
            this.currentModify.tel = row.tel;
            this.currentModify.email = row.email;
            this.currentModify.age = row.age;
            this.currentModify.address = row.address;
            this.currentModify.remark = row.remark;
          },
          modifyExpert() {
            this.$axios.put('/expert/'+this.currentModify.id,{
                major:this.currentModify.major,
                degree:this.currentModify.degree,
                company:this.currentModify.company,
                tel:this.currentModify.tel,
                email:this.currentModify.email,
                age:this.currentModify.age,
                address:this.currentModify.address,
                remark:this.currentModify.remark
            })
              .then((res) => {
                if(res.data.code === 1) {
                  this.$message({
                    message:'专家信息更新成功！',
                    type:'success'
                  })
                  this.showModifyDialog = false;
                  this.loadList();
                }
              })
              .catch((err)=> {
                console.log(err)
              })
          },
          batchDelete() {
            this.selectIDs = '';
            for(let item in this.selectionData) {
              this.selectIDs += this.selectionData[item].id + '-';
            }
            this.selectIDs = this.selectIDs.substring(0, this.selectIDs.length-1);
            this.deleteRow(this.selectIDs);
          },
          deleteRow(id) {
            this.$confirm('此操作将永久删除该文件，是否继续？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type:'warning'
            })
              .then(() => {
                this.$axios.delete('/expert/' + id )
                  .then((res) => {
                    if(res.data.code === 1) {
                      this.$message({
                        type:'success',
                        message:'删除成功！'
                      })
                      this.loadList();
                    }

                  })
                  .catch((err) => {
                    console.log(err)
                  })
              })
              .catch(() => {

              })
          },
          jumpToOtherPage() {
            this.loadList();
          },
          registerExpert() {
            this.$axios.post('/expert/', this.expertForm)
              .then((res) => {
                if(res.data.code === 50003){
                  this.$message({
                    message: '用户名已存在',
                    type: 'error',
                  })
                }
                else if(res.data.code === 1) {
                  this.$message({
                    message:'专家注册成功！',
                    type:'success'
                  })
                  this.showRegisterDialog = false;
                }
              })
              .catch((err) => {
                console.log(err)
              })
          },
          exportExcel() {
            this.$axios.get('/excel/expert',{
              responseType:'blob'
            })
              .then((res) =>{
                console.log(res);
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

          queryData(value) {
       /*     if(value.city && value.province && value.block) {
              value.province = value.province.slice(0,value.province.length-1);
              value.city = value.city.slice(0,value.city.length-1);
              value.block = value.block.slice(0,value.block.length-1);
            }*/
            console.log(value)
            this.$axios.post('/expert/strategy?pageNum='+this.page.num+'&pageSize='+this.page.size, {
              beginTime:value.dateBegin,
              endTime:value.dateEnd,
              province:value.province,
              city:value.city,
              county:value.block

            }).then((res) => {
              console.log(res);
            }).catch((err) => {
              console.log(err)
            })
          }
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
