<template>
    <div>

      <!--地区筛选三级联动-->
      <div class="choose">
        <Strategy ref="queryData" v-on:queryData = queryData></Strategy>
      </div>

      <!--客户信息表格-->
      <el-table
        ref="multipleTable"
        :data="customers"
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
        <template slot-scope="scope">{{ scope.row.location }}</template>
      </el-table-column>
        <el-table-column
          align="center"
          label="用户名">
          <template slot-scope="scope">{{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="姓名">
          <template slot-scope="scope">{{ scope.row.realname }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="性别">
          <template slot-scope="scope">{{ scope.row.sex }}</template>
        </el-table-column>
      <el-table-column
        align="center"
        label="年龄"
        width="55">
        <template slot-scope="scope">{{ scope.row.age }}</template>
      </el-table-column>
        <el-table-column
          align="center"
          label="产品类别">
          <template slot-scope="scope">{{ scope.row.type }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="联系电话">
          <template slot-scope="scope">{{ scope.row.tel }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="邮箱"
          >
          <template slot-scope="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button class="plain_button" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button class="normal_button" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--新建某个客户信息-->
      <el-dialog title="普通用户注册"
                 :visible.sync="dialogFormVisible"
                 width="450px"
                 @closed="handleRegisterClose">
        <el-form :model="customerRegist" label-width="80px" size="mini">
          <el-form-item label="姓名">
            <el-input v-model="customerRegist.realname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="customerRegist.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="customerRegist.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="customerRegist.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地区">
            <ThreeLink :reset="flag.reset" v-on:areaDate = areaDate> </ThreeLink>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="customerRegist.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="customerRegist.tel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="customerRegist.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="负责类别">
            <el-input v-model="customerRegist.type" autocomplete="off"></el-input>
            <!--<el-select v-model="customerRegist.type" clearable placeholder="请选择">-->
              <!--<el-option-->
                <!--v-for="item in types"-->
                <!--:key="item.value"-->
                <!--:label="item.value"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>          -->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="plain_button" @click="dialogFormVisible = false">取 消</el-button>
          <el-button class="normal_button" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>

      <!--更新某个客户信息-->
      <el-dialog title="更新客户信息"
                 :visible.sync="dialogFormVisible2"
                 width="450px">
        <el-form :model="customerChange" label-width="80px" size="mini">
          <el-form-item label="姓名">
            <el-input v-model="customerChange.realname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="customerChange.username" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="customerChange.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="customerChange.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地区">
            <ThreeLink v-on:areaDate = areaDate> </ThreeLink>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="customerChange.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="customerChange.tel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="customerChange.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="负责类别">
            <el-input v-model="customerChange.type" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="plain_button" @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button class="normal_button" @click="changeCustomer">确 定</el-button>
        </div>
      </el-dialog>

      <!--对表格的操作-->
      <div class="options">
        <ul>
          <li><el-button size="medium"  class="plain_button" @click="newCustomer">新建</el-button></li>
          <li><el-button size="medium"  class="plain_button" @click="removeMany">批量删除</el-button></li>
          <li><el-button size="medium"  class="light_button" @click.native="getExcel">导出excel</el-button></li>
          <li><el-button size="medium"  class="light_button" @click.native="getWord">导出word</el-button></li>
          <li><el-button size="medium"  class="light_button" @click.native="getPDF">导出pdf</el-button></li>

        </ul>
      </div>

      <!--分页-->
      <el-pagination
        style="text-align: center"
        @current-change="handleCurrentChange"
        :current-page.sync="page.num"
        :page-size="page.size"
        layout="prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
</template>

<script>
  import ThreeLink from '../tools/ThreeLink'
  import Strategy from '../tools/Strategy'
    export default {
      name: "customerController",
      components:{Strategy,ThreeLink},
      data(){
          return {
            // types:[""],
            allList:[],
            customerRegist:{},
            customerChange:{},
            dialogFormVisible2:false,
            dialogFormVisible:false,
            multipleSelection:[],
            customers:[],
            page:{
              num: 1,
              size: 10,
              pages: 0,
              total: 0,
            },
            flag:{
              reset:false,
            },
            isFilter:false,
            queryDatas:{},
            currentCustomerID:-1,
            areaSelection:{},
          }
      },
      methods:{
        // 拉取客户列表 时间和性别转换  省市区拼接
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
            array[index]['location'] = "";
            if (array[index].province != null && array[index].province != ""){
              array[index]['location'] += array[index].province
            }
            if (array[index].city != null && array[index].city != ""){
              array[index]['location'] += array[index].city;
            }
            if (array[index].county != null && array[index].county != ""){
              array[index]['location'] += array[index].county;
            }
          })
          return arr2;
        },
          // 获取所有客户信息
        getAllCustomers(){
          this.$axios.get('/customer/',{
            params:{
              pageNum:this.page.num,
              pageSize:this.page.size,
              orderBy:null,
              condition:null,
            }
          })
            .then(res => {
              if (res.data.code === 1){
                this.customers = this.changeDateAndSex( res.data.data.list);
                this.page.total = res.data.data.total;
              }
            })
            .catch(err => {
            })
        },
        //删除用户
        removeCustomer(ids){
          this.$axios.delete('/customer/' + ids)
            .then(res => {
              if (res.data.code === 1){
                this.getAllCustomers();
                this.$message.success({
                  message:"删除成功",
                  showClose:true
                })
              }
            })
            .catch(err => {
              console.log(err);
            })
        },
        handleSelectionChange(val){
          let ids = [];
          val.forEach(function (item,index,array) {
            ids.push(item.id)
          });
          this.multipleSelection = ids.join("-");
        },
        handleEdit(index,row){
          var b = Object.assign({}, row)
          this.customerChange = b;
          this.currentCustomerID = row.id;
          this.dialogFormVisible2 = true;
          if (this.customerChange.sex == "男"){
            this.customerChange.sex = '1';
          } else {
            this.customerChange.sex = '0';
          }
          console.log(this.customerChange.sex);
        },
        // 提交更新用户信息
        changeCustomer(){
          if(this.areaSelection.province)
            this.customerChange.province = this.areaSelection.province.slice(0,this.areaSelection.province.length-1);
          else this.customerChange.province = '';
          if(this.areaSelection.city)
            this.customerChange.city = this.areaSelection.city.slice(0,this.areaSelection.city.length-1);
          else this.customerChange.city = '';
          if(this.areaSelection.block)
            this.customerChange.county = this.areaSelection.block.slice(0,this.areaSelection.block.length-1);
          else this.customerChange.county = '';
          this.$axios.put('/customer/' + this.currentCustomerID,{
            "address": this.customerChange.address,
            "age": this.customerChange.age,
            "city": this.customerChange.city,
            "county": this.customerChange.county,
            "email": this.customerChange.email,
            "image": "",
            "province": this.customerChange.province,
            "realname":this.customerChange.realname,
            "sex": this.customerChange.sex,
            "tel": this.customerChange.tel,
            "type": this.customerChange.type,
            "username": this.customerChange.username
          })
            .then(res => {
              if (res.data.code === 1){
                this.$message.success({
                  message:"更新成功",
                  showClose:true
                });
                this.dialogFormVisible2 = false;
                this.getAllCustomers();
              }
            })
            .catch(err => {
              console.log(err);
            })
        },
        handleRegisterClose() {
          this.flag.reset = !this.flag.reset;
          this.customerRegist = {};
        },
        handleDelete(index,row){
          this.removeCustomer(row.id)
        },
        removeMany(){
          console.log(this.multipleSelection);
          if (this.multipleSelection.length === 0 ){
            this.getAllCustomers();
            this.$message.warning({
              message:"请选择多个客户",
              showClose:true
            })
          }
          this.removeCustomer(this.multipleSelection)
        },
        // 新增普通用户
        newCustomer(){
          this.dialogFormVisible = true;
        },
        areaDate(value) {
          this.areaSelection = value;
        },
        // 提交普通用户注册
        submitForm(){
         /* if(this.areaSelection.city && this.areaSelection.province && this.areaSelection.block) {
            this.customerRegist.province = this.areaSelection.province.slice(0,this.areaSelection.province.length-1);
            this.customerRegist.city = this.areaSelection.city.slice(0,this.areaSelection.city.length-1);
            this.customerRegist.county = this.areaSelection.block.slice(0,this.areaSelection.block.length-1);
          }*/
          if(this.areaSelection.province)
            this.customerRegist.province = this.areaSelection.province.slice(0,this.areaSelection.province.length-1);
          else this.customerRegist.province = '';
          if(this.areaSelection.city)
            this.customerRegist.city = this.areaSelection.city.slice(0,this.areaSelection.city.length-1);
          else this.customerRegist.city = '';
          if(this.areaSelection.block)
            this.customerRegist.county = this.areaSelection.block.slice(0,this.areaSelection.block.length-1);
          else this.customerRegist.county = '';
          this.$axios.post('/customer/',{
            "address": this.customerRegist.address,
            "age": this.customerRegist.age,
            "city": this.customerRegist.city,
            "county": this.customerRegist.county,
            "email": this.customerRegist.email,
            "image": "",
            "province": this.customerRegist.province,
            "realname":this.customerRegist.realname,
            "sex": this.customerRegist.sex,
            "tel": this.customerRegist.tel,
            "type": this.customerRegist.type,
            "username": this.customerRegist.username
          })
            .then(res => {
              if (res.data.code === 1){
                this.$message.success({
                  message:"注册成功",
                  showClose:true
                });
                this.dialogFormVisible = false;
                this.getAllCustomers();
              } else {
                this.$message.error({
                  message:res.data.msg,
                  showClose:true
                });
              }
            })
            .catch(err => {
              console.log(err);
            })
        },
        // 导出excel
        getExcel(){
          this.$axios.get('/excel/customer',{
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
        },
        loadAllList() {
          this.$axios.get('/customer/',{
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
            '<th>客户名称</th>' +
            '<th>账号名称</th>' +
            '<th>产品类别</th>'+
            '<th>性别</th>' +
            '<th>年龄</th>' +
            '<th>联系电话</th>' +
            '<th>电子邮箱</th>' +
            '<th>省</th>' +
            '<th>市</th>' +
            '<th>区（县）</th>' +
            '<th>地址</th>' +
            '</tr>';
          for(let item in this.allList) {
            info[item] = Object.assign({}, this.allList[item]);
            let index = parseInt(item)+1;
            if(info[item].sex === 0)
              info[item].sex = '男';
            else if(info[item].sex === 1)
              info[item].sex = '女';
            else info[item].sex = '';
            for(let i in info[item])
              if(info[item][i] === null)
                info[item][i] = ' ';
            table+='<tr>';
            table+='<td>'+index+'</td>';
            table+='<td>'+info[item].realname +'</td>';
            table+='<td>'+info[item].username+'</td>';
            table+='<td>'+info[item].type+'</td>';
            table+='<td>'+info[item].sex+'</td>';
            table+='<td>'+info[item].age+'</td>';
            table+='<td>'+info[item].tel+'</td>';
            table+='<td>'+info[item].email+'</td>';
            table+='<td>'+info[item].province+'</td>';
            table+='<td>'+info[item].city+'</td>';
            table+='<td>'+info[item].county+'</td>';
            table+='<td>'+info[item].address+'</td>';
            table+='</tr>';
          }
          table = table.replace(new RegExp('<th>', 'g'), '<th style="border: 1px solid #ebebeb; background: #ebebeb">');
          table = table.replace(new RegExp('<td>', 'g'), '<td style="border-bottom: 1px solid #ebebeb">');
          table+='</table>'
          return table;
        },
        getWord() {
          this.GLOBAL.wordExport('doc', this.dataToTable(), '客户信息');
        },
        getPDF() {
          this.GLOBAL.pdfExport(this.dataToTable(), '客户信息');
        },
      // 分页
        handleCurrentChange(val){
          this.getAllCustomers();
        },
        // 筛选技术人员
        queryData(value){
          this.$axios.post('/customer/strategy?pageNum='+this.page.num+'&pageSize='+this.page.size, {
            beginTime:value.dateBegin,
            endTime:value.dateEnd,
            province:value.province,
            city:value.city,
            county:value.block

          }).then((res) => {
            if(res.data.code === 1) {
              this.$message.success({
                message:"查询成功",
                showClose:true
              })
              this.page.pages = res.data.data.pages;
              this.page.total = res.data.data.total;
              this.customers = this.changeDateAndSex( res.data.data.list);
            }
          }).catch((err) => {
            console.log(err)
          })
        },

      },
      mounted(){
        this.getAllCustomers();
        this.loadAllList();
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
</style>
