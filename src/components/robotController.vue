<template>
    <div class="robotController">
      <!--机器人列表展示-->
      <el-table
        :data="robots"
        style="width: 100%;margin-top: 20px;text-align: center">
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--align="center"-->
          <!--width="55">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="address"
          align="center"
          label="地区"
          width="80">
        </el-table-column>
        <el-table-column
          prop="type"
          align="center"
          label="分类"
          width="90">
        </el-table-column>
        <el-table-column
          prop="registertime"
          align="center"
          label="注册时间">
        </el-table-column>
        <el-table-column
          prop="username"
          align="center"
          label="联系人"
        width="70">
        </el-table-column>
        <el-table-column
          prop="sex"
          align="center"
          label="性别"
        width="55">
        </el-table-column>
        <el-table-column
          prop="age"
          align="center"
          label="年龄"
          width="55">
        </el-table-column>
        <el-table-column
          prop="tel"
          align="center"
          label="电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="category"
          align="center"
          label="养殖种类"
          width="80">
        </el-table-column>
        <el-table-column
          prop="feed_name"
          align="center"
          label="饵料"
          width="80">
        </el-table-column>
        <el-table-column
          prop="medicine_name"
          align="center"
          label="药品">
        </el-table-column>
        <el-table-column
          prop="number"
          align="center"
          label="编号"
          width="80">
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

      <!--新建机器人-->
      <el-dialog title="新建机器人" :visible.sync="dialogFormVisible" >
        <el-form :model="addRobot" label-width="80px">
          <el-form-item label="编号">
            <el-input v-model="addRobot.number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-input v-model="addRobot.type" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="客户ID">
            <el-input v-model="addRobot.user_id" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>

      <!--更新机器人-->
      <el-dialog title="更新机器人" :visible.sync="dialogFormVisible2" >
        <el-form :model="addRobot" label-width="80px">
          <el-form-item label="编号">
            <el-input v-model="addRobot.number" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-input v-model="addRobot.type" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="客户ID">
            <el-input v-model="addRobot.user_id" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>

      <!--对表格的操作-->
      <div class="options">
        <ul>
          <li><el-button  plain @click="newRobot">新建</el-button></li>
          <li><el-button plain>打印</el-button></li>
          <!--<li><el-button plain @click="removeRobot">删除</el-button></li>-->
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
    export default {
        name: "robotController",
      data(){
          return {
            isNew:false,
            dialogFormVisible:false,
            dialogFormVisible2:false,
            total:10,
            robots:[],
            currentPage:1,
            currentRobotId:'',
            addRobot:{
              id: '',
              number: '',
              type: '',
              user_id: ''
            }
          }
      },
      methods:{
        // 分页获取机器人信息
        getAllRoobotsByParams(pageNum,pageSize,orderBy,condition){
          this.$axios.get('/robert/all?pageNum='+ pageNum  + '&pageSize=' + pageSize + '&orderBy=' + orderBy + '&condition=' + condition)
            .then( res => {
              console.log(res);
              if(res.data.code === 1){
                let arr = res.data.data.list;
                arr.forEach(function (item,index,array) {
                  if(array[index].sex == 1){
                    array[index].sex = "男"
                  } else {
                    array[index].sex = "女"
                  }
                  if (array[index].registertime){
                    array[index].registertime = (array[index].registertime).split(" ")[0] + (array[index].registertime).split(" ")[1];
                  }
                })
                this.robots = arr;
              }
            })
            .catch(function (err) {
              console.log(err);
            })
        },

        // 编辑机器人信息
        handleEdit(index,row){
            this.dialogFormVisible2 = true;
            this.addRobot = row;
            this.currentRobotId = row.id;
        },
        // 删除当前机器人
        handleDelete(index,row){
          console.log(1111);
          this.$axios.delete('/robert/' + row.id)
            .then(res => {
              if (res.data.code === 1){
                this.getAllRoobotsByParams(1,10);
              }
            })
            .catch(err => {
              console.log(err);
            })
        },
        // 新建机器人按钮
        newRobot(){
          this.addRobot = {};
          this.dialogFormVisible = true;
        },
        // 新增或修改机器人信息
        submitForm(){
            if(this.isNew === false){  //新增机器人
              this.$axios.post('/robert/add',{
                "number": this.addRobot.number,
                "type": this.addRobot.type,
                "user_id": this.addRobot.user_id
              })
                .then(res => {
                  console.log(res);
                  if (res.data.code === 1){
                    this.dialogFormVisible = false;
                    this.getAllRoobotsByParams(1,10);
                    this.addRobot = {};
                  }
                })
                .catch(err => {
                  console.log(err);
                })
            } else {    //更改机器人信息
                this.$axios.put('/robert/' + this.currentRobotId,{
                  "number": this.addRobot.number,
                  "type": this.addRobot.type,
                  "user_id": this.addRobot.user_id
                })
                  .then(res => {
                    if (res.data.code === 1){
                      this.dialogFormVisible2 = false;
                      this.getAllRoobotsByParams(this.currentPage,10);
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  })
            }
        },
        // 分页
        handleCurrentChange(val){
            this.getAllRoobotsByParams(val,10);
        },
        // 导出excel
        getExcel(){
          this.$axios.get('/excel/robert',{
            responseType:'blob'
          })
            .then(res => {
              let blob = new Blob([res.data],{
                type:'application/vnd.ms-excel'
              });
              let objectUrl = URL.createObjectURL(blob);
              window.location.href = objectUrl;
            })
        }
      },
      mounted(){
          // 初始化获取第一页机器人信息
        this.getAllRoobotsByParams(1,10);
      }
    }
</script>

<style scoped>
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
</style>
