<template>
    <div id="index">
      <!--导航栏-->
      <appHeader></appHeader>

      <!--导航部分-->
      <div id="main">
        <div class="mainBody">
          <div class="content">
            <div class="container" >
              <span class="item" style="background: -webkit-linear-gradient(top left,rgba(128,26,11,0.67),white);">用户管理</span>
              <div>
                <!--<span class="smallItem">不</span>-->
                <!--<span class="smallItem">意思</span>-->
              </div>

            </div>
            <div class="container" >
              <span class="item" style="background: -webkit-linear-gradient(top left,rgba(3,110,128,0.67),white);">所有专家</span>
              <!--<span class="smallItem">不</span>-->
              <!--<span class="smallItem">意思</span>-->
            </div>
            <div class="container" >
              <span class="item" style="background: -webkit-linear-gradient(top left,rgba(31,60,7,0.75),white);">售后服务</span>
              <div class="innerFlex">
                <span class="smallItem">维修</span>
                <span class="smallItem">人员</span>
              </div>
            </div>
            <div class="container" >
              <span class="item" style="background: -webkit-linear-gradient(top left,rgba(11,2,128,0.67),white);">系统设置</span>
              <div class="innerFlex">
                <span class="smallItem">参数</span>
                <span class="smallItem">权限</span>
              </div>
            </div>
            <div class="container" >
              <span class="item" style="background: -webkit-linear-gradient(top left,rgba(82,2,128,0.67),white);">用户管理</span>
              <!--<span class="smallItem">不</span>-->
              <!--<span class="smallItem">意思</span>-->
            </div>
            <div class="container" >
              <span class="item" style="background: -webkit-linear-gradient(top left,rgba(128,107,8,0.67),white);">用户管理</span>
              <!--<span class="smallItem">不</span>-->
              <!--<span class="smallItem">意思</span>-->
            </div>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import appHeader from './Header'
    export default {
      name: "index",
     components:{appHeader}
    }
</script>

<style scoped>
#index{
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("../../static/img/background6.jpg") no-repeat;
  background-size:100%;
}
  #index #main{
    width: 100%;
    margin-top: 20px;
  }

  #index #main .mainBody{
    text-align: center;
    position: relative;
    width: 90%;
    border-radius: 10px;
    height: 550px;
    margin: 0 auto;
    background-color: rgba(39,39,39,0.2);
    z-index: 1;
    background-position: center top;
    background-size: cover;
    overflow: hidden;
  }
#index #main .mainBody::before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-filter: blur(20px);
  -moz-filter: blur(20px);
  -ms-filter: blur(20px);
  -o-filter: blur(20px);
  filter: blur(20px);
  z-index: -3;
  margin: -30px;
  background-image: url(../../static/img/background6.jpg);
  background-position: center top;
  background-size: cover;
  background-attachment: fixed;
}
.content h1 {
  text-align: center;
  margin-bottom: 20px;
  vertical-align: center;
}
.content{
  padding: 30px;

}
.container{
  width: 260px;
  height: 200px;
  /*background: red;*/
  float: left;
  margin: 20px 60px;
  /*background: red;*/
  display: flex;
  flex-direction: row;
}
  .item{
    display: block;
    width: 120px;
    height: 120px;
    /*margin: 0 auto;*/
    margin-top: 40px;
    border-radius:50%;
    font-size:18px;
    line-height: 120px;
    cursor: pointer;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    transition: all .3s;
    color: #fff;
  }
  .innerFlex{
    margin-top: 30px;
    display: flex;flex-direction: column
  }
.container:hover .item{
    padding: 15px;
    color: #000;
    /*font-size: 30px;*/
  }
.container:hover .smallItem{
  display: inline-block;
}
  .smallItem{
    cursor: pointer;
    display: none;
    width: 60px;
    line-height: 60px;
    margin-left: 10px;
    margin-top: 10px;
    height: 60px;
    border-radius: 50%;
    background: -webkit-linear-gradient(top left, rgba(0, 49, 195, 0.66),white);
  }
</style>
