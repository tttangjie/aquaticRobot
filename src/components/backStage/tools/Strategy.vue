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
          style="width: 280px;"
          size="mini">
        </el-date-picker>
      </div>

      <div class="btn_tools">
        <el-button @click="query" size="mini">查询</el-button>
        <el-button @click="reset" size="mini">重置</el-button>
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
            dateRange:['',''],
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
            this.dateRange = ['',''];
            this.flag.reset = !this.flag.reset;
          },
          transmitArea(value) {
            this.areaSelection = value;
            console.log(value);
          },
          query() {
            var queryData = Object.assign({}, this.areaSelection);
            // let  = new Object();
            // queryData = ;
            if(queryData.city && queryData.province && queryData.block) {
              queryData.province = queryData.province.slice(0,queryData.province.length-1);
              queryData.city = queryData.city.slice(0,queryData.city.length-1);
              queryData.block = queryData.block.slice(0,queryData.block.length-1);
            }
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
    margin-top: 10px;
    display: inline-flex;
    font-size: 16px;
    font-weight: 100;
  }
  .btn_tools{
    margin-left: 35px;
  }
</style>
