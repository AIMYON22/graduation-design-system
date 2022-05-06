<template>
    <div class="main-box">
        <div class="tips">
            <p>
                论文成绩
            </p>
        </div>
        <el-table :data="tableData" border style="width: 100%;margin-top: 10px" >
            <el-table-column prop="gid" label="编号"  align="center" width="60px" />
            <el-table-column prop="stuNumber" label="学生学号" width="240px" align="center"/>
            <el-table-column prop="repeatRate" label="重复率" align="center"/>
            <el-table-column prop="result" label="答辩结果" align="center"/>
            <el-table-column prop="score" label="得分" align="center"/>
            <el-table-column prop="scoreMessage" label="评价" align="center"/>
            <el-table-column prop="gtopic" label="主题" align="center"/>
        </el-table>
    </div>
</template>

<script>
    import Axios from "axios";

    export default {
        name: "PaperGrade",
        data(){
            return{
                tableData:[]
            }
        },
        methods:{
            getData(){
                Axios.post(`${this.$store.state.address}/mainservice/student/stuLookThesisResult`,
                    {stuNumber: this.$store.state.user.number}).then(res => {
                    let result = res.data;
                    if(result.success){
                        this.tableData = [];
                        this.tableData = [result.data.stuLookThesisResultRes];
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
            this.getData()
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
    }
</style>