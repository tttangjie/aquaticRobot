<template>
    <div id="feedStore">
      <div class="btns">
        <el-button size="medium" @click="showRegisterDialog = true" class="normal_button">新建</el-button>
        <el-select v-model="subKind" placeholder="请选择" style="width: 120px;">
          <el-option
            v-for="(item,index) in subKinds"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-button class="plain_button" size="medium" @click="query">筛选</el-button>
        <el-button class="plain_button" size="medium" @click="reset">重置</el-button>
      </div>

      <!--投喂百科展示-->
      <el-table
        ref="multipleTable"
        :data="feedStores"
        tooltip-effect="dark"
        @expand-change="rowClick"
        size="mini"
        style="margin-top: 20px;"
        height="550"
        highlight-current-row>
        <el-table-column
          type="index"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item >
                <span class="form_text"><img class="item_img" :src="scope.row.image"/></span>
              </el-form-item>
              <el-form-item label="公司">
                <span class="form_text">{{ scope.row.company }}</span>
              </el-form-item>
              <el-form-item label="描述">
                <span class="form_text">{{ scope.row.manualInstruct }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="类别" align="center">
          <template slot-scope="scope">{{ scope.row.subKind }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="名称">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="价格">
          <template slot-scope="scope">{{ scope.row.price }}</template>
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
            <el-button class="plain_button" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button class="normal_button" size="mini" @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新建投喂的对话框 -->
      <el-dialog
        title="投喂添加"
        :visible.sync="showRegisterDialog"
        width="450px"
        @closed="handleRegisterClose">
        <el-form :model="feedStoreForm">
          <el-form-item :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              :action="GLOBAL.Base_URL"
              :auto-upload="false"
              :on-change="handleImageChange"
              :show-file-list="false">
              <img v-if="feedStoreForm.image" :src="feedStoreForm.imageURL" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="feedStoreForm.name"></el-input>
          </el-form-item>
          <el-form-item label="种类" :label-width="formLabelWidth">
            <el-input v-model="feedStoreForm.kind"></el-input>
          </el-form-item>
          <el-form-item label="子类" :label-width="formLabelWidth">
            <el-select v-model="feedStoreForm.subKind" placeholder="请选择" style="width: 120px;">
              <el-option
                v-for="(item,index) in subKinds"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="feedStoreForm.price"></el-input>
          </el-form-item>
          <el-form-item label="公司" :label-width="formLabelWidth">
            <el-input v-model="feedStoreForm.company"></el-input>
          </el-form-item>
          <el-form-item label="联系人" :label-width="formLabelWidth">
            <el-input v-model="feedStoreForm.contact"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="feedStoreForm.telPhone"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="feedStoreForm.manualInstruct"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button class="plain_button" @click="showRegisterDialog = false">取 消</el-button>
    <el-button class="normal_button" @click="registerFeedStore">注 册</el-button>
  </span>
      </el-dialog>

      <!--更新投喂百科对话框-->
      <el-dialog
        title="投喂添加"
        :visible.sync="changeRegisterDialog"
        width="450px"
        @closed="handleRegisterClose">
        <el-form :model="feedStoreForm">
          <el-form-item :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              :action="GLOBAL.Base_URL"
              :auto-upload="false"
              :on-change="handleImageModify"
              :show-file-list="false">
              <img v-if="feedStoreForm.image" :src="feedStoreForm.imageURL" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="feedStoreForm.name"></el-input>
          </el-form-item>
          <el-form-item label="种类" :label-width="formLabelWidth">
            <el-input v-model="feedStoreForm.kind"></el-input>
          </el-form-item>
          <el-form-item label="子类" :label-width="formLabelWidth">
            <el-select v-model="feedStoreForm.subKind" placeholder="请选择" style="width: 120px;">
              <el-option
                v-for="(item,index) in subKinds"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="feedStoreForm.price"></el-input>
          </el-form-item>
          <el-form-item label="公司" :label-width="formLabelWidth">
            <el-input v-model="feedStoreForm.company"></el-input>
          </el-form-item>
          <el-form-item label="联系人" :label-width="formLabelWidth">
            <el-input v-model="feedStoreForm.contact"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="feedStoreForm.telPhone"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="feedStoreForm.manualInstruct"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button class="plain_button" @click="changeRegisterDialog = false">取&#160消</el-button>
    <el-button class="normal_button" @click="changeOneFeedStore">更&#160改</el-button>
  </span>
      </el-dialog>

      <!--分页-->
      <el-pagination
        style="text-align: center"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "feedStore",
      data(){
          return{
            subKind:'',
            formLabelWidth:'120px',
            showRegisterDialog:false,
            changeRegisterDialog:false,
            total:0,
            currentPage:1,
            subKinds:["鱼类","虾类","蟹类","其他","所有"],
            feedStores:[],
            feedStoreForm:{
              company: "",
              contact: "",
              image: "",
              kind: "",
              manualInstruct: "",
              name: "",
              price: "",
              subKind: "",
              telPhone: "",
              type: "",
            },
            currentFeedStoreId:-1
          }
      },
      methods:{
        handleRegisterClose() {
          this.feedStoreForm = {};
          this.feedStoreForm.image = '';
        },
          // 新建投喂百科
        registerFeedStore(){
          let formdata = new FormData();
          formdata.append("company",this.feedStoreForm.company);
          formdata.append("contact",this.feedStoreForm.contact);
          formdata.append("image",this.feedStoreForm.image);
          formdata.append("kind",this.feedStoreForm.kind);
          formdata.append("manualInstruct",this.feedStoreForm.manualInstruct);
          formdata.append("name",this.feedStoreForm.name);
          formdata.append("price",this.feedStoreForm.price);
          formdata.append("subKind",this.feedStoreForm.subKind);
          formdata.append("telPhone",this.feedStoreForm.telPhone);
          formdata.append("type",this.feedStoreForm.type);
          this.$axios.post('/feedStore/',formdata)
            .then(res => {
              if (res.data.code === 1){
                this.getAllFeedStore(1,10);
                this.showRegisterDialog = false;
              }
            })
            .catch(err => {
              console.log(err);
            })
        },
          // 获取所有投喂百科
          getAllFeedStore(pageNum,pageSize,orderBy,condition){
            this.$axios.get('/feedStore/?pageNum=' + pageNum + '&pageSize=' + pageSize + '&orderBy=' + orderBy + '&condition=' + condition)
              .then(res => {
                if (res.data.code === 1){
                  const  resList= res.data.data.list;
                  for (let item in resList) {
                    if(resList.hasOwnProperty(item)) {
                      resList[item].publishTime =resList[item].publishTime.substring(0, 11);
                    }
                  }
                  this.total = res.data.data.total;
                  this.feedStores = resList;
                }
              })
              .catch(err => {
                console.log(err);
              })
          },
        // 按照类别获取投喂百科
        getFeedStoreBySunKind(pageNum,pageSize,orderBy,condition,subKind){
          this.$axios.get('/feedStore/subKind?pageNum=' + pageNum + '&pageSize=' + pageSize + '&orderBy=' + orderBy + '&condition=' + condition + '&subKind=' + subKind)
            .then(res => {
              if (res.data.code === 1){
                this.feedStores = res.data.data.list;
                this.total = res.data.data.total;
              }
            })
            .catch(err => {
              console.log(err);
            })
        },
        handleImageChange(file) {
          this.feedStoreForm.imageURL = URL.createObjectURL(file.raw);
          this.feedStoreForm.image = file.raw
        },
        handleImageModify(file) {
          this.feedStoreForm.imageURL = URL.createObjectURL(file.raw);
          this.feedStoreForm.image = file.raw
        },
        //按照类别查询
        query(){
            this.getFeedStoreBySunKind(1,10,"","",this.subKind);
        },
        // 重置查询
        reset(){
            this.subKind = '';
            this.getAllFeedStore(1,10);
        },
        // 删除某一条投喂百科
        handleDelete(index,row){
          // console.log(row);
          this.$axios.delete('/feedStore/' + row.id)
            .then(res => {
              if (res.data.code === 1){
                this.$message.success({
                  message:"删除成功",
                  showClose:true
                });
                this.getAllFeedStore(1,10);
              }
            })
            .catch(err => {
              console.log(err);
            })
        },
        // 修改一条百科
        handleEdit(index,row){
          this.currentFeedStoreId = row.id;
          this.changeRegisterDialog = true;
          this.feedStoreForm = row;
          this.feedStoreForm.imageURL = this.feedStoreForm.image;
        },
        // 更新投喂百科
        changeOneFeedStore(){
          let formdata = new FormData();
          formdata.append("company",this.feedStoreForm.company);
          formdata.append("contact",this.feedStoreForm.contact);
          formdata.append("image",this.feedStoreForm.image);
          formdata.append("kind",this.feedStoreForm.kind);
          formdata.append("manualInstruct",this.feedStoreForm.manualInstruct);
          formdata.append("name",this.feedStoreForm.name);
          formdata.append("price",this.feedStoreForm.price);
          formdata.append("subKind",this.feedStoreForm.subKind);
          formdata.append("telPhone",this.feedStoreForm.telPhone);
          formdata.append("type",this.feedStoreForm.type);
          this.$axios.put('/feedStore/' + this.currentFeedStoreId, formdata)
            .then(res => {
              if(res.data.code === 1) {
                this.getAllFeedStore(1,10);
                this.changeRegisterDialog = false;
              }            })
            .catch(err => {
              console.log(err);
            })
        },
        // 分页
        handleCurrentChange(val){
          // 判断是查询还是列表的分页
          if(this.subKind == ''){
            this.getAllFeedStore(val,10);
          } else {
            this.getFeedStoreBySunKind(val,10,"","",this.subKind);
          }
        },
        addVsit(id) {
          this.$axios.get('/feedStore/' + id)
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
      mounted(){
          this.getAllFeedStore(1,10);
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

