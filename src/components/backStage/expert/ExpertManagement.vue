<template>
  <div>
    <strategy v-on:queryData = queryData> </strategy>
    <el-table
      ref="multipleTable"
      :data="expertList"
      tooltip-effect="dark"
      size="mini"
      style="margin-top: 20px;"
      height="500"
      highlight-current-row
      @selection-change="handleSelectionChange">
      <el-table-column
        align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        align="center"
        width="40">
      </el-table-column>
      <el-table-column
        align="center"
        label="地区">
        <template slot-scope="scope">{{ scope.row.position }}</template>
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
        label="用户名">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        width="60"
        label="姓名">
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
        label="所在单位">
        <template slot-scope="scope">{{ scope.row.company }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button size="mini" class="plain_button" @click="modifyRow(scope.row)">修改</el-button>
          <el-button size="mini" class="normal_button" @click="deleteRow(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="备注">
        <template slot-scope="scope">{{ scope.row.remark }}</template>
      </el-table-column>
    </el-table>

    <div class="btns">
      <el-button size="medium" class="plain_button" @click="showRegisterDialog = true">新建</el-button>
      <el-button size="medium" class="plain_button" @click="batchDelete">批量删除</el-button>
      <el-button size="medium" class="light_button" @click="exportExcel">导出excel</el-button>
      <el-button size="medium"  class="light_button" @click.native="getWord">导出word</el-button>
      <el-button size="medium"  class="light_button" @click.native="getPDF">导出pdf</el-button>
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
    <el-dialog title="专家注册"
               :visible.sync="showRegisterDialog"
               width="450px"
               @closed="handleRegisterClose">
      <el-form :model="expertForm" size="mini">
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
          <el-radio v-model="expertForm.sex" :label=1>男</el-radio>
          <el-radio v-model="expertForm.sex" :label=0>女</el-radio>
        </el-form-item>
        <el-form-item label="产品类别" :label-width="formLabelWidth">
          <el-input v-model="expertForm.product"></el-input>
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
        <el-form-item label="地区" :label-width="formLabelWidth">
          <ThreeLink :reset="flag.reset" v-on:areaDate = areaDate> </ThreeLink>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="expertForm.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="expertForm.remark"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="plain_button" @click="showRegisterDialog = false">取 消</el-button>
        <el-button class="normal_button" @click="registerExpert">注 册</el-button>
      </span>
    </el-dialog>

    <!--更新信息的对话框-->
    <el-dialog
      title="专家信息更新"
      :visible.sync="showModifyDialog"
      width="450px">
      <el-form :model="currentModify" size="mini">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="currentModify.username" disabled ></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="currentModify.realname"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="currentModify.tel"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="currentModify.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="currentModify.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="产品类别" :label-width="formLabelWidth">
          <el-input v-model="currentModify.product"></el-input>
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
        <el-form-item label="地区" :label-width="formLabelWidth">
          <ThreeLink v-on:areaDate = areaDate> </ThreeLink>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="currentModify.address"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="currentModify.remark"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button class="plain_button" @click="showModifyDialog = false">取 消</el-button>
    <el-button class="normal_button" @click="modifyExpert">修 改</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    import Strategy from '../tools/Strategy'
    import ThreeLink from '../tools/ThreeLink'
    export default {
        name: "ExpertManagement",
        components:{
          'strategy':Strategy,
          ThreeLink
        },
        data() {
          return {
            total:10,
            allList:[],
            areaSelection:{},
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
            expertForm:{},
            flag:{
              reset:false,
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
                console.log(res)
                if(res.data.code === 1) {
                  this.expertList = res.data.data.list;
                  this.page.pages = res.data.data.pages;
                  this.page.total = res.data.data.total;
                  for (let item in this.expertList) {
                    this.expertList[item]['position'] = "";
                    if (this.expertList[item].province != null && this.expertList[item].province != ""){
                      this.expertList[item]['position'] += this.expertList[item].province;
                    }
                    if (this.expertList[item].city != null && this.expertList[item].city != ""){
                      this.expertList[item]['position'] += this.expertList[item].city;
                    }
                    if (this.expertList[item].county != null && this.expertList[item].county != ""){
                      this.expertList[item]['position'] += this.expertList[item].county;
                    }
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
          handleRegisterClose() {
            this.flag.reset = !this.flag.reset;
            this.expertForm = {};
          },
          modifyRow(row) {
            this.showModifyDialog = true;
            this.currentModify = Object.assign({}, row);
            this.currentModify.sex += '';
          },
          modifyExpert() {
            if(this.areaSelection.province)
              this.currentModify.province = this.areaSelection.province.slice(0,this.areaSelection.province.length-1);
            else this.currentModify.province = '';
            if(this.areaSelection.city)
              this.currentModify.city = this.areaSelection.city.slice(0,this.areaSelection.city.length-1);
            else this.currentModify.city = '';
            if(this.areaSelection.block)
              this.currentModify.county = this.areaSelection.block.slice(0,this.areaSelection.block.length-1);
            else this.currentModify.county = '';
            this.$axios.put('/expert/'+this.currentModify.id,{
                realname:this.currentModify.realname,
                major:this.currentModify.major,
                product:this.currentModify.product,
                degree:this.currentModify.degree,
                company:this.currentModify.company,
                tel:this.currentModify.tel,
                email:this.currentModify.email,
                age:this.currentModify.age,
                city: this.currentModify.city,
                county: this.currentModify.county,
                province: this.currentModify.province,
                address:this.currentModify.address,
                remark:this.currentModify.remark,
                sex:this.currentModify.sex
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
            this.$confirm('此操作将该条记录，是否继续？', '提示', {
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
          areaDate(value) {
            this.areaSelection = value;
          },
          registerExpert() {
            if(this.areaSelection.province)
              this.expertForm.province = this.areaSelection.province.slice(0,this.areaSelection.province.length-1);
            else this.expertForm.province = '';
            if(this.areaSelection.city)
              this.expertForm.city = this.areaSelection.city.slice(0,this.areaSelection.city.length-1);
            else this.expertForm.city = '';
            if(this.areaSelection.block)
              this.expertForm.county = this.areaSelection.block.slice(0,this.areaSelection.block.length-1);
            else this.expertForm.county = '';
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
                  });
                  this.loadList();
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
          loadAllList() {
            this.$axios.get('/expert/',{
              params:{
                pageNum:1,
                pageSize:this.page.total,
              }
            })
              .then( res => {
                if(res.data.code === 1){
                  this.allList = res.data.data.list;
                }
              })
              .catch(function (err) {
                console.log(err);
              })
          },
          dataToTable() {
            let info = [];
            let table = '';
            table += '<table>';
            table += '<tr>' +
              '<th>序号</th>' +
              '<th>产品类别</th>' +
              '<th>负责类别</th>' +
              '<th>签约时间</th>' +
              '<th>联系人</th>'+
              '<th>性别</th>' +
              '<th>年龄</th>' +
              '<th>联系电话</th>' +
              '<th>省</th>' +
              '<th>市</th>' +
              '<th>区（县）</th>' +
              '<th>地址</th>' +
              '<th>工号</th>' +
              '<th>学历</th>' +
              '<th>所在单位</th>' +
              '</tr>';
            for(let item in this.allList) {
              info[item] = Object.assign({}, this.allList[item]);
              let index = parseInt(item)+1;
              if(info[item].sex === 0)
                info[item].sex = '男';
              else if(info[item].sex === 1)
                info[item].sex = '女';
              else info[item].sex = '';
              if(info[item].sign_time)
                info[item].sign_time = info[item].sign_time.replace(' ', '').slice(0,10);
              for(let i in info[item])
                if(info[item][i] === null)
                  info[item][i] = ' ';
              table+='<tr>';
              table+='<td>'+index+'</td>';
              table+='<td>'+info[item].product +'</td>';
              table+='<td>'+info[item].major+'</td>';
              table+='<td>'+info[item].sign_time+'</td>';
              table+='<td>'+info[item].username+'</td>'
              table+='<td>'+info[item].sex+'</td>';
              table+='<td>'+info[item].age+'</td>';
              table+='<td>'+info[item].tel+'</td>';
              table+='<td>'+info[item].province+'</td>';
              table+='<td>'+info[item].city+'</td>';
              table+='<td>'+info[item].county+'</td>';
              table+='<td>'+info[item].address+'</td>';
              table+='<td>'+info[item].number+'</td>';
              table+='<td>'+info[item].degree+'</td>';
              table+='<td>'+info[item].company+'</td>';
              table+='</tr>';
            }
            table = table.replace(new RegExp('<th>', 'g'), '<th style="border: 1px solid #ebebeb; background: #ebebeb">');
            table = table.replace(new RegExp('<td>', 'g'), '<td style="border-bottom: 1px solid #ebebeb">');
            table+='</table>'
            return table;
          },
          getWord() {
            this.GLOBAL.wordExport('doc', this.dataToTable(), '专家信息');
          },
          getPDF() {
            this.GLOBAL.pdfExport(this.dataToTable(), '专家信息');
          },
          queryData(value) {
       /*     if(value.city && value.province && value.block) {
              value.province = value.province.slice(0,value.province.length-1);
              value.city = value.city.slice(0,value.city.length-1);
              value.block = value.block.slice(0,value.block.length-1);
            }*/
            this.$axios.post('/expert/strategy?pageNum='+this.page.num+'&pageSize='+this.page.size, {
              beginTime:value.dateBegin,
              endTime:value.dateEnd,
              province:value.province,
              city:value.city,
              county:value.block

            }).then((res) => {
              if(res.data.code === 1) {
                this.page.pages = res.data.data.pages;
                this.page.total = res.data.data.total;
                this.expertList = res.data.data.list;
                for (let item in this.expertList) {
                  this.expertList[item]['position'] = "";
                  if (this.expertList[item].province != null && this.expertList[item].province != ""){
                    this.expertList[item]['position'] += this.expertList[item].province;
                  }
                  if (this.expertList[item].city != null && this.expertList[item].city != ""){
                    this.expertList[item]['position'] += this.expertList[item].city;
                  }
                  if (this.expertList[item].county != null && this.expertList[item].county != ""){
                    this.expertList[item]['position'] += this.expertList[item].county;
                  }
                  if(this.expertList.hasOwnProperty(item)) {
                    this.expertList[item].registerTime = this.expertList[item].sign_time.substring(0, 11);
                    if(this.expertList[item].sex === 0 )
                      this.expertList[item].sexString = '男';
                    else this.expertList[item].sexString = '女';
                  }
                }
              }
            }).catch((err) => {
              console.log(err)
            })
          }
        },
        mounted() {
          this.loadList();
          this.loadAllList();
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
