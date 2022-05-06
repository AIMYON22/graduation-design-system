<template>
    <div class="main-box">
        <el-card class="login-card">
            <el-row>
                <el-col :span="12">
                    <div class="left-col">
                        <img src="../assets/login-pic2.svg" width="500" height="425" alt="">
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form :model="loginData" class="login-form" label-width="55px" label-position="left" size="large">
                        <div class="avatar">
                            <img src="../assets/user2.svg" alt="">
                        </div>
                        <div class="title">用户注册</div>
                        <el-form-item label="用户名" class="login-form-item1" size="default">
                            <el-input v-model="loginData.account" class="input"/>
                        </el-form-item>
                        <el-form-item label="密码" class="login-form-item2" size="default">
                            <el-input v-model="loginData.password" class="input" type="password" placeholder="请输入密码" show-password/>
                        </el-form-item>
                        <el-form-item label="学院" class="login-form-item2" size="default">
                            <el-input v-model="loginData.academy" class="input"/>
                        </el-form-item>
                        <el-form-item label="类型" class="login-form-item2" size="default">
                            <el-select v-model="loginData.personType">
                                <el-option label="学生" value="学生"></el-option>
                                <el-option label="教师" value="教师"></el-option>
                                <el-option label="系主任" value="系主任"></el-option>
                            </el-select>
                        </el-form-item>
                        <div class="operate">
                            <el-link type="primary" class="forget" :underline="false" @click="goToLogin">已有账号?登录</el-link>
                        </div>
                        <div class="button" @click="this.register">注册</div>
                    </el-form>
                </el-col>
            </el-row>

        </el-card>
    </div>
</template>

<script>
    import Axios from 'axios'
    export default {
        name: "UserRegister",
        data(){
            return{
                loginData:{
                    account:'',
                    password: '',
                    personType: '',
                    academy: ''
                },
            }
        },
        methods:{
            goToLogin(){
                this.$router.push({path: '/login'})
            },

            register(){
                Axios.post(`${this.$store.state.address}/register`,
                    this.loginData).then(res => {
                        let result = res.data;
                        if(result.success){
                            this.$message({
                                message: result.message,
                                type: 'success'
                            })
                            this.$router.push({path: '/login'})
                        }
                        else{
                            this.$message.error(result.message)
                        }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .main-box{
        height: 1000px;
        width: 100%;
        background-color: #F5F5F5;
    }

    .login-card{
        width: 1000px;
        height: 430px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        margin-top: 80px;
        border: 1px solid #fff;
        border-radius: 20px;
        padding: 0;
    }
    .login-form{
        height: 100%;
        width: 100%;
    }
    .avatar{
        margin-right: auto;
        margin-left: auto;
        margin-top: 5px;
        height: 100px;
        width: 100px;
    }
    .title{
        text-align: center;
        margin: 0 auto;
        height: 30px;
        width: 150px;
        font-size: 22px;
        font-weight: bold;
        letter-spacing: 10px;
        text-indent: 10px;
        color: #72adf3;
    }
    .login-form-item1{
        height: 15px;
        width: 65%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 15px;
        font-weight: bold;
    }
    .login-form-item2{
        height: 15px;
        width: 65%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 25px;
        font-weight: bold;
    }
    .operate{
        text-align: center;
        height: 20px;
        width: 450px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 30px;
    }

    .forget{
        line-height: 32px;
        height: 32px;
        width: 100px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 300;
    }
    .button{
        text-align: center;
        line-height: 40px;
        height: 40px;
        width: 150px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 20px;
        background-color: #ecf5ff;
        color: #72adf3;
        border: 1px solid #72adf3;
        border-radius: 5px;
        letter-spacing: 10px;
        text-indent: 10px;
        font-weight: bold;
        font-size: 18px;
    }
    .button:hover{
        background-color: #72adf3;
        color: #fff;
        cursor: pointer;
    }
</style>