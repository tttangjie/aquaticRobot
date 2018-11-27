<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html,body,#app {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .normal_button {
    background: #1ABC9C !important;
    color: #fff !important;
  }
  .normal_button:hover {
    background: rgba(26, 188, 156, 0.81) !important;
  }
  .plain_button {
    background: #fff !important;
    color: #373737 !important;
  }
  .plain_button:hover {
    background: rgba(26, 188, 156, 0.15) !important;
    color: rgb(26, 188, 156) !important;
    border: rgba(26, 188, 156, 0.33) solid 1px !important;
  }
  .light_button {
    background: rgba(26, 188, 156, 0.15) !important;
    color: rgb(26, 188, 156) !important;
    border: rgba(26, 188, 156, 0.33) solid 1px !important;
  }
  .light_button:hover{
    background: #1ABC9C !important;
    color: #fff !important;
    border: #fff 1px solid !important;
  }
</style>
