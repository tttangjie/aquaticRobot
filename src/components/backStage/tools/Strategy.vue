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
          size="medium">
        </el-date-picker>
      </div>

      <div class="btn_tools">
        <el-button class="plain_button" @click="query" size="medium">查询</el-button>
        <el-button class="plain_button" @click="reset" size="medium">重置</el-button>
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
            dateRange:[ ],
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
            if(this.dateRange.length === 0) {
              this.dateRange = ['', ''];
            }
            var queryData = Object.assign({}, this.areaSelection);
            // let  = new Object();
            // queryData = ;
            if(queryData.province)
              queryData.province = queryData.province.slice(0,queryData.province.length-1);
            else queryData.province = '';
            if(queryData.city)
              queryData.city = queryData.city.slice(0,queryData.city.length-1);
            else queryData.city = '';
            if(queryData.block)
              queryData.block = queryData.block.slice(0,queryData.block.length-1);
            else queryData.block = '';
           /* if(queryData.city && queryData.province && queryData.block) {
              queryData.province = queryData.province.slice(0,queryData.province.length-1);
              queryData.city = queryData.city.slice(0,queryData.city.length-1);
              queryData.block = queryData.block.slice(0,queryData.block.length-1);
            }*/
            queryData.dateBegin = this.dateRange[0];
            queryData.dateEnd = this.dateRange[1];
            this.$emit('queryData', queryData);
            if(this.dateRange[0] === '' && this.dateRange[1] === '') {
              this.dateRange = [];
            }
            // console.log(queryData);
          }
        },
    }
</script>

<style scoped>
  .strategy_body {
    margin-top: 15px;
    margin-bottom: 15px;
    display: inline-flex;
    font-size: 16px;
    font-weight: 100;
  }
  .btn_tools{
    margin-left: 35px;
  }
</style>
