<template>
    <div class="main-box">
        <div class="tips">
            <p>本学期的毕业设计指导时间安排</p>
        </div>
        <el-table :data="tableData" border style="width: 100%;margin-top: 10px" >
            <el-table-column prop="id" label="编号"  align="center" width="60px" />
            <el-table-column prop="stuName" label="学生姓名"  align="center"/>
            <el-table-column prop="stuNumber" label="学生学号" align="center"/>
            <el-table-column prop="guidanceTime" label="指导时间" width="180px" align="center"/>
            <el-table-column prop="guidancePlace" label="指导地点" align="center" width="110px"/>
            <el-table-column prop="content" label="指导内容" align="center"/>
            <el-table-column prop="tnumber" label="教师编号" align="center"/>
            <el-table-column prop="tname" label="教师姓名" width="180px" align="center"/>
        </el-table>
    </div>
</template>

<script>
    import Axios from "axios";

    export default {
        name: "AdviceView",
        data(){
            return{
                tableData:[]
            }
        },
        methods:{
            getTableData(){
                Axios.post(`${this.$store.state.address}/mainservice/student/lookGuidance`,
                    {stuNumber: this.$store.state.user.number}).then(res => {
                    let result = res.data;
                    if(result.success){
                        this.tableData = [];
                        this.tableData = result.data.guidanceList;
                    }
                    else{
                        this.$message.error(result.message)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        created(){
            this.getTableData()
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
        color: #625B57
    }
</style>