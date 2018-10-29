<template>
  <div>
    <div class="btns">
      <el-button size="medium" @click="showRegisterDialog = true" type="primary">新建</el-button>
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
      :data="diseaseList"
      tooltip-effect="dark"
      size="mini"
      @expand-change="rowClick"
      style="width: 100%;"
      highlight-current-row>
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item >
              <span class="form_text"><img class="item_img" :src="scope.row.image"/></span>
            </el-form-item>
            <el-form-item label="发病原因">
              <span class="form_text">{{ scope.row.cause }}</span>
            </el-form-item>
            <el-form-item label="发病症状">
              <span class="form_text">{{ scope.row.symptom }}</span>
            </el-form-item>
            <el-form-item label="治疗方法">
              <span class="form_text">{{ scope.row.treatment }}</span>
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
        <template slot-scope="scope">{{ scope.row.diseaseName }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="访问数量">
        <template slot-scope="scope">{{ scope.row.visitCount }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="发布时间">
        <template slot-scope="scope">{{ scope.row.publishTime }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="modifyRow(scope.row)">修改</el-button>
          <el-button size="mini" @click="deleteRow(scope.row.id)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="text-align: center"
      @current-change="handleCurrentChange"
      :current-page.sync="page.num"
      :page-size="page.size"
      layout="prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>

    <!-- 新建用户的对话框 -->
    <el-dialog
      title="疾病添加"
      :visible.sync="showRegisterDialog"
      width="450px">
      <el-form :model="diseaseForm">
        <el-form-item :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="GLOBAL.Base_URL"
            :auto-upload="false"
            :on-change="handleImageChange"
            :show-file-list="false">
            <img v-if="diseaseForm.image" :src="diseaseForm.imageURL" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="疾病名称" :label-width="formLabelWidth">
          <el-input v-model="diseaseForm.diseaseName"></el-input>
        </el-form-item>
        <el-form-item label="种类" :label-width="formLabelWidth">
          <el-input v-model="diseaseForm.subKind"></el-input>
        </el-form-item>
        <el-form-item label="发病原因" :label-width="formLabelWidth">
          <el-input v-model="diseaseForm.cause"></el-input>
        </el-form-item>
        <el-form-item label="发病症状" :label-width="formLabelWidth">
          <el-input v-model="diseaseForm.symptom"></el-input>
        </el-form-item>
        <el-form-item label="治疗方法" :label-width="formLabelWidth">
          <el-input v-model="diseaseForm.treatment"></el-input>
        </el-form-item>
        <!--<el-form-item label="浏览次数" :label-width="formLabelWidth">-->
          <!--<el-input v-model="diseaseForm.visitCount"></el-input>-->
        <!--</el-form-item>-->
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
        <el-form-item label="疾病名称" :label-width="formLabelWidth">
          <el-input v-model="currentModify.diseaseName"></el-input>
        </el-form-item>
        <el-form-item label="种类" :label-width="formLabelWidth">
          <el-input v-model="currentModify.subKind"></el-input>
        </el-form-item>
        <el-form-item label="发病原因" :label-width="formLabelWidth">
          <el-input v-model="currentModify.cause"></el-input>
        </el-form-item>
        <el-form-item label="发病症状" :label-width="formLabelWidth">
          <el-input v-model="currentModify.symptom"></el-input>
        </el-form-item>
        <el-form-item label="治疗方法" :label-width="formLabelWidth">
          <el-input v-model="currentModify.treatment"></el-input>
        </el-form-item>
        <el-form-item label="浏览次数" :label-width="formLabelWidth">
          <el-input v-model="currentModify.visitCount"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showModifyDialog = false">取 消</el-button>
    <el-button type="primary" @click="modifyDisease">保 存</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Disease",
    data() {
      return {
        diseaseList:[],
        currentModify:{},
        page:{
          num: 1,
          size: 10,
          pages: 0,
          total: 0,
        },
        diseaseForm:{
          image:'',
        },
        subKinds:["鱼类","虾类","蟹类","其他","所有"],
        showRegisterDialog:false,
        showModifyDialog:false,
        formLabelWidth:'120px',
        strategy:'',
      }
    },
    methods:{

      loadList() {
        this.$axios.get('/disease/',
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
              this.diseaseList = res.data.data.list;
              this.page.pages = res.data.data.pages;
              this.page.total = res.data.data.total;
              for (let item in this.diseaseList) {
                if(this.diseaseList.hasOwnProperty(item)) {
                  this.diseaseList[item].publishTime = this.diseaseList[item].publishTime.substring(0, 11);
                }
              }
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      handleCurrentChange(val) {
        // 判断是分类查询的分页还是全部的分页
        if(this.strategy === ''){
          this.loadList();
        } else {
          this.query();
        }
      },
      registerExpert() {
        this.diseaseForm.publishTime = new Date().getTime();
        let formdata = new FormData();
        formdata.append("cause",this.diseaseForm.cause);
        formdata.append("diseaseName",this.diseaseForm.diseaseName);
        formdata.append("image",this.diseaseForm.image);
        formdata.append("publishTime",this.diseaseForm.publishTime);
        formdata.append("subKind",this.diseaseForm.subKind);
        formdata.append("symptom",this.diseaseForm.symptom);
        formdata.append("treatment",this.diseaseForm.treatment);
        formdata.append("visitCount",this.diseaseForm.visitCount);
       this.$axios.post('/disease/add', formdata)
          .then((res) => {
            if(res.data.code === 1) {
              this.$message({
                message:'疾病信息添加成功！',
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
            this.$axios.delete('/disease/' + id )
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
      modifyDisease() {
        let formdata = new FormData();
        formdata.append("cause",this.currentModify.cause);
        formdata.append("diseaseName",this.currentModify.diseaseName);
        formdata.append("image",this.currentModify.image);
        formdata.append("publishTime",this.currentModify.publishTime);
        formdata.append("subKind",this.currentModify.subKind);
        formdata.append("symptom",this.currentModify.symptom);
        formdata.append("treatment",this.currentModify.treatment);
        formdata.append("visitCount",this.currentModify.visitCount);
        this.$axios.put('/disease/'+this.currentModify.id,formdata)
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
        this.diseaseForm.imageURL = URL.createObjectURL(file.raw);
        this.diseaseForm.image = file.raw
      },
      handleImageModify(file) {
        this.currentModify.imageURL = URL.createObjectURL(file.raw);
        this.currentModify.image = file.raw
      },
      query() {
        this.$axios.get('/disease/subKind',
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
              this.diseaseList = res.data.data.list;
              this.page.pages = res.data.data.pages;
              this.page.total = res.data.data.total;
              for (let item in this.diseaseList) {
                if(this.diseaseList.hasOwnProperty(item)) {
                  this.diseaseList[item].publishTime = this.diseaseList[item].publishTime.substring(0, 11);
                }
              }
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
        this.$axios.get('/disease/' + id)
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
