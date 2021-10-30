<template>
    <el-container>
        <el-aside width="200px">
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                <el-menu-item index="0" disabled>
                    <i class="el-icon-film"></i>
                    <span slot="title" class="menus" >菜单管理</span>
                </el-menu-item>
                <el-divider></el-divider>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-shopping-cart-2"></i>
                        <span>商城管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">产品管理</el-menu-item>
                        <el-menu-item index="1-2">产品一级分类</el-menu-item>
                        <el-menu-item index="1-3">产品二级分类</el-menu-item>
                        <el-menu-item index="1-4">资讯管理</el-menu-item>
                        <el-menu-item index="1-5">评价管理</el-menu-item>
                        <el-menu-item index="1-6">会员管理</el-menu-item>
                        <el-menu-item index="1-7">优惠劵管理</el-menu-item>
                        <el-menu-item index="1-8">认筹劵管理</el-menu-item>
                        <el-menu-item index="1-9">认筹劵领用管理</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-truck"></i>
                    <span slot="title">订单管理</span>
                </el-menu-item>
                <el-menu-item index="3" >
                    <i class="el-icon-s-opportunity"></i>
                    <span slot="title">服务管理</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-pie-chart"></i>
                    <span slot="title">数据统计</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <i class="el-icon-setting"></i>
                    <span slot="title">系统设置</span>
                </el-menu-item>
                <el-menu-item index="6">
                    <i class="el-icon-document"></i>
                    <span slot="title">知识库管理</span>
                </el-menu-item>
                <el-menu-item index="7">
                    <i class="el-icon-more-outline"></i>
                    <span slot="title">案例管理</span>
                </el-menu-item>
                <el-menu-item index="8">
                    <i class="el-icon-s-order"></i>
                    <span slot="title">资讯管理</span>
                </el-menu-item>
                <el-menu-item index="9">
                    <i class="el-icon-s-ticket"></i>
                    <span slot="title">活动促销</span>
                </el-menu-item>
                <el-submenu index="10">
                    <template slot="title">
                        <i class="el-icon-s-custom"></i>
                        <span>员工管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="10-1" @click="fun('users')">员工列表</el-menu-item>
                        <el-menu-item index="10-2" @click="fun('add')">员工增加</el-menu-item>
                        <el-menu-item index="10-3">权限设置</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <strong>后台管理系统</strong>
                <div class="header-avatar">
                  当前登录的用户: {{msg}}
                </div>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
        <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
        data() {
          return {
            msg:""
          }
        },
      methods:{
        fun:function (router) {
          this.$router.push("/"+router)
        }
      },
        created() {
          this.$axios.get("selUser?user="+this.$route.params.id).then(res=>{
            if (res.data.name != null) {
              sessionStorage.setItem("name",res.data.name)
            }
            this.msg=sessionStorage.getItem("name")
          })
        }
    }
</script>

<style scoped>
    .el-header{
        background-color: darkcyan;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        /*background-color: #E9EEF3;*/
        color: #333;
        text-align: center;
        line-height: 160px;
    }


    .el-container{
        padding: 0;
        margin: 0;
        height: 100vh;
    }
    .header-avatar{
        float: left;
    }
    .menus{
        font-size: 18px;
    }

</style>
