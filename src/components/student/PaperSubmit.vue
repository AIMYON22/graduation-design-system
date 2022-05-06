<template>
    <div class="main-box">
        <div class="tips">
        </div>
        <el-table :data="tableData" border style="width: 100%;margin-top: 10px" >
            <el-table-column prop="stuNumber" label="学号"  align="center" width="60px" />
            <el-table-column prop="stuName" label="姓名"  align="center"/>
            <el-table-column prop="gtopic" label="题目" align="center"/>
            <el-table-column prop="tname" label="教师姓名" width="240px" align="center"/>
            <el-table-column label="操作" align="center">
                <el-button type="primary" @click="dialogFormVisible = true" plain>提交</el-button>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogFormVisible" title="提交论文信息">
            <el-form :model="formData" label-width="100px">
                <el-form-item label="题目名称">
                    <el-input v-model="formData.GTopic"></el-input>
                </el-form-item>
                <el-form-item label="学院">
                    <el-input v-model="formData.academy"></el-input>
                </el-form-item>
                <el-form-item label="论文">
                    <el-upload
                            :show-file-list="true"
                            action="none"
                            :auto-upload="false"
                            :file-list="fileList1"
                            :limit="1"
                            :on-exceed="handleExceed"
                    >
                        <el-button type="primary" color="#7AB8CC">上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="附件">
                    <el-upload
                            :show-file-list="true"
                            action="none"
                            :auto-upload="false"
                            :file-list="fileList2"
                            :limit="1"
                            :on-exceed="handleExceed"
                    >
                        <el-button type="primary" color="#7AB8CC">上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="学号">
                    <el-input v-model="formData.stuNumber"></el-input>
                </el-form-item>
                <el-form-item label="查重日期">
                    <el-date-picker
                            v-model="formData.checkDate"
                            type="datetime"
                            format="YYYY/MM/DD hh:mm:ss"
                    />
                </el-form-item>
                <el-form-item label="错误信息">
                    <el-input v-model="formData.errorMessage"></el-input>
                </el-form-item>
                <el-form-item label="是否查重">
                    <el-switch
                            v-model="formData.isCheck"
                            active-color="#13ce66"
                            inactive-color="#999999"
                            active-value="1"
                            inactive-value="0"
                    />
                </el-form-item>
                <el-form-item label="查重率">
                    <el-input v-model="formData.repeatRate"></el-input>
                </el-form-item>
                <el-form-item label="学生姓名">
                    <el-input v-model="formData.stuName"></el-input>
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
                    academy: '',
                    annex: null,
                    mainContent: null,
                    stuNumber: '',
                    checkDate: '',
                    errorMessage: '',
                    isCheck: null,
                    repeatRate: '',
                    stuName: ''
                },
                dialogFormVisible: false,
                address: `${this.$store.state.address}/mainservice/student/addThesis`,
                fileList1: [],
                fileList2: []
            }
        },
        methods:{
            handleExceed(){
                this.$message.error('只能上传一个文件')
            },

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
                    academy: this.formData.academy,
                    annex: this.fileList2[0].raw,
                    mainContent: this.fileList1[0].raw,
                    stuNumber: this.formData.stuNumber,
                    checkDate: this.formData.checkDate,
                    errorMessage: this.formData.errorMessage,
                    isCheck: Number(this.formData.isCheck),
                    repeatRate: this.formData.repeatRate,
                    stuName: this.formData.stuName,
                };
                for(let key in transData) {
                    submitData.append(key, transData[key])
                }
                Axios.post(`${this.$store.state.address}/mainservice/student/addThesis`,
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