<template>
  <div>
    <div class="btns">
      <el-button size="medium" @click="showRegisterDialogFunc" type="primary">新建</el-button>
      <el-select v-model="strategy" placeholder="请选择" style="width: 120px;">
        <el-option
          v-for="(item,index) in subKinds"
          :key="index"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <!--<el-input size="medium" v-model="strategy" style="width: 120px;"></el-input>-->
      <el-button size="medium" @click="query">筛选</el-button>
      <el-button size="medium" @click="reset">重置</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="drugList"
      tooltip-effect="dark"
      size="mini"
      style="width: 100%;"
      height="550"
      highlight-current-row>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
     <!-- 主界面折叠ban-->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="使用说明书">
              <span class="form_text" v-html=scope.row.manualInstruct></span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--width="50"-->
        <!--align="center"-->
        <!--label="种类">-->
        <!--<template slot-scope="scope">{{ scope.row.kind }}</template>-->
      <!--</el-table-column>-->
      <el-table-column
        align="center"
        label="子类">
        <template slot-scope="scope">{{ scope.row.subKind }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>

      <el-table-column
        align="center"
        label="药品种类">
        <template slot-scope="scope">{{ scope.row.type }}</template>
      </el-table-column>

      <el-table-column
        align="center"
        label="价格">
        <template slot-scope="scope">{{ scope.row.price }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="公司">
        <template slot-scope="scope">{{ scope.row.company}}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="联系电话">
        <template slot-scope="scope">{{ scope.row.telPhone }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="联系方式">
        <template slot-scope="scope">{{ scope.row.contact }}</template>
      </el-table-column>

      <el-table-column
        align="center"
        label="发布时间">
        <!--显示时间，publishTime为date类型，格式化显示的时间-->
        <template slot-scope="scope">{{ scope.row.publishTime.getFullYear()
          +'-' +( scope.row.publishTime.getMonth()+1)+'-'+scope.row.publishTime.getDate() }}</template>
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
      <!-- 主界面折叠ban-->
    </el-table>

    <el-pagination
      style="text-align: center"
      @current-change="jumpToOtherPage"
      :current-page.sync="page.num"
      :page-size="page.size"
      layout="prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>

    <!-- 新建的对话框 -->
    <el-dialog
      title="添加药品"
      :visible.sync="showRegisterDialog"
      width="450px">
      <el-form :model="medicineForm">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="medicineForm.name"></el-input>
        </el-form-item>
        <el-form-item label="种类" :label-width="formLabelWidth">
          <el-input v-model="medicineForm.kind"></el-input>
        </el-form-item>
        <el-form-item label="子类" :label-width="formLabelWidth">
          <el-input v-model="medicineForm.subKind"></el-input>
        </el-form-item>
        <el-form-item label="药品类型" :label-width="formLabelWidth">  <!--add by liuyunxing-->
          <el-input v-model="medicineForm.type"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="medicineForm.price"></el-input>
        </el-form-item>
        <el-form-item label="公司" :label-width="formLabelWidth">
          <el-input v-model="medicineForm.company"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" :label-width="formLabelWidth" v-if="showRegisterDialog">
          <el-date-picker
            disabled
            v-model=medicineForm.publishTime
            type="datetime"
            value-format="timestamp"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item >
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="medicineForm.telPhone"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            v-model="medicineForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="说明书">
          <el-input
            type="textarea"
            :rows="5"
            :label-width="formLabelWidth"
            v-model="medicineForm.manualInstruct"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showRegisterDialog = false">取 消</el-button>
    <el-button type="primary" @click="registerDrug">注 册</el-button>
  </span>
    </el-dialog>

    <!-- 更新的对话框 -->
    <el-dialog
      title="药品信息修改"
      :visible.sync="showModifyDialog"
      width="600px">
      <el-form :model="currentModify">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="currentModify.name"></el-input>
        </el-form-item>
        <el-form-item label="种类" :label-width="formLabelWidth">
          <el-input v-model="currentModify.kind"></el-input>
        </el-form-item>
        <el-form-item label="子类" :label-width="formLabelWidth">
          <el-input v-model="currentModify.subKind"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input  type="textarea"
                     :rows="5"
                     v-model="currentModify.manualInstruct"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" :label-width="formLabelWidth" v-if="showModifyDialog">
          <el-date-picker
            disabled
            v-model=currentModify.publishTime
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="currentModify.price"></el-input>
        </el-form-item>
        <el-form-item label="药品种类" :label-width="formLabelWidth">
          <el-input v-model="currentModify.type"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="currentModify.telPhone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showModifyDialog = false">取 消</el-button>
    <el-button type="primary" @click="modifyDrug">保 存</el-button>
  </span>
    </el-dialog>
  <!--  <img src="http://223.2.197.240:8062/image/seed024.jpg">-->
  </div>
</template>

<script>

  import {newLineTransform , brTransform,  strToDate} from './utils/strUtils'
  export default {
    name: "DrugStore",
    data() {
      return {
        drugList:[],
        currentModify:{},
        page:{
          num: 1,
          size: 10,
          pages: 0,
          total: 0,
        },
        medicineForm:{
          image:'',
          manualInstruct:'',
        },
        showRegisterDialog:false,
        showModifyDialog:false,
        formLabelWidth:'120px',
        strategy:'',
        subKinds:["虾类","蟹类","鱼类","其他","所有"]
      }
    },
    methods:{
      loadList() {
        this.$axios.get('/drugstore/',
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

              // 文本换行显示，格式需要换行处理
              this.drugList = res.data.data.list;
              this.page.pages = res.data.data.pages;
              this.page.total = res.data.data.total;
             // console.log(this.drugList)
              // 对文本格式进行转换
              this.drugList.forEach((entry)=>{

                entry.manualInstruct = newLineTransform(entry.manualInstruct)
                entry.publishTime = strToDate(entry.publishTime)
              })

            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      jumpToOtherPage() {
        if (this.strategy === ''){
          this.loadList();
        } else {
          this.query();
        }
      },
      showRegisterDialogFunc() {
        this.medicineForm.publishTime = new Date().getTime();
        this.showRegisterDialog = true;
      },
      registerDrug() {
        if(this.medicineForm.publishTime === '') {
          this.medicineForm.publishTime = new Date();
        }
        if(this.medicineForm.manualInstruct === '') {
          this.medicineForm.manualInstruct = ''
        }
        this.$axios.post('/drugstore/add', this.medicineForm)
          .then((res) => {
            if(res.data.code === 1) {
              this.$message({
                message:'产品信息添加成功！',
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
      deleteRow(id) {
        this.$confirm('此操作将永久删除该条目，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type:'warning'
        })
          .then(() => {
            this.$axios.delete('/drugstore/' + id )
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
      modifyRow(value) { // modify  by liuyunxing
        this.currentModify = Object.assign({}, value);
  /*      console.log(this.currentModify.publishTime)*/
        this.currentModify.publishTime = new Date();
        this.currentModify.manualInstruct = brTransform( this.currentModify.manualInstruct); // 格式化描述内容
        this.showModifyDialog = true;
      },
      modifyDrug() {

       // if ( typeof (this.currentModify.publishTime) != 'string'){
          this.currentModify.publishTime = this.currentModify.publishTime.getTime(); // 格式化时间数据
        //}
        this.$axios.put('/drugstore/'+this.currentModify.id,this.currentModify)
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
      query() {
        this.$axios.get('/drugstore/subKind',
          {
            params:{
              pageNum:this.page.num,
              pageSize:this.page.size,
              orderBy:null,
              condition:null,
              subKind:this.strategy,
            },
          }
        )
          .then((res) => {
            if(res.data.code === 1) {
               const resList =  res.data.data.list;
              this.page.pages = res.data.data.pages;
              this.page.total = res.data.data.total;
              // 对文本格式进行转换
              resList.forEach((entry)=>{

                entry.manualInstruct = newLineTransform(entry.manualInstruct)
                entry.publishTime = strToDate(entry.publishTime)
                console.log(entry.publishTime)
              })
              this.drugList = resList;

            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      reset() {
        this.strategy = '';
        this.loadList();
      }
    },
    mounted() {
      this.loadList();
    }
  }
</script>

<style scoped>
  .btns {
    margin: 10px;
    float: right;
  }
  .btns .el-button {
    margin-left: 0;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .form_text {
    font-size: 11px;
    color: #060f78;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
</style>
