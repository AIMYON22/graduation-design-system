<template>
    <div class="root-box">
        <aside class="aside">
            <el-menu
                    active-text-color="#FAEBD7"
                    background-color="#7AB8CC"
                    text-color="#fff"
                    :default-active="active"
                    class="aside-menu"
                    :router="true"
            >
                <el-menu-item index="/home-student/select-attention" class="menu-box">
                    <el-icon><Warning /></el-icon>
                    <span class="menu-item">选题注意事项</span>
                </el-menu-item>
                <el-menu-item index="/home-student/topic-submit" class="menu-box">
                    <el-icon><Position /></el-icon>
                    <span class="menu-item">选题申请提交</span>
                </el-menu-item>
                <el-menu-item index="/home-student/my-topic" class="menu-box">
                    <el-icon><List /></el-icon>
                    <span class="menu-item">我的选题申请</span>
                </el-menu-item>
                <el-menu-item index="/home-student/advice-view" class="menu-box">
                    <el-icon><ChatDotRound /></el-icon>
                    <span class="menu-item">教师指导查看</span>
                </el-menu-item>
                <el-menu-item index="/home-student/mid-submit" class="menu-box">
                    <el-icon><Checked /></el-icon>
                    <span class="menu-item">中期检查提交</span>
                </el-menu-item>
                <el-menu-item index="/home-student/paper-submit" class="menu-box">
                    <el-icon><Promotion /></el-icon>
                    <span class="menu-item">论文提交</span>
                </el-menu-item>
                <el-menu-item index="/home-student/paper-grade" class="menu-box">
                    <el-icon><Document /></el-icon>
                    <span class="menu-item">论文成绩</span>
                </el-menu-item>
            </el-menu>
        </aside>
        <main class="main">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
    import Axios from 'axios';
    import {Document,Position,ChatDotRound,Checked,Promotion,List,Warning} from '@element-plus/icons-vue';
    export default {
        name: "HomeStudent",
        components:{Document,Position,ChatDotRound,Checked,Promotion,List,Warning},
        data(){
            return{
                active: ''
            }
        },

        methods:{
            load(){
                // 查看学院全部选题
                Axios.post('http://192.168.10.103:4523/mock/869489/mainservice/student/allTopics').then(res =>{
                    console.log(res)
                })
            }
        },

        created(){
            this.active = this.$route.fullPath
        },
        updated(){
            this.active = this.$route.fullPath
        }
    }
</script>

<style scoped>
    .root-box{
        height: 100%;
        width: 100%;
    }
    .main{
        padding: 20px 30px;
        margin-left: 200px;
    }
    .aside{
        height: 100%;
        width: 200px;
        position: fixed;
        z-index: 996;
        top:0;
        left: 0;
        background-color: #7AB8CC;
    }
    .aside-menu{
        height: 100%;
        margin-top: 30px;
        border-width: 0;
    }
    .menu-item{
        font-size: 16px
    }
    .menu-box{
        height: 80px;
    }
</style>