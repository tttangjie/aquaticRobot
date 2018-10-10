<template>
    <div id="technologyController">

      <!--地区筛选三级联动-->
      <div class="choose">
        <Strategy ref="queryData" v-on:queryData = queryData></Strategy>
      </div>


      <!--技术人员信息展示-->
      <el-table
        :data="allTechnology"
        style="width: 100%;margin-top: 20px"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地区"
        width="80">
        </el-table-column>
        <el-table-column
          prop="enter_time"
          label="入职时间">
        </el-table-column>
        <el-table-column
          prop="realname"
          label="联系人"
          width="80">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="80">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="80">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="number"
          label="工号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="position"
          label="职位"
          width="80">
        </el-table-column>
        <el-table-column
          label="正在维修数量">
          <template slot-scope="scope">
            <span>{{scope.row.repairNum}}</span>
            <a style="text-decoration: none;color: red;cursor:pointer;" v-show="scope.row.repairNum"
            @click="getDetails(scope.$index, scope.row)">(详情)</a>
          </template>
        </el-table-column>
        <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
        </el-table-column>
      </el-table>

      <!--新建或编辑某个技术人员信息-->
      <el-dialog title="新建人员信息" :visible.sync="dialogFormVisible" >
        <el-form :model="updateTechnology" label-width="80px" size="mini">
          <el-form-item label="姓名">
            <el-input v-model="updateTechnology.realname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="updateTechnology.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="updateTechnology.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="updateTechnology.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="updateTechnology.enter_time" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="updateTechnology.number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="updateTechnology.position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-col :span="11">
              <el-input v-model="updateTechnology.province" autocomplete="off" placeholder="省"></el-input>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-input v-model="updateTechnology.address" autocomplete="off" placeholder="市"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="updateTechnology.tel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="updateTechnology.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="更新人员信息" :visible.sync="dialogFormVisible2" >
        <el-form :model="updateTechnology" label-width="80px" size="mini">
          <el-form-item label="姓名">
            <el-input v-model="updateTechnology.realname" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="updateTechnology.username" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="updateTechnology.sex" :disabled="true">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="updateTechnology.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="时间" >
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="updateTechnology.enter_time" style="width: 100%;" :disabled="true"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="updateTechnology.number" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="updateTechnology.position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-col :span="11">
              <el-input v-model="updateTechnology.province" autocomplete="off" placeholder="省"></el-input>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-input v-model="updateTechnology.address" autocomplete="off" placeholder="市"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="updateTechnology.tel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="updateTechnology.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>

      <!--对表格的操作-->
      <div class="options">
        <ul>
          <li><el-button  plain @click="newTechnology">新建</el-button></li>
          <li><el-button plain>打印</el-button></li>
          <li><el-button plain @click="removeMany">批量删除</el-button></li>
          <li><el-button type="primary" plain>导出word</el-button></li>
          <li><el-button type="primary" plain @click.native="getExcel">导出excel</el-button></li>
          <!--<a style="text-decoration: none;color: #40a9ff;" href="http://223.2.197.240:8062/excel/technology">导出excel</a>-->
        </ul>
      </div>


      <!--分页-->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>


    </div>
</template>

