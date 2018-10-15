<template>
  <div id="index">

    <div class="left">
      <el-menu
        :router="isRouter"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        style="width: 100%;height: 100%;"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/index/robot">机器人管理</el-menu-item>
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
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>数据报告</span>
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

        </el-submenu>
        <el-submenu index="5">
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
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        isRouter: true
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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
    background: #545c64;
  }

  .right {
    width: 80%;
    height: 100%;
    float: left;
    margin-left: 1%;
    /*background: yellow;*/
  }
</style>
