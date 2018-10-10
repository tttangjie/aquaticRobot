<template>
    <div class="strategy_body">
      <div>
        <span>地区</span>
        <three-link :reset="flag.reset" :query="flag.query" v-on:areaDate = areaDate> </three-link>
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
          areaDate(value) {
            this.areaSelection = value;
          },
          reset() {
            this.dateRange = [];
            this.flag.reset = !this.flag.reset;
          },
          transmitArea(value) {
            this.areaSelection = value;
            console.log(value);
          },
          query() {
            let queryData = this.areaSelection;
            queryData.dateBegin = this.dateRange[0];
            queryData.dateEnd = this.dateRange[1];
            this.$emit('queryData', queryData);
            // console.log(queryData);
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
