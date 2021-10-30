<template>

    <div>

        <div slot="header" class="clearfix">
            <span style="float: left;">用户管理</span>
            <span style="float: right">账号或姓名：
                    <input v-model="selVal" type="text" ><el-button type="primary" @click="sel()">搜索</el-button>
                 <el-button  type="primary" @click="fun('add')">添加</el-button>
            </span>
        </div>
        <el-table
                :data="tableData"
                border
                style="width: 100%;">
            <el-table-column
                    prop="id"
                    label="序号"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="account"
                    label="账号"
                    width="400">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="isAdmin"
                    label="是否为管理员"
                    width="185">
              <template slot-scope="scope">
                <span v-if="scope.row.isAdmin === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="电话"
                    width="330">
            </el-table-column>
            <el-table-column
                    prop="useStatus"
                    label="使用状态"
                    width="220">
              <template slot-scope="scope">
                <span v-if="scope.row.useStatus === 0">冻结</span>
                <span v-else>正常</span>
              </template>
            </el-table-column>
          <el-table-column
              prop="address"
              label="住址"
              width="220">
          </el-table-column>
            <el-table-column
                    label="操作"
                    width="300">
                <template slot-scope="scope">
                    <el-button  type="text" size="small">修改</el-button>
                    <el-button type="text" size="small">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
      <div v-if="pageshow">

        <el-button type="button" @click="jumpPage('head')">首页</el-button>
        <el-pagination ref="pagination"
                       background prev-text="上一页" next-text="下一页"
                       layout="prev, pager, next, slot,jumper"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :total="totalNum"
                       :page-size="pagesize"
                       style="display: inline-block;padding-left: 0px;">
        </el-pagination>
        <el-button type="button" @click="jumpPage('foot')">尾页</el-button>
      </div>

    </div>

</template>

<script>
    export default {
        name: "consumer",
      methods:{
        fun:function (router) {
          this.$router.push("/"+router)
        },
          me1:function (resp,val){
            const _this = this
            _this.tableData = resp.data.list
            _this.totalNum = resp.data.total
            _this.currentPage = val;//cur_page 当前页
            _this.pageshow = false;//让分页隐藏
            _this.$nextTick(() => {//重新渲染分页
              _this.pageshow = true;
            });
          },
        jumpPage:function (val) {
          const _this = this
          if (val=='head'){
            _this.$axios.get('/refreshto?currentPage=1&pageSize=4&val='+this.selVal).then(function (resp) {
              _this.me1(resp,1)
            })
          }else{
            _this.$axios.get('/refreshto?currentPage='+_this.pages+'&pageSize=4&val='+this.selVal).then(function (resp) {
              _this.me1(resp,_this.pages)
            })
          }
        },
        handleCurrentChange (currentPage) {
          const _this = this
          _this.$axios.get('/refreshto?currentPage='+currentPage+'&pageSize=4&val='+this.selVal).then(function (resp) {
            _this.tableData = resp.data.list
            _this.totalNum = resp.data.total
          })
        },
        sel:function (){
          const _this = this
          _this.$axios.get("/refreshto?currentPage=1&pageSize=4&val="+this.selVal).then(resp=>{
            _this.pages=resp.data.pages
            _this.me1(resp,1)
          })
        }
      },
      created() {
        const _this = this
        this.$axios.get('/refreshto?currentPage=1&pageSize=4').then(function (resp) {
          _this.tableData = resp.data.list
          _this.totalNum = resp.data.total
          _this.pages=resp.data.pages
        })
      },
      data() {
            return {
                val:'',
              tableData: [],
              pagesize: '4',
              totalNum: '',
              currentPage: "1",
              selVal:'',
              pageshow: true,
              pages:0,
            }
        }
    }
</script>

<style>
</style>
