<template>
  <div id="index">
    <div class="left" style="height: 100%">
      <div class="logo">
        <span>Giz</span>
      </div>
      <el-menu
        :router="isRouter"
        :default-active="activeNav"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#C1BEBF"
        style="height: auto;"
        text-color="#fff"
        active-text-color="#fff04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/index/robot">机器人管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/index/customer">客户管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>所有专家</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/index/expert">所有专家</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-edit-outline"></i>
            <span>售后服务</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/index/technology">技术人员</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/index/service">维修</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>养殖百科</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/index/disease">疾病百科</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/index/product">产品百科</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <el-menu-item index="/index/drugstore">药品百科</el-menu-item> <!-- add by liuyunxing-->
          </el-menu-item-group>

          <el-menu-item-group>
            <el-menu-item index="/index/seedstore">种苗百科</el-menu-item> <!-- add by liuyunxing-->
          </el-menu-item-group>

          <el-menu-item-group>
            <el-menu-item index="/index/feedStore">投喂百科</el-menu-item> <!-- add by liuyunxing-->
          </el-menu-item-group>

        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>数据报告</span>
          </template>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/index/admin-controller">系统权限</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/index/alarm">参数预警</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>

    <div class="right">
      <web-header></web-header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import webHeader from '../Header'
  export default {
    name: "Index",
    components:{
      'web-header':webHeader,
    },
    data() {
      return {
        isRouter: true,
        activeNav:'/index/robot',
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    },
    computed: {}
  }
</script>

<style scoped>
  #index {
    width: 100%;
    height: 100%;
    position: absolute;
    /*background: red;*/
  }

  aside {
    width: 100%;
    height: 100%;
    background: pink;
  }

  .left {
    width: 18%;
    height: 100%;
    float: left;
    overflow:scroll;
    padding-bottom:9999px; margin-bottom:-9999px;
    background: #c1bebf;
  }
  /*滚动条样式*/
  .left::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height:4px;
  }
  .left::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(255,255,255,0.5);
    background: rgba(255,255,255,0.5);
  }
  .left::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(255,255,255,0.3);
    border-radius: 0;
    background: rgba(255,255,255,0.3);
  }
  .right {
    width: 80%;
    height: auto;
    /*background: yellow;*/
    float: left;
    margin-left: 1%;
    /*background: yellow;*/
  }

  .logo{
    text-align: center;
    height: 120px;
    line-height: 120px;
    background: url("../../../static/img/bg.gif");
  }

  .logo span:first-letter{
    font-size: 70px;
    color: #9e9e9e;
  }
  .logo span{
    font-size: 50px;
    font-weight: 600;
    display: block;
    color: #1d4e79;

  }
  .el-menu-item{
    margin-left: 30px;
    height: 30px;
    line-height: 30px;
  }
</style>
