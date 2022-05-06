<template>
    <div class="main-box">
        <div class="tips">
        </div>
        <el-table :data="tableData" border style="width: 100%;margin-top: 10px" >
            <el-table-column prop="stuNumber" label="学号"  align="center" />
            <el-table-column prop="stuName" label="姓名"  align="center"/>
            <el-table-column prop="gtopic" label="题目" align="center"/>
            <el-table-column prop="tname" label="教师姓名" align="center"/>
            <el-table-column label="操作" align="center">
                <el-button type="primary" @click="dialogFormVisible = true" plain>提交</el-button>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogFormVisible" title="提交中期检查">
            <el-form :model="formData" label-width="100px">
                <el-form-item label="题目名称">
                    <el-input v-model="formData.GTopic"></el-input>
                </el-form-item>
                <el-form-item label="是否进入实验室">
                    <el-switch
                            v-model="formData.inLaboratory"
                            active-color="#13ce66"
                            inactive-color="#999999"
                            active-value="1"
                            inactive-value="0"
                    />
                </el-form-item>
                <el-form-item label="实验室名称">
                    <el-input v-model="formData.laboratoryName"></el-input>
                </el-form-item>
                <el-form-item label="实验室地点">
                    <el-input v-model="formData.laboratoryPlace"></el-input>
                </el-form-item>
                <el-form-item label="中期报告文件">
                    <el-upload
                            :show-file-list="true"
                            action="none"
                            :auto-upload="false"
                            :file-list="fileList"
                            :limit="1"
                            :on-exceed="handleExceed"
                    >
                        <el-button type="primary" color="#7AB8CC">上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="进展情况">
                    <el-input v-model="formData.processCondition"></el-input>
                </el-form-item>
                <el-form-item label="学生学号">
                    <el-input v-model="formData.stuNumber"></el-input>
                </el-form-item>
                <el-form-item label="题目是否更改">
                    <el-switch
                            v-model="formData.topicChange"
                            active-color="#13ce66"
                            inactive-color="#999999"
                            active-value="1"
                            inactive-value="0"
                    />
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
        name: "MidSubmit",
        data(){
            return{
                tableData:[],
                formData:{
                    GTopic: '',
                    inLaboratory: 0,
                    laboratoryName: '',
                    laboratoryPlace: '',
                    middleContent: null,
                    processCondition: '',
                    stuNumber: '',
                    topicChange: null
                },
                dialogFormVisible: false,
                address: `${this.$store.state.address}/mainservice/student/addMiddleCheck`,
                fileList:[]
            }
        },
        methods:{
            getData(){
                Axios.post(`${this.$store.state.address}/mainservice/student/lookSuccessTopic`,
                    {stuNumber: this.$store.state.user.number}).then(res => {
                    let result = res.data;
                    if(result.success){
                        this.tableData = [];
                        this.tableData = [result.data.successTopic];
                    }
                    else{
                        this.$message.error(result.message)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },

            formSubmit(){
                let submitData = new FormData();
                let transData = {
                    GTopic: this.formData.GTopic,
                    inLaboratory: Number(this.formData.inLaboratory),
                    laboratoryName: this.formData.laboratoryName,
                    laboratoryPlace: this.formData.laboratoryPlace,
                    middleContent: this.fileList[0].raw,
                    processCondition: this.formData.processCondition,
                    stuNumber: this.formData.stuNumber,
                    topicChange: Number(this.formData.topicChange)
                }
                for(let key in transData) {
                    submitData.append(key, transData[key])
                }
                Axios.post(`${this.$store.state.address}/mainservice/student/addMiddleCheck`,
                    submitData).then(res => {
                    let result = res.data;
                    if(result.success){
                        this.dialogFormVisible = false;
                        this.$message({
                            message: result.message,
                            type: 'success'
                        })
                    }
                    else{
                        this.$message.error(result.message)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },

            handleExceed() {
                this.$message.error('只能上传一个文件')
            }
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
        height: 40px;
    }
</style>