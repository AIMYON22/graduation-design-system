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
                <el-menu-item index="/home-admin/all-topic-admin" class="menu-box">
                    <el-icon><List /></el-icon>
                    <span class="menu-item">学院全部选题</span>
                </el-menu-item>
                <el-menu-item index="/home-admin/mid-check-admin" class="menu-box">
                    <el-icon><Checked /></el-icon>
                    <span class="menu-item">中期检查</span>
                </el-menu-item>
                <el-menu-item index="/home-admin/add-cache" class="menu-box">
                    <el-icon><CirclePlus /></el-icon>
                    <span class="menu-item">添加缓存</span>
                </el-menu-item>
            </el-menu>
        </aside>
        <main class="main">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
    import {Checked, List, CirclePlus} from '@element-plus/icons-vue'
    export default {
        name: "HomeAdmin",
        components:{Checked, List, CirclePlus},
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