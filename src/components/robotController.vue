<template>
    <div class="robotController">

      <!--按条件搜索-->
      <div style="margin-top: 15px" >
          <el-select v-model="select"  placeholder="筛选类型" style="width: 130px;" @change="selectChange">
            <el-option label="机器人类型" value="1"></el-option>
            <el-option label="客户ID" value="2"></el-option>
          </el-select>
        <el-select v-model="input5"  placeholder="筛选内容" style="width: 130px;">
          <el-option
            v-for="(item,index) in select_keys"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-button size="medium" @click.native="searchByKey">筛选</el-button>
        <el-button size="medium" @click.native="reset">重置</el-button>
      </div>

      <!--机器人列表展示-->
      <el-table
        :data="robots"
        style="width: 100%;margin-top: 20px;text-align: center">
        <el-table-column
          prop="position"
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
          align="center"
          label="用户名"
        width="60">
          <template slot-scope="scope">{{scope.row.username}}
          </template>>
        </el-table-column>
        <el-table-column
          align="center"
          label="姓名"
        width="60">
          <template slot-scope="scope">{{scope.row.realname}}
          </template>>
        </el-table-column>
        <el-table-column
          prop="sex"
          align="center"
          label="性别"
        width="50">
        </el-table-column>
        <el-table-column
          prop="age"
          align="center"
          label="年龄"
          width="50">
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
          width="60">
        </el-table-column>
        <el-table-column
          prop="feed_name"
          align="center"
          label="饵料"
          width="80">
        </el-table-column>
        <el-table-column
          align="center"
          label="药品">
          <template slot-scope="scope">
            <abbr v-if="scope.row.medicine_name != null" style="cursor:pointer;text-decoration: none" :title=scope.row.medicine_name>{{ (scope.row.medicine_name).slice(0,10)}}</abbr>
          </template>
        </el-table-column>
        <el-table-column
          prop="number"
          align="center"
          label="编号"
          width="80">
        </el-table-column>
        <el-table-column label="操作" align="center"  width="180">
          <template slot-scope="scope">
            <el-button
              style="width: 40px;padding: 5px"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              style="width: 40px;padding: 5px"
              size="mini"
              type="primary"
              @click="changeCustomer(scope.$index, scope.row)">分配</el-button>
            <el-button
              style="width: 40px;padding: 5px"
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
            <el-select v-model="addRobot.type" placeholder="请选择">
              <el-option
                v-for="(item,index) in robotType"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户">
            <el-select v-model="addRobot.currentCustomerRealname" placeholder="请选择">
              <el-option
                v-for="(item,index) in customersRealname"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
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
            <el-input v-model="addRobot.number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-input v-model="addRobot.type" autocomplete="off"></el-input>
          </el-form-item>
          <!--<el-form-item label="客户ID">-->
            <!--<el-input v-model="addRobot.user_id" autocomplete="off" :disabled="true"></el-input>-->
          <!--</el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>

      <!--重新分配机器人-->
      <el-dialog title="重新分配机器人" :visible.sync="dialogFormVisible3" >
        <label>客户名称</label>
        <el-select v-model="currentCustomerRealname" placeholder="请选择">
          <el-option
            v-for="(item,index) in customersRealname"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="submitAssgin">确 定</el-button>
        </div>
      </el-dialog>

      <!--对表格的操作-->
      <div class="options">
        <ul>
          <li><el-button  plain @click="newRobot">新建</el-button></li>
          <li><el-button type="primary" plain @click.native="getExcel">导出excel</el-button></li>
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
            restaurants: [],
            isNew:false,
            dialogFormVisible:false,
            dialogFormVisible2:false,
            dialogFormVisible3:false,
            total:10,
            robots:[],
            currentPage:1,
            currentRobotId:'',
            input5:'',
            select:'',
            addRobot:{
              id: '',
              number: '',
              type: '',
              user_id: '',
              currentCustomerRealname:''
            },
            customersRealname:[],
            customersId:[],
            customers:{},
            currentCustomerId:-1,
            currentCustomerRealname:'',
            robotType:[],
            select_keys:[],
          }
      },
      methods:{
        selectChange(){
          this.input5 = '';
          // console.log(this.select);
          if (this.select == ""){
            this.select_keys = [];
          } else if(this.select == 1){
            this.select_keys = this.robotType
          } else if(this.select == 2) {
            // console.log(this.customersRealname);
            this.select_keys = this.customersRealname
          }
        },

        reset(){
          this.select = '';
          this.input5 = '';
          this.getAllRoobotsByParams(1,10);
        },
          // 拉取机器人列表 时间和性别转换  省市区拼接
        changeDateAndSex(arr){
          let arr2 = arr;
          arr2.forEach(function (item,index,array) {
            if(array[index].sex == 1){
              array[index].sex = "男"
            } else {
              array[index].sex = "女"
            }
            if (array[index].registertime){
              array[index].registertime = (array[index].registertime).split(" ")[0] + (array[index].registertime).split(" ")[1];
            }
            array[index]['position'] = "";
            if (array[index].province != null && array[index].province != ""){
              array[index]['position'] += array[index].province
            }
            if (array[index].city != null && array[index].city != ""){
              array[index]['position'] += array[index].city;
            }
            if (array[index].county != null && array[index].county != ""){
              array[index]['position'] += array[index].county;
            }
          })
          return arr2;
        },
        // 分页获取机器人信息
        getAllRoobotsByParams(pageNum,pageSize,orderBy,condition){
          this.$axios.get('/robert/all?pageNum='+ pageNum  + '&pageSize=' + pageSize + '&orderBy=' + orderBy + '&condition=' + condition)
            .then( res => {
              if(res.data.code === 1){
                this.robots = this.changeDateAndSex( res.data.data.list);
                this.total = res.data.data.total;
                // console.log(this.robots);
              }
            })
            .catch(function (err) {
              console.log(err);
            })
        },

        // 编辑机器人信息
        handleEdit(index,row){
            this.isNew = false;
            this.dialogFormVisible2 = true;
            this.addRobot = row;
            this.currentRobotId = row.id;
        },
        // 删除当前机器人
        handleDelete(index,row){
          this.$axios.delete('/robert/' + row.id)
            .then(res => {
              if (res.data.code === 1){
                this.getAllRoobotsByParams(this.currentPage,10);
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
          this.isNew = true;
        },
        // 新增或修改机器人信息
        submitForm(){
          // console.log(this.isNew);
            if(this.isNew === true){  //新增机器人
              // 根据username找出对应的id
              let id = -1;
              let arr = this.customers;
              for (let i = 0;i< arr.length;i++){
                if (arr[i].username === this.currentCustomerRealname){
                  id = arr[i].id;
                }
              }
              this.$axios.post('/robert/add',{
                "number": this.addRobot.number,
                "type": this.addRobot.type,
                "user_id": id
              })
                .then(res => {
                  if (res.data.code === 1){
                    this.$message.success({
                      message:"新建成功",
                      showClose:true
                    });
                    this.dialogFormVisible = false;
                    this.getAllRoobotsByParams(this.currentPage,10);
                    this.addRobot = {};
                    this.isNew = false;
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
                    // console.log(res);
                    if (res.data.code === 1){
                      this.dialogFormVisible2 = false;
                      this.getAllRoobotsByParams(this.currentPage,10);
                      this.isNew = false;
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  })
            }
        },
        // 分页
        handleCurrentChange(val){
          console.log(this.select);
          console.log(val);
          //判断是什么条件下的分页
          switch (this.select) {
            case '':
              this.getAllRoobotsByParams(val, 10);
              break;
            case '1':
              console.log(1111);
              this.getRobotsByType(val, 10, "", "", this.input5);
              break;
            case '2':
              this.getRobotsByCustomer(val, 10, "", "", this.input5);
              break;
            default:
              break;
          }
        },
        //根据机器人类型获取机器人
        getRobotsByType(pageNum,pageSize,orderBy,condition,type){
          this.$axios.get('/robert/type?pageNum=' + pageNum + '&pageSize=' + pageSize + '&orderBy=' + orderBy + '&condition=' + condition + '&type=' + type)
            .then(res => {
              console.log(res);
              if (res.data.code === 1){
                this.robots = this.changeDateAndSex(res.data.data.list);
                this.total = res.data.data.total;
                this.currentPage = pageNum;
              }
            })
            .catch(err => {
              console.log(err);
            })
        },

        //根据客户Id获取机器人
        getRobotsByCustomer(pageNum,pageSize,orderBy,condition,customer_id){
          this.$axios.get('/robert/customer?pageNum=' + pageNum + '&pageSize=' + pageSize + '&orderBy=' + orderBy + '&condition=' + condition + '&customer_id=' + customer_id)
                .then(res => {
                  if (res.data.code === 1){
                this.robots = this.changeDateAndSex(res.data.data.list);
                    this.total = res.data.data.total;
                    this.currentPage = pageNum;
              }
            })
            .catch(err => {
              console.log(err);
            })
        },
        //根据客户Id或者机器人类型获取机器人
        searchByKey(){
          let select_id = -1;
          if (this.select == 1){  //根据机器人类型获取机器人
            this.getRobotsByType(1,10,"","",this.input5);
          } else if(this.select == 2){
            for (let i = 0;i<this.customers.length;i++){
              if (this.customers[i].username == this.input5){
                select_id = this.customers[i].id
              }
            }
            this.getRobotsByCustomer(1,10,"","",select_id);
          } else {
            this.getAllRoobotsByParams(1,10);
          }
        },
        //获取客户id列表
        getCustomersID(){
          this.$axios.get('/customer/ids')
            .then(res => {
              if (res.data.code ===1 ){
                this.customers = res.data.data;
                let arr = res.data.data;
                let arr2 = new Array();
                let arr3 = new Array();
                arr.forEach(function (item) {
                  arr2.push(item.username);
                  arr3.push(item.id);
                })
                this.restaurants = arr2;
                this.customersRealname = arr2;
                this.customersId = arr3;
              }
            })
            .catch(err => {
              console.log(err);
            })
        },
        changeCustomer(index,row){
          this.currentCustomerId = row.customer_id;
          this.currentCustomerRealname = row.username;
          this.dialogFormVisible3 = true;
          this.currentRobotId = row.id;
        },
        // 重新分配机器人
        submitAssgin(){
          // 根据username找出对应的id
          let id = -1;
          let arr = this.customers;
          for (let i = 0;i< arr.length;i++){
            if (arr[i].username === this.currentCustomerRealname){
              id = arr[i].id;
            }
          }
          this.$axios.post('/robert/assign?robert_id=' + this.currentRobotId + '&user_id=' + id)
            .then(res => {
              // console.log(res);
              if (res.data.code === 1){
                this.$message.success({
                  message:"重新分配成功！",
                  showClose:true
                });
                this.dialogFormVisible3 = false;
                this.getAllRoobotsByParams(this.currentPage,10);
              }
            })
            .catch(err => {
              console.log(err);
            })
        },
        //获取所有机器人类型
        getAllRobotType(){
          this.$axios.get('/robert/all/type')
            .then(res => {
              if (res.data.code === 1){
                this.robotType = res.data.data;
              }
            })
            .catch(err => {
              console.log(err);
            })
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
            .catch(err => {
              console.log(err);
            })
        }
      },
      mounted(){
          // 初始化获取第一页机器人信息
        this.getAllRoobotsByParams(1,10);
        //获取所有客户的id
        this.getCustomersID();
        //获取所有机器人类型
        this.getAllRobotType();
      }
    }
</script>

<style scoped>
  .options{
    display: inline-block;
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .options li{
    list-style: none;
    display: inline-block;
  }
  .block{
    text-align: center;
  }
</style>
