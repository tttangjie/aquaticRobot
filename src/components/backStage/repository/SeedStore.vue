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

    <!-- 主界面 -->
    <el-table
      ref="multipleTable"
      :data="seedStoreList"
      tooltip-effect="dark"
      size="mini"
      style="width: 100%;"
      @expand-change="rowClick"
      height="550"
      highlight-current-row>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column type="expand" >
        <template slot-scope="scope" @click="toggleRow(scope.row)">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="描述">
              <span class="form_text" >{{ scope.row.description }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="子类">
        <template slot-scope="scope">{{ scope.row.subKind }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="名称">
        <template slot-scope="scope">
          <span style="color: blue;cursor:pointer;">{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="价格">
        <template slot-scope="scope">{{ scope.row.price }}</template>
      </el-table-column>

      <el-table-column
        align="center"
        label="产地">
        <template slot-scope="scope">{{ scope.row.productPlace }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="公司">
        <template slot-scope="scope">{{ scope.row.company }}</template>
      </el-table-column>

      <el-table-column
        align="center"
        label="联系人">
        <template slot-scope="scope">{{ scope.row.contact }}</template>
      </el-table-column>

      <el-table-column
        align="center"
        label="联系电话">
        <template slot-scope="scope">{{ scope.row.telPhone }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="访问数量">
        <template slot-scope="scope">{{ scope.row.visitCount }}</template>
      </el-table-column>

      <el-table-column
        align="center"
        label="发布时间">
        <!--显示时间，publishTime为date类型，格式化显示的时间-->
        <template slot-scope="scope">{{scope.row.publishTime.getFullYear()
          +'-' +( scope.row.publishTime.getMonth()+1)+'-'+scope.row.publishTime.getDate()  }}</template>
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
      title="种苗信息添加"
      :visible.sync="showRegisterDialog"
      width="450px">
      <el-form :model="seedStoreForm">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="seedStoreForm.title"></el-input>
        </el-form-item>
        <el-form-item label="种类" :label-width="formLabelWidth">
          <el-input v-model="seedStoreForm.kind"></el-input>
        </el-form-item>
        <el-form-item label="子类" :label-width="formLabelWidth">
          <el-input v-model="seedStoreForm.subKind"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="seedStoreForm.price"></el-input>
        </el-form-item>
        <el-form-item label="产地" :label-width="formLabelWidth">
          <el-input v-model="seedStoreForm.productPlace"></el-input>
        </el-form-item>
        <el-form-item label="公司" :label-width="formLabelWidth">
          <el-input v-model="seedStoreForm.company"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="seedStoreForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="seedStoreForm.telPhone"></el-input>
        </el-form-item>
        <!--<el-form-item label="访问数量" :label-width="formLabelWidth">-->
          <!--<el-input v-model="seedStoreForm.visitCount"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="发布时间" :label-width="formLabelWidth" v-if="showRegisterDialog">
          <el-date-picker
            disabled
            v-model=seedStoreForm.publishTime
            type="datetime"
            value-format="timestamp"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="5"
            :label-width="formLabelWidth"
            v-model="seedStoreForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showRegisterDialog = false">取 消</el-button>
    <el-button type="primary" @click="registerSeedStore">注 册</el-button>
  </span>
    </el-dialog>

    <!-- 更新用户的对话框 -->
    <el-dialog
      title="更新种苗信息"
      :visible.sync="showModifyDialog"
      width="450px">
      <el-form :model="currentModify">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="currentModify.title"></el-input>
        </el-form-item>
        <el-form-item label="种类" :label-width="formLabelWidth">
          <el-input v-model="currentModify.kind"></el-input>
        </el-form-item>
        <el-form-item label="子类" :label-width="formLabelWidth">
          <el-input v-model="currentModify.subKind"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="currentModify.price"></el-input>
        </el-form-item>
        <el-form-item label="产地" :label-width="formLabelWidth">
          <el-input v-model="currentModify.productPlace"></el-input>
        </el-form-item>
        <el-form-item label="公司" :label-width="formLabelWidth">
          <el-input v-model="currentModify.company"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="currentModify.contact"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="currentModify.telPhone"></el-input>
        </el-form-item>
        <el-form-item label="访问数量" :label-width="formLabelWidth">
          <el-input v-model="currentModify.visitCount"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" :label-width="formLabelWidth" v-if="showRegisterDialog">
          <el-date-picker
            disabled
            v-model=currentModify.publishTime
            type="datetime"
            value-format="timestamp"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="5"
            :label-width="formLabelWidth"
            v-model="currentModify.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showModifyDialog = false">取 消</el-button>
    <el-button type="primary" @click="modifySeed">保 存</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

  import {strToDate}  from './utils/strUtils'
  export default {
    name: "SeedStore",
    data() {
      return {
        seedStoreList:[],
        currentModify:{},
        page:{
          num: 1,
          size: 10,
          pages: 0,
          total: 0,
        },
        seedStoreForm:{
          image:'',
        },
        showRegisterDialog:false,
        showModifyDialog:false,
        formLabelWidth:'120px',
        strategy:'',
        subKinds:["蟹类","虾类","鱼类","其他","所有"],
      }
    },
    methods:{
      loadList() {
        this.$axios.get('/seedStore/',
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

              const  resList= res.data.data.list;
              this.page.pages = res.data.data.pages;
              this.page.total = res.data.data.total;
              console.log(this.seedStoreList)
              resList.forEach((entry)=>{
                entry.publishTime =  strToDate(entry.publishTime);

              })
              this.seedStoreList = resList;


            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      jumpToOtherPage() {
        this.loadList();
      },
      showRegisterDialogFunc() {
        this.seedStoreForm.publishTime = new Date().getTime();
        this.showRegisterDialog = true;
      },
      registerSeedStore() {
        let formdata = new FormData();
        formdata.append("company",this.seedStoreForm.company);
        formdata.append("contact",this.seedStoreForm.contact);
        formdata.append("description",this.seedStoreForm.description);
        formdata.append("image",this.seedStoreForm.image);
        formdata.append("kind",this.seedStoreForm.kind);
        formdata.append("price",this.seedStoreForm.price);
        formdata.append("productPlace",this.seedStoreForm.productPlace);
        formdata.append("publishTime",this.seedStoreForm.publishTime);
        formdata.append("subKind",this.seedStoreForm.subKind);
        formdata.append("telPhone",this.seedStoreForm.telPhone);
        formdata.append("title",this.seedStoreForm.title);
        formdata.append("visitCount",this.seedStoreForm.visitCount);
        this.$axios.post('/seedStore/', formdata)
          .then((res) => {
            console.log(res)
            if(res.data.code === 1) {
              this.$message({
                message:'种苗信息添加成功！',
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
            this.$axios.delete('/seedStore/' + id )
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
      modifyRow(value) {
        this.currentModify = Object.assign({}, value);
        this.showModifyDialog = true;
      },
      modifySeed() {
        let formdata = new FormData();
        formdata.append("company",this.currentModify.company);
        formdata.append("contact",this.currentModify.contact);
        formdata.append("description",this.currentModify.description);
        formdata.append("image",this.currentModify.image);
        formdata.append("kind",this.currentModify.kind);
        formdata.append("price",this.currentModify.price);
        formdata.append("productPlace",this.currentModify.productPlace);
        formdata.append("publishTime",this.currentModify.publishTime);
        formdata.append("subKind",this.currentModify.subKind);
        formdata.append("telPhone",this.currentModify.telPhone);
        formdata.append("title",this.currentModify.title);
        formdata.append("visitCount",this.currentModify.visitCount);
        // formdata = this.currentModify;
        this.$axios.put('/seedStore/'+this.currentModify.id,formdata,)
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
        this.$axios.get('/seedStore/subKind',
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
              const  resList= res.data.data.list;
              this.page.pages = res.data.data.pages;
              this.page.total = res.data.data.total;
              resList.forEach((entry)=>{
                entry.publishTime =  strToDate(entry.publishTime);

              })
              this.seedStoreList = resList;
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      reset() {
        this.strategy = '';
        this.loadList();
      },
      toggleRow(row){
        console.log(111);
        this.$refs.multipleTable.toggleRowExpansion(row, expanded);
      },
      rowClick(row, expandedRows){
        // for(var key in expandedRows){
        //   delete expandedRows[key];
        // }
        // console.log(expandedRows);
        this.$axios.get('/seedStore/' + row.id)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
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
