<template>
  <div class="three_link">
    <el-select
      v-model="provinceSelection"
      @change="chooseProvince"
      placeholder="省级地区"
      style="width: 160px;"
      size="mini">
      <el-option
        v-for = "item in province"
        :key = item.id
        :label = item.value
        :value = item.value>
      </el-option>
    </el-select>

    <el-select
      v-model="citySelection"
      @change="chooseCity"
      placeholder="市级地区"
      style="width: 160px;"
      size="mini">
      <el-option
        v-for = "item in city"
        :key = item.id
        :label = item.value
        :value = item.value>
      </el-option>
    </el-select>

    <el-select
      v-model="blockSelection"
      @change = "chooseBlock"
      placeholder="区级地区"
      style="width: 160px;"
      size="mini">
      <el-option
        v-for = "item in block"
        :key = item.id
        :label = item.value
        :value = item.value>

      </el-option>
    </el-select>
  </div>
</template>

<script>
    export default {
        name: "ThreeLink",
        props:[
          'query',
          'reset',
        ],
        data(){
          return{
            mapJson:'../static/json/map.json',
            provinceSelection:'',
            province:[],
            citySelection:'',
            city:[],
            blockSelection:'',
            block:[],
            areaDate:{
              province:'',
              city:'',
              block:'',
            },
          }
        },
        methods:{
          //加载三级地点数据
          getCityData() {
            let that = this;
            this.$axios.get(this.GLOBAL.My_URL+this.mapJson)
              .then(function (res) {
                if(res.status === 200) {
                  let data = res.data;
                  that.province = [];
                  that.city = [];
                  that.block = [];
                  // 省市区数据分类
                  for (let item in data) {
                    if(data.hasOwnProperty(item)){
                        if(item.match(/0000$/)) {
                          that.province.push({id: item, value:data[item], children:[]});
                        } else if(item.match(/00$/)) {
                          that.city.push({id:item, value:data[item], children:[]});
                        } else {
                          that.block.push({id:item, value:data[item]});
                        }
                    }
                  }
                  // 分类市级
                  for(let item1 in that.province) {
                    for (let item2 in that.city) {
                      if(that.province[item1].id.slice(0,2) === that.city[item2].id.slice(0,2)) {
                        that.province[item1].children.push(that.city[item2]);
                      }
                    }
                  }
                  //分类区级
                  for(let item1 in that.city) {
                    for(let item2 in that.block) {
                      if(that.city[item1].id.slice(0,4) === that.block[item2].id.slice(0,4)) {
                        that.city[item1].children.push(that.block[item2]);
                      }
                    }
                  }
                } else {
                  console.log(res.status)
                }
              })
              .catch(function (error) {
                console.log(typeof+error)
              })
          },
          chooseProvince(e){
            for (let item in this.province) {
              if(e === this.province[item].value) {
                this.city = this.province[item].children;
                this.citySelection = this.province[item].children[0].value;
                this.block = this.province[item].children[0].children;
                this.blockSelection = this.province[item].children[0].children[0].value;
              }
            }
            this.areaDate.province = this.provinceSelection;
            this.areaDate.city = this.citySelection;
            this.areaDate.block = this.blockSelection;
            this.$emit('areaDate', this.areaDate);
          },
          chooseCity(e) {
            for(let item in this.city) {
              if(e === this.city[item].value) {
                this.block = this.city[item].children;
                this.blockSelection = this.city[item].children[0].value;
              }
            }
            this.areaDate.province = this.provinceSelection;
            this.areaDate.city = this.citySelection;
            this.areaDate.block = this.blockSelection;
            this.$emit('areaDate', this.areaDate);
          },
          chooseBlock(e) {
            this.E = e;
            this.areaDate.province = this.provinceSelection;
            this.areaDate.city = this.citySelection;
            this.areaDate.block = this.blockSelection;
            this.$emit('areaDate', this.areaDate);
            // console.log(this.provinceSelection)
          },
        },
        mounted() {
          this.getCityData();
          this.$emit('areaDate', this.areaDate);
        },
        watch:{
         /* 'query': function () {
            let data = {};
            data.provinceSelection = this.provinceSelection;
            data.citySelection = this.citySelection;
            data.blockSelection = this.blockSelection;
            this.$emit('transmitArea', data);
            console.log(data);
          },*/
          'reset':function () {
              this.provinceSelection='';
              this.citySelection='';
              this.city=[];
              this.blockSelection='';
              this.block=[];
          }
        }
    }
</script>

<style scoped>
  .three_link {
    display: inline-flex;
  }
  .el-select {
    margin-right: 5px;
  }
</style>
