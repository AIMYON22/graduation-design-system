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
                <el-menu-item index="/home-teacher/time-arrange" class="menu-box">
                    <el-icon><AlarmClock /></el-icon>
                    <span class="menu-item">选题时间安排</span>
                </el-menu-item>
                <el-menu-item index="/home-teacher/add-topic" class="menu-box">
                    <el-icon><CirclePlus /></el-icon>
                    <span class="menu-item">添加毕设选题</span>
                </el-menu-item>
                <el-menu-item index="/home-teacher/topic-control" class="menu-box">
                    <el-icon><Document /></el-icon>
                    <span class="menu-item">已发选题管理</span>
                </el-menu-item>
                <el-menu-item index="/home-teacher/all-topic" class="menu-box">
                    <el-icon><List /></el-icon>
                    <span class="menu-item">学院全部选题</span>
                </el-menu-item>
                <el-menu-item index="/home-teacher/select-student" class="menu-box">
                    <el-icon><User /></el-icon>
                    <span class="menu-item">选择选题学生</span>
                </el-menu-item>
                <el-menu-item index="/home-teacher/view-result" class="menu-box">
                    <el-icon><CircleCheck /></el-icon>
                    <span class="menu-item">查看选题结果</span>
                </el-menu-item>
                <el-menu-item index="/home-teacher/time-submit" class="menu-box">
                    <el-icon><Calendar /></el-icon>
                    <span class="menu-item">指导时间提交</span>
                </el-menu-item>
                <el-menu-item index="/home-teacher/view-guidance" class="menu-box">
                    <el-icon><Compass /></el-icon>
                    <span class="menu-item">查看指导信息</span>
                </el-menu-item>
                <el-menu-item index="/home-teacher/mid-check" class="menu-box">
                    <el-icon><Checked /></el-icon>
                    <span class="menu-item">中期检查管理</span>
                </el-menu-item>
                <el-menu-item index="/home-teacher/view-paper" class="menu-box">
                    <el-icon><DocumentCopy /></el-icon>
                    <span class="menu-item">查看论文信息</span>
                </el-menu-item>
                <el-menu-item index="/home-teacher/final-grade" class="menu-box">
                    <el-icon><Document /></el-icon>
                    <span class="menu-item">论文最终成绩</span>
                </el-menu-item>
            </el-menu>
        </aside>
        <main class="main">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
    import {AlarmClock, CirclePlus, Document, List, User, Calendar, Checked, Compass, DocumentCopy, CircleCheck} from '@element-plus/icons-vue'
    export default {
        name: "HomeTeacher",
        components:{AlarmClock, CirclePlus, Document, List, User, Calendar, Checked, Compass, DocumentCopy, CircleCheck},
        data(){
            return{
                active: ''
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
        overflow-y: auto;
    }
    .aside-menu{
        height: 100%;
        margin-top: 30px;
        border-width: 0;
    }
    .menu-item{
        width: 100%;
        font-size: 16px
    }
    .menu-box{
        height: 80px;
    }
    .aside::-webkit-scrollbar {
        width: 6px;
        /*height: 4px;*/
    }

    .aside::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 10px #5c99ac;
        background: rgba(0, 0, 0, 0.2);
    }

    .aside::-webkit-scrollbar-track {
        box-shadow: inset 0 0 10px #F0F8FF;
        border-radius: 0;
        background: rgba(0, 0, 0, 0.1);
    }
</style>