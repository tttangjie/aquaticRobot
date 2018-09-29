<template>
    <div class="strategy_body">
      <div>
        <span>地区</span>
        <three-link :reset="flag.reset" :query="flag.query" v-on:transmitArea = transmitArea> </three-link>
      </div>

      <div>
        <span>日期</span>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          style="width: 280px;">
        </el-date-picker>
      </div>

      <div class="btn_tools">
        <el-button @click="query">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
</template>

<script>
    import ThreeLink from './ThreeLink'
    export default {
        name: "Strategy",
        components:{
          'three-link':ThreeLink,
        },
        data(){
          return{
            dateRange:[],
            areaSelection:{},
            flag:{
              query:false,
              reset:false,
            }
          }
        },
        methods:{
          reset() {
            this.dateRange = [];
            this.flag.reset = !this.flag.reset;
          },
          query() {
            this.flag.query = !this.flag.query;
          },
          transmitArea(value) {
            this.areaSelection = value;
          }
        },
    }
</script>

<style scoped>
  .strategy_body {
    display: inline-flex;
    font-size: 16px;
    font-weight: 100;
  }
  .btn_tools{
    margin-left: 35px;
  }
</style>
