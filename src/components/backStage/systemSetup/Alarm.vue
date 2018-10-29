<template>
  <div>
    <div class="btns">
      <el-button size="medium" @click="showRegisterDialog = true" type="primary">新建</el-button>
      <el-select v-model="strategy" placeholder="请选择" style="width: 120px;">
        <el-option
          v-for="(item,index) in robotNumber"
          :key="index"
          :label="item.robert_number"
          :value="item.robert_id">
        </el-option>
      </el-select>
      <!--<el-input size="medium" v-model="strategy" style="width: 120px;"></el-input>-->
      <el-button size="medium" @click="query">筛选</el-button>
      <el-button size="medium" @click="reset">重置</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="alarmList"
      tooltip-effect="dark"
      size="mini"
      style="width: 100%;"
      height="550"
      highlight-current-row>
      <el-table-column
        align="center"
        label="机器人编号">
        <template slot-scope="scope">{{ scope.row.robert_number}}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="水温(°C)">
        <template slot-scope="scope">{{ scope.row.temperature_min }} ~ {{ scope.row.temperature_max }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="PH值">
        <template slot-scope="scope">{{ scope.row.ph_min }} ~ {{ scope.row.ph_max }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="溶解氧(mg/l)">
        <template slot-scope="scope">{{ scope.row.oxygen_min }} ~ {{ scope.row.oxygen_max }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="电量(%)">
        <template slot-scope="scope">{{ scope.row.power }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="饵料箱(%)">
        <template slot-scope="scope">{{ scope.row.feed }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="医疗箱(%)">
        <template slot-scope="scope">{{ scope.row.medicine }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="传感器自动清洗(天)">
        <template slot-scope="scope">{{ scope.row.wash }}</template>
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
      @current-change="jumpToOtherPage"
      :current-page.sync="page.num"
      :page-size="page.size"
      layout="prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>

    <!-- 新建用户的对话框 -->
    <el-dialog
      title="报警配置"
      :visible.sync="showRegisterDialog"
      width="450px">
      <el-form :model="alarmForm">
        <el-form-item label="机器人编号" :label-width="formLabelWidth">
          <el-select v-model="alarmForm.robert_id" placeholder="请选择" style="width: 120px;">
            <el-option
              v-for="(item,index) in robertList"
              :key="item.number"
              :label="item.number"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="水温(°C)" :label-width="formLabelWidth">
          <el-input v-model="alarmForm.temperature_min" style="width: 45%"></el-input>
          ~
          <el-input v-model="alarmForm.temperature_max" style="width: 45%;"></el-input>
        </el-form-item>
        <el-form-item label="PH值" :label-width="formLabelWidth">
          <el-input v-model="alarmForm.ph_min" style="width: 45%"></el-input>
          ~
          <el-input v-model="alarmForm.ph_max" style="width: 45%;"></el-input>
        </el-form-item>
        <el-form-item label="溶解氧（mg/l）" :label-width="formLabelWidth">
          <el-input v-model="alarmForm.oxygen_min" style="width: 45%"></el-input>
          ~
          <el-input v-model="alarmForm.oxygen_max" style="width: 45%;"></el-input>
        </el-form-item>
        <el-form-item label="电量(%)" :label-width="formLabelWidth">
          <el-input v-model="alarmForm.power"></el-input>
        </el-form-item>
        <el-form-item label="饵料箱(%)" :label-width="formLabelWidth">
          <el-input v-model="alarmForm.feed"></el-input>
        </el-form-item>
        <el-form-item label="医疗箱(%)" :label-width="formLabelWidth">
          <el-input v-model="alarmForm.medicine"></el-input>
        </el-form-item>
        <el-form-item label="传感器自动清洗（天）" :label-width="formLabelWidth">
          <el-input v-model="alarmForm.wash"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showRegisterDialog = false">取 消</el-button>
    <el-button type="primary" @click="registerAlarm">注 册</el-button>
  </span>
    </el-dialog>

    <!-- 更新用户的对话框 -->
    <el-dialog
      title="报警配置更新"
      :visible.sync="showModifyDialog"
      width="450px">
      <el-form :model="currentModify">
        <el-form-item label="机器人编号" :label-width="formLabelWidth">
          <el-input v-model="currentModify.robert_number" disabled></el-input>
        </el-form-item>
        <el-form-item label="水温(°C)" :label-width="formLabelWidth">
          <el-input v-model="currentModify.temperature_min" style="width: 45%"></el-input>
          ~
          <el-input v-model="currentModify.temperature_max" style="width: 45%;"></el-input>
        </el-form-item>
        <el-form-item label="PH值" :label-width="formLabelWidth">
          <el-input v-model="currentModify.ph_min" style="width: 45%"></el-input>
          ~
          <el-input v-model="currentModify.ph_max" style="width: 45%;"></el-input>
        </el-form-item>
        <el-form-item label="溶解氧（mg/l）" :label-width="formLabelWidth">
          <el-input v-model="currentModify.oxygen_min" style="width: 45%"></el-input>
          ~
          <el-input v-model="currentModify.oxygen_max" style="width: 45%;"></el-input>
        </el-form-item>
        <el-form-item label="电量(%)" :label-width="formLabelWidth">
          <el-input v-model="currentModify.power"></el-input>
        </el-form-item>
        <el-form-item label="饵料箱(%)" :label-width="formLabelWidth">
          <el-input v-model="currentModify.feed"></el-input>
        </el-form-item>
        <el-form-item label="医疗箱(%)" :label-width="formLabelWidth">
          <el-input v-model="currentModify.medicine"></el-input>
        </el-form-item>
        <el-form-item label="传感器自动清洗（天）" :label-width="formLabelWidth">
          <el-input v-model="currentModify.wash"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showModifyDialog = false">取 消</el-button>
    <el-button type="primary" @click="modifyAlarm">保 存</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Alarm",
    data() {
      return {
        alarmList:[],
        robertList:[],
        currentModify:{},
        page:{
          num: 1,
          size: 10,
          pages: 0,
          total: 0,
        },
        alarmForm:{
          image:'',
        },
        showRegisterDialog:false,
        showModifyDialog:false,
        formLabelWidth:'140px',
        strategy:'',
        robotNumber:[]
      }
    },
    methods:{
      loadList() {
        this.$axios.get('/alarm/all',
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
              this.alarmList = res.data.data.list;
              this.page.pages = res.data.data.pages;
              this.page.total = res.data.data.total;
              this.robotNumber = this.alarmList.concat();
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      loadRobert(){
        this.$axios.get('/robert/all')
          .then(res => {
            if (res.data.code === 1){
              this.robertList = res.data.data.list;
            }
          })
          .catch(err => {
            console.log(err);
          })
      },
      jumpToOtherPage() {
        this.loadList();
      },
      registerAlarm() {
        if(this.alarmForm.robert_id === '') {
          this.$message({
            message:'机器人序号不能为空！',
            type:'warning'
          })
          return;
        }
        this.$axios.post('/alarm/add', this.alarmForm)
          .then((res) => {
            if(res.data.code === 1) {
              this.$message({
                message:'报警配置增加成功！',
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
            this.$axios.delete('/alarm/' + id )
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
      modifyAlarm() {
        this.$axios.put('/alarm/'+this.currentModify.id,this.currentModify)
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
        if(this.strategy === '')
          return;
        this.$axios.get('/alarm/'+this.strategy,
        )
          .then((res) => {
            if(res.data.code === 1) {
              this.alarmList = [];
              this.alarmList.push(res.data.data);
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

    },
    mounted() {
      this.loadList();
      this.loadRobert();
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
