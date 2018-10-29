<template>
  <div>
    <div class="btns">
      <el-select v-model="strategy" placeholder="请选择" style="width: 120px;">
        <el-option
          v-for="(item,index) in subKinds"
          :key="index"
          :label="item"
          :value="index">
        </el-option>
      </el-select>
      <!--<el-input size="medium" v-model="strategy" style="width: 120px;"></el-input>-->
      <el-button size="medium" @click="query">筛选</el-button>
      <el-button size="medium" @click="reset">重置</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="serviceList"
      tooltip-effect="dark"
      size="mini"
      style="width: 100%;"
      highlight-current-row>
      <el-table-column
        align="center"
        label="产品类别">
        <template slot-scope="scope">{{ scope.row.type }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="送修时间">
        <template slot-scope="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="用户名">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="姓名">
        <template slot-scope="scope">{{ scope.row.realname }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="性别">
        <template slot-scope="scope">{{ scope.row.sexString }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="年龄">
        <template slot-scope="scope">{{ scope.row.age }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="联系电话">
        <template slot-scope="scope">{{ scope.row.tel }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="机器人编号">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="负责技术人员">
        <template slot-scope="scope">{{ scope.row.technology_name }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="故障描述">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button size="mini" @click="modifyRow(scope.row)" :disabled="scope.row.canModify">修改</el-button>
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


    <el-dialog
      title="售后任务分配"
      :visible.sync="showModifyDialog"
      width="450px">
      <el-form :model="currentModify">
        <el-form-item label="机器人编号" :label-width="formLabelWidth">
          <el-input v-model="currentModify.number" disabled></el-input>
        </el-form-item>
        <el-form-item label="技术人员" :label-width="formLabelWidth">
          <el-select v-model="currentModify.technology_id" placeholder="请选择" style="width: 120px;">
            <el-option
              v-for="(item,index) in technologyList"
              :key="item.username"
              :label="item.username"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showModifyDialog = false">取 消</el-button>
    <el-button type="primary" @click="modifyService">保 存</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Service",
    data() {
      return {
        serviceList:[],
        technologyList:[],
        currentModify:{},
        page:{
          num: 1,
          size: 10,
          pages: 0,
          total: 0,
        },
        serviceForm:{
          image:'',
        },
        showModifyDialog:false,
        formLabelWidth:'120px',
        strategy:'',
        subKinds:["待维修","维修中","维修完成","无法维修"],
      }
    },
    methods:{
      loadList() {
        this.$axios.get('/admin/',
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
              this.serviceList = res.data.data.list;
              this.page.pages = res.data.data.pages;
              this.page.total = res.data.data.total;
              for(let item in this.serviceList)
                if(this.serviceList.hasOwnProperty(item)) {
                  this.serviceList[item].time = this.serviceList[item].time.substring(0, 11);
                  if(this.serviceList[item].sex === 0 )
                    this.serviceList[item].sexString = '男';
                  else this.serviceList[item].sexString = '女';
                  if(this.serviceList[item].status === 0 || this.serviceList[item].status === 1)
                    this.serviceList[item].canModify = false;
                  else
                    this.serviceList[item].canModify = true;
                }
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      loadTechnology() {
        this.$axios.get('/technology/')
          .then((res) => {
            if(res.data.code === 1) {
              this.technologyList = res.data.data.list;
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
      modifyRow(value) {
        this.currentModify = Object.assign({}, value);
        this.showModifyDialog = true;
      },
      modifyService() {
        console.log(this.currentModify.id ,this.currentModify.technology_id)
        this.$axios.post('/admin/'+this.currentModify.id+'?technology_id='+this.currentModify.technology_id)
          .then((res) => {
            console.log(res)
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
        this.$axios.get('/admin/status',
          {
            params:{
              pageNum:this.page.num,
              pageSize:this.page.size,
              orderBy:null,
              condition:null,
              status:this.strategy,
            },
          }
        )
          .then((res) => {
            if(res.data.code === 1) {
              this.serviceList = res.data.data.list;
              this.page.pages = res.data.data.pages;
              this.page.total = res.data.data.total;
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
      this.loadTechnology();
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
