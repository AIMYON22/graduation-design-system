<template>
    <div class="main-box">
        <div class="tips"></div>
        <el-table :data="tableData" border style="width: 100%;margin-top: 10px" >
            <el-table-column fixed prop="id" label="序号"  align="center"  />
            <el-table-column prop="gid" label="编号"  align="center" width="100" />
            <el-table-column prop="mainContent" label="内容" align="center" width="100">
                <template v-slot="{row}">
                    <el-link type="primary" :href="row.mainContent">内容</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="annex" label="附件" align="center" width="100">
                <template v-slot="{row}">
                    <el-link type="primary" :href="row.annex">附件</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="repeatRate" label="查重率" align="center" width="100"/>
            <el-table-column prop="errorMessage" label="错误信息" align="center"  width="100"/>
            <el-table-column prop="checkDate" label="检查时间" align="center" width="100"/>
            <el-table-column prop="stuName" label="学生姓名" align="center" width="100"/>
            <el-table-column prop="stuNumber" label="学生学号" align="center" width="100"/>
            <el-table-column prop="academy" label="学院" align="center" width="100"/>
            <el-table-column prop="result" label="结果" align="center" width="100"/>
            <el-table-column prop="score" label="分数" align="center" width="100"/>
            <el-table-column prop="scoreMessage" label="评价" align="center" width="100"/>
            <el-table-column prop="gtopic" label="题目" align="center" width="100"/>
            <el-table-column fixed="right" label="操作" width="120" align="center">
                <template v-slot="{row}">
                    <el-button size="small" type="primary" plain @click="check(row)">审核</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogFormVisible">
            <el-form label-width="100">
                <el-form-item label="编号">
                    <el-input v-model="formData.id"></el-input>
                </el-form-item>
                <el-form-item label="结果">
                    <el-input v-model="formData.result"></el-input>
                </el-form-item>
                <el-form-item label="分数">
                    <el-input v-model="formData.score"></el-input>
                </el-form-item>
                <el-form-item label="评价">
                    <el-input v-model="formData.scoreMessage"></el-input>
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
        name: "FinalGrade",
        data(){
            return{
                tableData:[],
                formData:{
                    id: null,
                    result: '',
                    score: '',
                    scoreMessage: '',
                    repeatRate: ''
                },
                dialogFormVisible: false
            }
        },

        methods:{
            //请求全部选题
            load(){
                Axios.post(`${this.$store.state.address}/mainservice/teacher/teaLookThesisResult`,
                    {
                        tNumber: this.$store.state.user.number
                    }).then(res => {
                    console.log(res);
                    let result = res.data;
                    if(result.success){
                        this.tableData = [];
                        this.tableData = result.data.teaLookThesisListResult
                    }
                    else{
                        this.$message.error(result.message)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },

            check(row) {
                this.formData.id = row.id;
                this.formData.result = row.result;
                this.formData.score = row.score;
                this.formData.scoreMessage = row.scoreMessage;
                this.formData.repeatRate = row.repeatRate;
                this.dialogFormVisible = true
            },

            formSubmit(){
                Axios.post(`${this.$store.state.address}/mainservice/teacher/teaUpdateThesisListResult`,
                    {
                        id: Number(this.formData.id),
                        repeatRate: this.formData.repeatRate,
                        result: this.formData.result,
                        score: this.formData.score,
                        scoreMessage: this.formData.scoreMessage,
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
        width: 100%;
    }
</style>