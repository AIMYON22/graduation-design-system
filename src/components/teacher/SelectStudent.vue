<template>
    <div class="main-box">
        <div class="tips">
        </div>
        <el-table :data="tableData" border style="width: 100%;margin-top: 10px" >
            <el-table-column prop="academy" label="学院"  align="center"  />
            <el-table-column prop="tname" label="教师名字" align="center"/>
            <el-table-column prop="tnumber" label="教师工号" align="center"/>
            <el-table-column prop="gtopic" label="题目名称" align="center"/>
            <el-table-column label="操作" width="150" align="center">
                <template v-slot="{row}">
                    <el-button size="small" type="primary" plain @click="viewStudent(row.gid)">查看选题学生</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogFormVisible" title="选择学生">
            <el-descriptions
                    class="margin-top"
                    title="学生信息"
                    :column="1"
                    border
                    v-for="item in this.studentData"
                    :key="item.sid"
            >
                <template #extra>
                    <el-button type="primary" @click="selectStudent(item.sid)" color="#7AB8CC">选择该学生</el-button>
                </template>
                <el-descriptions-item min-width="150px">
                    <template #label>
                        <div class="cell-item">
                            ID
                        </div>
                    </template>
                    {{item.sid}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            学生姓名
                        </div>
                    </template>
                    {{item.stuName}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            学生学号
                        </div>
                    </template>
                    {{item.stuNumber}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            联系方式
                        </div>
                    </template>
                    {{item.contactInfor}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            申请信息
                        </div>
                    </template>
                    {{item.selectMessage}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            申请时间
                        </div>
                    </template>
                    {{item.selectTime}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            教师留言
                        </div>
                    </template>
                    <el-input type="textarea" v-model="description"></el-input>
                </el-descriptions-item>
            </el-descriptions>
        </el-dialog>
    </div>
</template>

<script>
    import Axios from 'axios'
    export default {
        name: "SelectStudent",
        data(){
            return{
                tableData:[],
                dialogFormVisible: false,
                studentData:[],
                description: ''
            }
        },
        methods:{
            load(){
                Axios.post(`${this.$store.state.address}/mainservice/teacher/queryByNumber`, {
                    tNumber: this.$store.state.user.number
                }).then(res => {
                    let result = res.data;
                    if(result.success){
                        this.tableData = []
                        this.tableData = result.data.queryByNumberList
                    }
                    else{
                        this.$message.error(result.message)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },

            viewStudent(id) {
                this.dialogFormVisible = true;
                Axios.post(`${this.$store.state.address}/mainservice/teacher/lookChooseStudent`, {
                    gid: id
                }).then(res => {
                    let result = res.data;
                    if(result.success){
                        this.studentData = [];
                        this.studentData = result.data.lookChooseStudentList;
                        this.dialogFormVisible = true;
                    }
                    else{
                        this.$message.error(result.message)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },

            selectStudent(sid) {
                Axios.post(`${this.$store.state.address}/mainservice/teacher/chooseStudent`, {
                    sid: sid,
                    teacherMessage: this.description
                }).then(res => {
                    let result = res.data;
                    if(result.success){
                        this.$message({
                            message: result.message,
                            type: 'success'
                        })
                        this.dialogFormVisible = false;
                        this.load();
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
    }
    .margin-top{
        margin-top: 10px;
    }
</style>