<script>
  import Strategy from '../components/backStage/tools/Strategy'
    export default {
       name: "technologyController",
      data(){
         return {
           isNew:true,
           isFilter:false,
           dialogFormVisible:false,
           dialogFormVisible2:false,
           total:0,
           currentPage:1,
           allTechnology:[],
           updateTechnology:{
             address: "",
             age: 0,
             city: "",
             county: "",
             email: "",
             enter_time: "",
             id: 0,
             image: "",
             number: "",
             position: "",
             province: "",
             realname: "",
             sex: 0,
             tel: "",
             username: ""
           },
           multipleSelection: [],
           currentId:"",
           queryDatas:{},
           // dataRangeQuery:{},
           // areaSelectionQuery:{}
         }
      },
      components:{Strategy},
      methods:{
      //   分页获取技术人员
        getTechnologyByPage:function (pageNum,pageSize,OrderBy,condition) {
          this.$axios.get('/technology/?pageNum=' + pageNum + '&pageSize=' + pageSize + '&OrderBy=' + OrderBy + '&condition=' + condition)
            .then( res => {
              if (res.data.code == 1){
                let arr = res.data.data.list;
                  arr.forEach(function (item,index,array) {
                    if(array[index].sex == 1){
                      array[index].sex = "男"
                    } else {
                      array[index].sex = "女"
                    }
                      array[index].enter_time = (array[index].enter_time).split(" ")[0] + (array[index].enter_time).split(" ")[1];
                  })
                this.allTechnology = arr;
                this.total = res.data.data.total
              }
            })
            .catch( err => {
              console.log(err);
            })
        },

        // 编辑某一个技术员状态
        handleEdit:function (index,row) {
          if (row.sex === "男"){
            row.sex = "1";
          } else {
            row.sex = "0";
          }
            this.updateTechnology = row;
            this.isNew = false;
            this.dialogFormVisible2 = true;
            this.currentId = row.id;
        },

        //技术人员删除操作
        removeTechnology:function(id){
          this.$axios.delete('/technology/' + id)
            .then(res => {
              if (res.data.code === 1){
                this.$message.success({
                  message:res.data.msg,
                  showClose:true
                })
                this.getTechnologyByPage(this.currentPage,10);
              } else {
                this.$message.error({
                  message:"删除失败, " +  res.data.msg,
                  showClose:true
                })
              }
            })
            .catch(err => {
              console.log(err);
            })
        },

        // 删除一个技术员
        handleDelete:function (index,row) {
          this.removeTechnology(row.id);
        },

        //删除多个技术人员
        removeMany:function(){
          this.removeTechnology(this.multipleSelection);
        },

        // 分页操作
        handleCurrentChange:function (val) {
          // 判断是筛选条件下的分页还是全部条件下的分页
          if(this.isFilter === false){
            this.getTechnologyByPage(val,10);
          } else {
            this.getAllTechnologysByOrder(val,10,"","",this.queryDatas)
          }

        },

        //批量选择
        handleSelectionChange(val) {
          let ids = [];
          val.forEach(function (item,index,array) {
              ids.push(item.id)
          });
          this.multipleSelection = ids.join("-");
        },

        // 新建一个技术人员
        newTechnology:function () {
          this.dialogFormVisible = true;
          this.updateTechnology = {};
        },

        // 提交新建或更新
        submitForm:function () {
          // 时间转为时间戳
          let enter_time = Date.parse(this.updateTechnology.enter_time)
          // 判断是新建还是更新
          if (this.isNew === true){  //新建
            this.$axios.post('/technology/',{
              "address": this.updateTechnology.address,
              "age": this.updateTechnology.age,
              "city": this.updateTechnology.city,
              "county": this.updateTechnology.county,
              "email": this.updateTechnology.email,
              "enter_time": enter_time,
              "image": this.updateTechnology.image,
              "number": this.updateTechnology.number,
              "position": this.updateTechnology.position,
              "province": this.updateTechnology.province,
              "realname":this.updateTechnology.realname,
              "sex": this.updateTechnology.sex,
              "tel": this.updateTechnology.tel,
              "username": this.updateTechnology.username
            })
              .then( res => {
                if (res.data.code === 1){
                  this.getTechnologyByPage(this.currentPage,10);
                }
                this.dialogFormVisible = false;
              })
              .catch( err => {
                console.log(err);
              })
          } else {
            this.$axios.put('/technology/' + this.currentId,{ //编辑操作
              "address": this.updateTechnology.address,
              "age": this.updateTechnology.age,
              "email": this.updateTechnology.email,
              "enter_time": enter_time,
              "number": this.updateTechnology.number,
              "position": this.updateTechnology.position,
              "realname":this.updateTechnology.realname,
              "sex": this.updateTechnology.sex,
              "tel": this.updateTechnology.tel,
              "username": this.updateTechnology.username
            })
              .then( res => {
                console.log(res);
                if (res.data.code === 1){
                  this.getTechnologyByPage(this.currentPage,10);
                  this.dialogFormVisible2 = false;
                }
              })
              .catch( err => {
                console.log(err);
              })
          }
        },

        // 获取任务列表
        getDetails:function (index,row) {
          this.$axios.get('/technology/task?username=' + row.username)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            })
        },
        //按条件筛选技术人员
        getAllTechnologysByOrder:function(pageNum,pageSize,orderBy,condition,queryStrategy){
          this.$axios.put('/technology/stratery?pageNum=' + pageNum + '&pageSize=' + pageSize + '&orderBy=' + orderBy + '&condition=' + condition,{
            "beginTime": queryStrategy.dateBegin,
            "city": queryStrategy.city,
            "county": queryStrategy.block,
            "endTime": queryStrategy.dateEnd,
            "province": queryStrategy.province
          })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            })
        },
        // 删选技术人员
        queryData(value){
          this.isFilter = true;
          // console.log(value);
          if (value.city){
            value.city = value.city.slice(0,value.city.length-1);
          }
          //时间转时间戳
          value.dateBegin = Date.parse(value.dateBegin);
          value.dateEnd = Date.parse(value.dateEnd);
          // console.log(value);
          this.queryDatas = value;
          this.getAllTechnologysByOrder(1,10,"","",value);
        },

        // 导出excel
        getExcel:function () {
          this.$axios.get('/excel/technology',{
            responseType:'blob'
          })
            .then(res => {
              console.log(res);
              let blob = new Blob([res.data],{
                type:'application/vnd.ms-excel'
              });
              let objectUrl = URL.createObjectURL(blob);
              window.location.href = objectUrl;
            })
            .catch(err => {
              console.log(err);
            })
        }
      },
      mounted(){
        // 初始化页面获取第一页技术人员
        this.getTechnologyByPage(1,10,"","");
      },
    }
</script>

<style scoped>
#technologyController{
  /*text-align: center;*/
}
  .options{
    display: inline-block;
  }
  .options li{
    list-style: none;
    display: inline-block;
  }
  .block{
    text-align: center;
  }
  .choose{

  }
</style>
