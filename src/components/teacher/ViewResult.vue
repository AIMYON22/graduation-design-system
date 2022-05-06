<template>
    <div class="main-box">
        <div class="tips"></div>
        <el-table :data="tableData" border style="width: 100%;margin-top: 10px" >
            <el-table-column prop="stuName" label="学生姓名" align="center" />
            <el-table-column prop="stuNumber" label="学生编号"  align="center"/>
            <el-table-column prop="contactInfor" label="联系方式" align="center"/>
            <el-table-column prop="selectMessage" label="选题留言" width="180px" align="center"/>
            <el-table-column prop="selectTime" label="选题时间" align="center"/>
            <el-table-column prop="teacherMessage" label="教师留言" align="center"/>
            <el-table-column prop="gtopic" label="题目" align="center"/>
        </el-table>
    </div>
</template>

<script>
    import Axios from 'axios'
    export default {
        name: "ViewResult",
        data() {
            return {
                tableData:[]
            }
        },
        methods: {
            load() {
                Axios.post(`${this.$store.state.address}/mainservice/teacher/teacherChooseResult`,
                    {
                        tNumber: this.$store.state.user.number
                    }).then(res => {
                        let result = res.data;
                        if(result.success) {
                            this.tableData = [];
                            this.tableData = result.data.teacherChooseResultList
                        }
                        else {
                            this.$message.error(result.message)
                        }
                }).catch(err => {
                    console.log(err)
                })
            },
        },

        created() {
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