<template>
    <div class="main-box">
        <div class="tips">
        </div>
        <el-table :data="tableData" border style="width: 100%;margin-top: 10px" >
            <el-table-column fixed prop="mcId" label="编号"  align="center"  />
            <el-table-column prop="stuName" label="学生姓名" width="100px" align="center"/>
            <el-table-column prop="stuNumber" label="学生学号" width="100px" align="center"/>
            <el-table-column prop="origin" label="来源" width="100px" align="center"/>
            <el-table-column prop="inLaboratory" label="是否在实验室" width="100px" align="center" />
            <el-table-column prop="laboratoryName" label="实验室名称" width="100px" align="center"/>
            <el-table-column prop="laboratoryPlace" label="实验室地点" width="100px" align="center"/>
            <el-table-column prop="topicChange" label="改变题目" width="100px" align="center"/>
            <el-table-column prop="middleContent" label="中期内容" width="100px" align="center">
                <template v-slot="{row}">
                    <el-link type="primary" :href="row.middleContent">中期内容</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="processCondition" label="进展" width="100px" align="center"/>
            <el-table-column prop="qualityEvaluation" label="质量评估" width="100px" align="center"/>
            <el-table-column prop="teacherCheck" label="教师建议" width="100px" align="center"/>
            <el-table-column prop="academy" label="学院" width="100px" align="center"/>
            <el-table-column prop="academyCheck" label="学院检查" width="100px" align="center"/>
            <el-table-column prop="gtopic" label="题目" width="100px" align="center"/>
            <el-table-column prop="tnumber" label="教师编号" width="100px" align="center"/>
            <el-table-column prop="tname" label="教师姓名" width="100px" align="center"/>
            <el-table-column prop="grealCase" label="真题真做" width="100px" align="center"/>
            <el-table-column prop="gtype" label="类型" width="100px" align="center"/>
            <el-table-column prop="goutCampusTutor" label="校外导师" width="100px" align="center"/>
            <el-table-column fixed="right" label="操作" width="150" align="center">
                <template v-slot="{row}">
                    <el-button size="small" type="primary" plain @click="openDialog(row)">审核</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogFormVisible">
            <el-form label-width="100">
                <el-form-item label="编号">
                    <el-input v-model="formData.mcId"></el-input>
                </el-form-item>
                <el-form-item label="质量评估">
                    <el-input v-model="formData.qualityEvaluation"></el-input>
                </el-form-item>
                <el-form-item label="教师建议">
                    <el-input v-model="formData.teacherCheck"></el-input>
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
    import Axios from "axios";

    export default {
        name: "MidCheck",
        data(){
            return{
                tableData: [],
                dialogFormVisible: false,
                formData: {
                    mcId: "",
                    qualityEvaluation: null,
                    teacherCheck: ""
                }
            }
        },
        methods: {
            load(){
                Axios.post(`${this.$store.state.address}/mainservice/teacher/controlMiddleCheck`,
                    {
                        tNumber: this.$store.state.user.number
                    }).then(res => {
                    console.log(res);
                    let result = res.data;
                    if(result.success){
                        this.tableData = [];
                        this.tableData = result.data.controlMiddleCheckList
                    }
                    else{
                        this.$message.error(result.message)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },

            openDialog(row){
                this.formData.mcId = row.mcId;
                this.formData.qualityEvaluation = row.qualityEvaluation;
                this.formData.teacherCheck = row.teacherCheck;
                this.dialogFormVisible = true
            },

            formSubmit(){
                Axios.post(`${this.$store.state.address}/mainservice/teacher/updateMiddleCheck`,
                    {
                        mcId: this.formData.mcId,
                        qualityEvaluation: Number(this.formData.qualityEvaluation),
                        teacherCheck: this.formData.teacherCheck
                    }).then(res => {
                    let result = res.data;
                    if(result.success){
                        this.$message({
                            message: result.message,
                            type: 'success'
                        })
                        this.dialogFormVisible = false
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
</style>