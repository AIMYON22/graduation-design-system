<template>
    <div class="main-box">
        <div class="tips">
        </div>
        <div class="form-box">
            <h4 class="title">提交指导时间</h4>
            <el-form :model="formData" class="form" label-position="right" label-width="100px">
                <el-form-item label="教师名称">
                    <el-input v-model="formData.tname" clearable/>
                </el-form-item>
                <el-form-item label="教师工号">
                    <el-input v-model="formData.tnumber" clearable/>
                </el-form-item>
                <el-form-item label="学生名称">
                    <el-input v-model="formData.stuName" clearable/>
                </el-form-item>
                <el-form-item label="学生学号">
                    <el-input v-model="formData.stuNumber" clearable/>
                </el-form-item>
                <el-form-item label="指导时间">
                    <el-date-picker
                            v-model="formData.guidanceTime"
                            type="datetime"
                            placeholder="选择时间"
                    />
                </el-form-item>
                <el-form-item label="指导地点">
                    <el-input v-model="formData.guidancePlace" clearable/>
                </el-form-item>
                <el-form-item label="指导内容">
                    <el-input v-model="formData.content" clearable/>
                </el-form-item>
                <el-form-item label-width="0">
                    <el-button color="#7AB8CC" plain size="large" class="submit-button" @click="formSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Axios from "axios";

    export default {
        name: "TimeSubmit",
        data(){
            return{
                formData: {
                    tname: '',
                    tnumber: '',
                    stuName: '',
                    stuNumber: '',
                    guidanceTime: null,
                    guidancePlace: '',
                    content: '',
                    id: ''
                }
            }
        },
        methods: {
            formSubmit(){
                Axios.post(`${this.$store.state.address}/mainservice/teacher/addGuidance`,
                this.formData).then(res => {
                    let result = res.data;
                    if(result.success){
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
            }
        }
    }
</script>

<style scoped>
    .main-box{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
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
    .form-box{
        margin-top: 20px;
        padding: 20px 30px;
        width: 70%;
        border-radius: 10px;
        border: 2px solid #7AB8CC;
        background-color: #F0F8FF;

    }
    .title{
        text-align: center;
        text-indent: 5px;
        letter-spacing: 5px;
        color: #7AB8CC;
    }
    .form{
        margin-top: 10px;
        font-weight: bold;
    }
    .submit-button{
        margin-left: auto;
        margin-right: auto;
        text-indent: 5px;
        letter-spacing: 5px;
        font-weight: bold;
    }
</style>