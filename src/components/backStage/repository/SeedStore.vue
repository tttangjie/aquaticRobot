<template>
  <div>
    <div class="btns">
      <el-button size="medium" @click="showRegisterDialogFunc" class="normal_button">新建</el-button>
      <el-select v-model="strategy" placeholder="请选择" style="width: 120px;">
        <el-option
          v-for="(item,index) in subKinds"
          :key="index"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <!--<el-input size="medium" v-model="strategy" style="width: 120px;"></el-input>-->
      <el-button class="plain_button" size="medium" @click="query">筛选</el-button>
      <el-button class="plain_button" size="medium" @click="reset">重置</el-button>
    </div>

    <!-- 主界面 -->
    <el-table
      ref="multipleTable"
      :data="seedStoreList"
      tooltip-effect="dark"
      size="mini"
      style="margin-top: 20px;"
      @expand-change="rowClick"
      height="550"
      highlight-current-row>
      <el-table-column
        type="index"
        align="center"
        width="40">
      </el-table-column>
      <el-table-column type="expand" >
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item >
              <span class="form_text"><img class="item_img" :src="scope.row.image"/></span>
            </el-form-item>
            <el-form-item label="描述">
              <span class="form_text" >{{ scope.row.description }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="类别">
        <template slot-scope="scope">{{ scope.row.subKind }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="名称">
        <template slot-scope="scope">{{ scope.row.title }}
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
        <template slot-scope="scope">{{ scope.row.publishTime }}</template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button class="plain_button" size="mini" @click="modifyRow(scope.row)">修改</el-button>
          <el-button class="normal_button" size="mini" @click="deleteRow(scope.row.id)">删除</el-button>
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
      width="450px"
      @closed="handleRegisterClose">
      <el-form :model="seedStoreForm">
        <el-form-item :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="GLOBAL.Base_URL"
            :auto-upload="false"
            :on-change="handleImageChange"
            :show-file-list="false">
            <img v-if="seedStoreForm.image" :src="seedStoreForm.imageURL" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
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
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="5"
            :label-width="formLabelWidth"
            v-model="seedStoreForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button class="plain_button" @click="showRegisterDialog = false">取 消</el-button>
    <el-button class="normal_button" @click="registerSeedStore">注 册</el-button>
  </span>
    </el-dialog>

    <!-- 更新用户的对话框 -->
    <el-dialog
      title="更新种苗信息"
      :visible.sync="showModifyDialog"
      width="450px">
      <el-form :model="currentModify">
        <el-form-item :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="GLOBAL.Base_URL"
            :auto-upload="false"
            :on-change="handleImageModify"
            :show-file-list="false">
            <img v-if="currentModify.image" :src="currentModify.imageURL" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
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
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="5"
            :label-width="formLabelWidth"
            v-model="currentModify.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button class="plain_button" @click="showModifyDialog = false">取 消</el-button>
    <el-button class="normal_button" @click="modifySeed">保 存</el-button>
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
              for (let item in resList) {
                if(resList.hasOwnProperty(item)) {
                  resList[item].publishTime =resList[item].publishTime.substring(0, 11);
                }
              }
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
      handleRegisterClose() {
        this.seedStoreForm = {};
        this.seedStoreForm.image = '';
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
        this.currentModify.imageURL = this.currentModify.image;
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
      handleImageChange(file) {
        this.seedStoreForm.imageURL = URL.createObjectURL(file.raw);
        this.seedStoreForm.image = file.raw
      },
      handleImageModify(file) {
        this.currentModify.imageURL = URL.createObjectURL(file.raw);
        this.currentModify.image = file.raw
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
      addVsit(id) {
        this.$axios.get('/seedStore/' + id)
          .then(res => {

          })
          .catch(err => {
            console.log(err);
          })
      },
      rowClick(row, expandedRows){
        for (let item in expandedRows) {
          if(expandedRows[item].id === row.id) {
            this.addVsit(row.id);
            row.visitCount++;
            return;
          }
        }
      },
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

