<template>
    <div class="main-box">
        <div class="tips"></div>
        <el-table :data="tableData" border style="width: 100%;margin-top: 10px" >
            <el-table-column fixed prop="gid" label="编号"  align="center"  />
            <el-table-column prop="academy" label="学院" width="100px" align="center"/>
            <el-table-column prop="minorDegree" label="辅修专业" width="100px" align="center" :formatter="formatDegree"/>
            <el-table-column prop="volume" label="容量" width="100px" align="center"/>
            <el-table-column prop="selectState" label="选择状态" width="100px" align="center" :formatter="formatState"/>
            <el-table-column prop="missionStatement" label="任务说明" width="100px" align="center">
                <template v-slot="{row}">
                    <el-link :href="row.missionStatement">任务书</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="leaderCheck" label="领导检查" width="100px" align="center" :formatter="formatCheck"/>
            <el-table-column prop="leaderMessage" label="领导留言" width="100px" align="center"/>
            <el-table-column prop="introduction" label="介绍" width="100px" align="center"/>
            <el-table-column prop="resultType" label="结果类型" width="100px" align="center"/>
            <el-table-column prop="origin" label="来源" width="100px" align="center"/>
            <el-table-column prop="tnumber" label="教师编号" width="100px" align="center"/>
            <el-table-column prop="gtopic" label="主题" width="100px" align="center"/>
            <el-table-column prop="tname" label="教师姓名" width="100px" align="center"/>
            <el-table-column prop="goutCampusTutor" label="校外导师" width="100px" align="center"/>
            <el-table-column prop="grealCase" label="真题真做" width="100px" align="center"/>
            <el-table-column prop="gtype" label="类型" width="100px" align="center"/>
            <el-table-column fixed="right" label="操作" width="150" align="center">
                <template v-slot="{row}">
                    <el-button size="small" type="primary" plain @click="check(row)">审核</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogFormVisible" title="审查毕设题目">
            <el-form :model="formData" class="form" label-position="right" label-width="100px">
                <el-form-item label="编号">
                    <el-input v-model="formData.gid" clearable/>
                </el-form-item>
                <el-form-item label="领导审查">
                    <el-switch v-model="switchData" disabled/>
                </el-form-item>
                <el-form-item label="领导留言">
                    <el-input v-model="formData.leaderMessage" clearable/>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false" color="#7AB8CC" plain>取消</el-button>
                <el-button type="primary" @click="formSubmit" color="#7AB8CC">确定</el-button>
              </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import Axios from 'axios'
    export default {
        name: "AllTopicAdmin",
        data(){
            return{
                tableData:[],
                dialogFormVisible: false,
                formData:{
                    gid: null,
                    leaderCheck: 1,
                    leaderMessage: ''
                },
                switchData: true
            }
        },

        methods:{
            //请求全部选题
            load(){
                Axios.post(`${this.$store.state.address}/mainservice/g-leader/leaderLookTopics`,
                    {
                        academy: this.$store.state.user.academy,
                        pageSize: 100,
                        currentPage: 1
                    }).then(res => {
                        console.log(res);
                        let result = res.data;
                        if(result.success){
                            this.tableData = [];
                            this.tableData = result.data.leaderLookTopicsList
                        }
                        else{
                            this.$message.error(result.message)
                        }
                }).catch(err => {
                    console.log(err)
                })
            },

            check(row){
                this.formData.gid = row.gid;
                this.formData.leaderMessage = row.leaderMessage;
                this.dialogFormVisible = true;
            },

            formSubmit(){
                this.formData.gid = Number(this.formData.gid);
                Axios.post(`${this.$store.state.address}/mainservice/g-leader/leaderCheckTopic`,
                    this.formData).then(res => {
                        let result = res.data;
                        if(result.success){
                            this.dialogFormVisible = false;
                            this.$message({
                                message: result.message,
                                type: 'success'
                            })
                        }
                        else {
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
    }
</style>