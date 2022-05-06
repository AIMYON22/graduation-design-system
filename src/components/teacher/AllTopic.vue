<template>
    <div class="main-box">
        <div class="tips"></div>
        <el-table :data="tableData" border style="width: 100%;margin-top: 10px" >
            <el-table-column prop="gid" fixed label="序号" align="center" width="60px" />
            <el-table-column prop="academy" label="学院"  align="center" width="100px"/>
            <el-table-column prop="minorDegree" label="辅修学位" align="center" width="100px"
                             :formatter="formatDegree"/>
            <el-table-column prop="volume" label="容量" width="180px" align="center"/>
            <el-table-column prop="selectState" label="选题状态" align="center" width="100px" :formatter="formatState"/>
            <el-table-column prop="missionStatement" label="任务书" align="center" width="100px">
                <template v-slot="{row}">
                    <el-link type="primary" :href="row.missionStatement">任务书</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="leaderCheck" label="领导检查" align="center" width="100px" :formatter="formatCheck"/>
            <el-table-column prop="leaderMessage" label="领导意见" align="center" width="100px"/>
            <el-table-column prop="introduction" label="介绍" align="center" width="100px"/>
            <el-table-column prop="resultType" label="结果类型" align="center" width="100px"/>
            <el-table-column prop="origin" label="来源" align="center" width="100px"/>
            <el-table-column prop="gtopic" label="题目" align="center" width="100px"/>
            <el-table-column prop="tnumber" label="教师编号" align="center" width="100px"/>
            <el-table-column prop="tname" label="教师姓名" align="center" width="100px"/>
            <el-table-column prop="gtype" label="类型" align="center" width="100px"/>
            <el-table-column prop="grealCase" label="真题真做" align="center" width="100px"/>
            <el-table-column prop="gselectRequire" label="选题要求" align="center" width="100px"/>
            <el-table-column prop="goutCampusTutor" label="校外导师" align="center" width="100px"/>
        </el-table>
    </div>
</template>

<script>
    import Axios from 'axios'
    export default {
        name: "AllTopic",
        data(){
            return{
                tableData:[]
            }
        },
        methods: {
            load(){
                Axios.post(`${this.$store.state.address}/mainservice/teacher/queryTopicsByAcademy`,
                    {
                        academy: this.$store.state.user.academy,
                        currentPage: 1,
                        pageSize: 100
                    }).then(res => {
                    let result = res.data;
                    if(result.success){
                        this.tableData = [];
                        this.tableData = result.data.queryTopicsByAcademyList;
                    }
                    else{
                        this.$message.error(result.message)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            formatDegree(row) {
                switch (row.minorDegree) {
                    case 0:
                        return '否';
                    case 1:
                        return '是'
                    default:
                        return false
                }
            },
            formatState(row) {
                switch (row.selectState) {
                    case 0:
                        return '待选';
                    case 1:
                        return '已满'
                    default:
                        return false
                }
            },
            formatCheck(row) {
                switch (row.leaderCheck) {
                    case 0:
                        return '未检查';
                    case 1:
                        return '已检查'
                    default:
                        return false
                }
            }
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