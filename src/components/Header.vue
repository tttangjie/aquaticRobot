<template>
    <header>
     <span>欢迎您，ADMIN</span>
      <a @click="toLogin()">【退出】</a>
    </header>
</template>

<script>
    export default {
        name: "appHeader",
      methods:{
          toLogin:function () {
            this.$router.push({path:'/'})
          }
      }
    }
</script>

<style scoped>
header{
  width: 100%;
  height: 30px;
/*
  background: rgba(110, 132, 195, 0.4);
*/
  text-align: right;
}
  header span{
    line-height: 30px;
  }
  header a{
    cursor: pointer;
    margin-right: 5%;
  }
  header a:hover{
    color: #9e9e9e;
  }
</style>
