<template>
        <div>
            <div slot="header" class="clearfix">
                <span style="float: left;">商品一级类别管理</span>
                <el-button style="float: right;margin-top: 65px" type="button">添加</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%;">
                <el-table-column
                        prop="id"
                        label="编号"
                        width="280">
                </el-table-column>
                <el-table-column
                        prop="typeName"
                        label="一级类别名称"
                        width="1065">
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
        name: "Control",
        methods: {
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
              _this.$axios.get('/refreshToG?currentPage=1&pageSize=1').then(function (resp) {
                _this.me1(resp,1)
              })
            }else{
              _this.$axios.get('/refreshToG?currentPage='+_this.pages+'&pageSize=1').then(function (resp) {
                _this.me1(resp,_this.pages)
              })
            }
          },
          handleCurrentChange (currentPage) {
            const _this = this
            _this.$axios.get('/refreshToG?currentPage='+currentPage+'&pageSize=1').then(function (resp) {
              _this.tableData = resp.data.list
              _this.totalNum = resp.data.total
            })
          },
        },
      created() {
        this.$axios.get("/refreshToG?currentPage=1&pageSize=1").then(resp=>{
          const _this = this
          _this.tableData=resp.data.list
          _this.totalNum = resp.data.total
          _this.pages=resp.data.pages
        })
      },
      data() {
            return {
                tableData: [],
              pagesize: '1',
              totalNum: '',
              currentPage: "1",
              pages:0,
              pageshow: true,
            }
        }
    }
</script>

<style scoped>
</style>
