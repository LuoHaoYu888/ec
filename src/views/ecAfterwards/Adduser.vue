<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="账号:" prop="account">
            <el-input v-model="ruleForm.account" placeholder="说明:建议使用手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="默认密码:123456"></el-input>
        </el-form-item>
        <el-form-item label="管理员:" prop="isAdmin">
          <el-select v-model="ruleForm.isAdmin"  style="float: left">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位:" prop="role">
            <el-input v-model="ruleForm.role"></el-input>
        </el-form-item>
      <el-form-item label="冻结:" prop="useStatus">
        <el-select v-model="ruleForm.useStatus"  style="float: left">
          <el-option label="是" value="0"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话:" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="地址:" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="编码:" prop="content">
        <el-input v-model="ruleForm.content"></el-input>
      </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "Adduser",
        data() {
          let that = this
          var valAccount=function (rule,value,callback){
            that.$axios.get("/selUser?user="+value).then(arr=>{
              if (value.length<8||value.length>11){
                callback(new Error("请输入8-11个数字"))
              }
              if (arr.data.name!=null){
                callback(new Error("账号已存在"))
              }else{
                callback();
              }
            })
          }
            return {
                ruleForm: {
                    name:'',
                    account:'',
                    password: '',
                    isAdmin:'',
                    role: '',
                    useStatus:'',
                    phone:'',
                    address:'',
                    content:''
                },
                rules: {
                  account: [
                            { required: true, message: '请输入账号', trigger: 'change' },
                            { message: '账号已被使用(8-11位数字)',validator: valAccount ,trigger: 'change' }
                        ],
                  name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    role: [
                        { required: true, message: '请选输入职位', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入电话', trigger: 'blur' },
                        { min: 8, max: 11, message: '长度在 8到 11 个字符' ,trigger: 'change' }
                    ],
                    address: [
                        { required: true, message: '请输入家庭地址', trigger: 'blur' }
                    ],

                  content:[
                    {required: true, message:'请输入编码' , trigger:'blur'}
                  ],
                  isAdmin:[
                    {required: true, message:'请选择' , trigger:'change'}
                  ],
                  useStatus:[
                    {required: true, message:'请选择' , trigger:'change'}
                  ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                      if (this.ruleForm.password===""){
                        this.ruleForm.password="123456"
                      }
                      const res=JSON.stringify(this.ruleForm)
                      this.$axios.get("/adduserinfo/"+res).then(arr=>{
                        if(arr.data==1){
                          this.$router.push("/users")
                        }
                      })
                    } else {
                        alert("添加失败")
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>
