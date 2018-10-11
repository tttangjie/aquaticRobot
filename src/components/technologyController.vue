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
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="地区"
        width="80">
        </el-table-column>
        <el-table-column
          prop="enter_time"
          align="center"
          width="100"
          label="入职时间">
        </el-table-column>
        <el-table-column
          prop="realname"
          align="center"
          label="联系人"
          width="80">
        </el-table-column>
        <el-table-column
          prop="sex"
          align="center"
          label="性别"
          width="90">
        </el-table-column>
        <el-table-column
          prop="age"
          align="center"
          label="年龄"
          width="100">
        </el-table-column>
        <el-table-column
          prop="tel"
          width="140"
          align="center"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="email"
          width="140"
          align="center"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="number"
          align="center"
          label="工号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="position"
          align="center"
          label="职位"
          width="100">
        </el-table-column>
        <el-table-column
          label="正在维修数量" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.repairNum}}</span>
            <a style="text-decoration: none;color: red;cursor:pointer;" v-show="scope.row.repairNum"
            @click="getDetails(scope.$index, scope.row)">(详情)</a>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center"  width="150">
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

      <!--技术人员任务列表-->
      <el-dialog title="维修任务" :visible.sync="dialogTableVisible" :width="tableWidth">
        <el-table :data="tasks" style="text-align: center">
          <el-table-column property="type" label="产品类型" width="100" align="center"></el-table-column>
          <el-table-column property="number" label="机器人编号" width="100" align="center"></el-table-column>
          <el-table-column property="time" label="送修时间" width="120" align="center"></el-table-column>
          <el-table-column property="realname" label="客户" align="center"></el-table-column>
          <el-table-column property="age" label="年龄" align="center"></el-table-column>
          <el-table-column property="sex" label="性别" align="center"></el-table-column>
          <el-table-column property="tel" label="电话" width="120" align="center"></el-table-column>
          <el-table-column property="technology_name" label="负责技术员" width="120" align="center"></el-table-column>
          <el-table-column property="description" label="故障描述" width="150" align="center"></el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>0: 待维修</p>
                  <p>1: 维修中</p>
                  <p>2: 维修完成</p>
                  <p>3: 无法维修</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.status }}</el-tag>
                  </div>
                </el-popover>
              <a style="text-decoration: none;color: red;cursor:pointer;" v-show="scope.row.status != 2"
                 @click="changeStatus(scope.$index, scope.row)">(更改)</a>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog
          width="30%"
          title="修改维修状态"
          :visible.sync="innerVisible"
          append-to-body>
          <el-select v-model="currentStatus" clearable placeholder="请选择">
            <el-option
              v-for="item in repairStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span slot="footer" class="dialog-footer">
              <el-button @click="innerVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitStatus">确 定</el-button>
          </span>
        </el-dialog>


      </el-dialog>

      <!--新建某个技术人员信息-->
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

      <!--编辑某个技术人员信息-->
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
           tableWidth:'80%',
           dialogFormVisible:false,
           dialogFormVisible2:false,
           dialogTableVisible:false,
           innerVisible:false,
           tasks:[],
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
           repairStatus: [{
             value: '0',
             label: '待维修'
           },{
             value: '1',
             label: '维修中'
           },{
             value: '2',
             label: '维修完成'
           },{
             value: '3',
             label: '无法维修'
           }],
           currentStatus:-1,
           currentTaskId:-1,
           currentTechnologyUsername:''
         }
      },
      components:{Strategy},
      methods:{
         //拉取全部技术人员 性别，日期转换
        changeDateAndSexOfAllTechnology:function(arr){
          let arr2 = arr;
          arr2.forEach(function (item,index,array) {
            if(array[index].sex == 1){
              array[index].sex = "男"
            } else {
              array[index].sex = "女"
            }
            if (array[index].enter_time){
              array[index].enter_time = (array[index].enter_time).split(" ")[0] + (array[index].enter_time).split(" ")[1];
            }
          })
          return arr2;
        },
      //   分页获取技术人员
        getTechnologyByPage:function (pageNum,pageSize,OrderBy,condition) {
          this.$axios.get('/technology/?pageNum=' + pageNum + '&pageSize=' + pageSize + '&OrderBy=' + OrderBy + '&condition=' + condition)
            .then( res => {
              if (res.data.code === 1){
                this.allTechnology = this.changeDateAndSexOfAllTechnology(res.data.data.list);
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

        // 获取某一个技术人员的任务列表
        getTaskListByName:function(username){
          this.$axios.get('/technology/task?username=' + username)
            .then(res => {
              if (res.data.code === 1){
                let arr = res.data.data;
                arr.forEach(function (item,index,array) {
                  if(array[index].sex == 1){
                    array[index].sex = "男"
                  } else {
                    array[index].sex = "女"
                  }
                  if (array[index].time){
                    array[index].time = (array[index].time).split(" ")[0] + (array[index].time).split(" ")[1];
                  }
                })
                this.tasks = arr;
                this.dialogTableVisible = true;
              }
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            })
        },

        //在表格中选中一个技术人员查看他的任务列表
        getDetails:function (index,row) {
          this.getTaskListByName(row.username);
          this.currentTechnologyUsername = row.username;
        },

        //按条件筛选技术人员
        getAllTechnologysByOrder:function(pageNum,pageSize,orderBy,condition,queryStrategy){
          this.$axios.post('/technology/strategy?pageNum=' + pageNum + '&pageSize=' + pageSize + '&orderBy=' + orderBy + '&condition=' + condition,{
            "beginTime": queryStrategy.dateBegin,
            "city": queryStrategy.city,
            "county": queryStrategy.block,
            "endTime": queryStrategy.dateEnd,
            "province": queryStrategy.province
          })
            .then(res => {
              if (res.data.code === 1){
                if (res.data.data.total === 0){
                  this.allTechnology = [];
                  this.total = 0;
                  this.$message.success({
                    message:"查询成功！没有相关技术人员信息！",
                    showClose:true
                  })
                } else {
                  this.allTechnology = this.changeDateAndSexOfAllTechnology(res.data.data.list);
                  this.total = res.data.data.total
                }
              } else {
                this.$message.error({
                  message:"查询失败！",
                  showClose:true
                })
              }
            })
            .catch(err => {
              console.log(err);
            })
        },

        // 筛选技术人员
        queryData(value){
          console.log(value);
          // 检查是不是空查询
          if (value.dateBegin === "" && value.dateEnd === "" && value.province === "" && value.city === "" && value.block === "") {  //查询条件全部为空，判断为空查询
            this.getAllTechnologysByOrder(this.currentPage,10);
          } else{
            this.isFilter = true;
            this.queryDatas = value;
            this.getAllTechnologysByOrder(1,10,"","",value);
          }
        },

        //修改维修状态
        changeStatus:function(index,row){
          this.innerVisible = true;
          // this.currentStatus = row.status;
          this.currentTaskId = row.id;
        },

        //提交维修状态的修改
        submitStatus:function(){
          if (this.currentStatus === -1){
            this.$message.warning({
              message:"未选择状态！",
              showClose:true
            });
            return ;
          }
          this.$axios.put('/technology/repair/' + this.currentTaskId + '?status=' + this.currentStatus)
            .then(res => {
              if (res.data.code === 1){
                this.innerVisible = false;
                this.dialogTableVisible = true;
                this.getTaskListByName(this.this.currentTechnologyUsername);
              }else{
                this.$message.error({
                  message:res.data.msg,
                  showClose:true
                })
              }
            })
            .catch(err => {
              console.log(err);
            })
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
