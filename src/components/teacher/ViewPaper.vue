<template>
    <div class="main-box">
        <div class="tips"></div>
        <el-table :data="tableData" border style="width: 100%;margin-top: 10px" >
            <el-table-column prop="gid" label="编号"  align="center"  />
            <el-table-column prop="mainContent" label="内容" align="center">
                <template v-slot="{row}">
                    <el-link type="primary" :href="row.mainContent">内容</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="annex" label="附件" align="center">
                <template v-slot="{row}">
                    <el-link type="primary" :href="row.annex">附件</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="isCheck" label="是否检查" align="center"/>
            <el-table-column prop="repeatRate" label="查重率" align="center"/>
            <el-table-column prop="errorMessage" label="错误信息" align="center" />
            <el-table-column prop="checkDate" label="检查时间" align="center"/>
            <el-table-column prop="stuName" label="学生姓名" align="center"/>
            <el-table-column prop="stuNumber" label="学生学号" align="center"/>
            <el-table-column prop="academy" label="学院" align="center"/>
            <el-table-column prop="gtopic" label="题目" align="center"/>
        </el-table>

    </div>
</template>

<script>
    import Axios from 'axios'
    export default {
        name: "ViewPaper",
        data(){
            return{
                tableData:[],
            }
        },

        methods:{
            //请求全部选题
            load(){
                Axios.post(`${this.$store.state.address}/mainservice/teacher/teaLookThesis`,
                    {
                        tNumber: this.$store.state.user.number
                    }).then(res => {
                    let result = res.data;
                    if(result.success){
                        this.tableData = [];
                        this.tableData = result.data.teaLookThesisList
                    }
                    else{
                        this.$message.error(result.message)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
        },
        created(){
            this.load()
        }
    }
</script>

<style scoped>
    .tips{
        background-color: #F0F8FF;
        border-left: 5px solid #7AB8CC;
        padding-left: 5px;
        padding-top: 2px;
        padding-bottom: 2px;
        font-size: 12px;
        color: #625B57;
        height: 40px;
        width: 100%;
    }
</style>