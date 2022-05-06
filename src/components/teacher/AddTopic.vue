<template>
    <div class="main-box">
        <div class="tips"></div>
        <div class="form-box">
            <h3 class="title">添加毕设选题</h3>
            <el-form :model="formData" class="form" label-position="right" label-width="100px">
                <el-form-item label="学院">
                    <el-input v-model="formData.academy" clearable/>
                </el-form-item>
                <el-form-item label="教师名字">
                    <el-input v-model="formData.TName" clearable/>
                </el-form-item>
                <el-form-item label="教师工号">
                    <el-input v-model="formData.TNumber" clearable/>
                </el-form-item>
                <el-form-item label="题目名称">
                    <el-input v-model="formData.GTopic" clearable/>
                </el-form-item>
                <el-form-item label="课题类型">
                    <el-input v-model="formData.GType" clearable/>
                </el-form-item>
                <el-form-item label="真题真做">
                    <el-select v-model="formData.GRealCase">
                        <el-option label="是" value="1"/>
                        <el-option label="否" value="0"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="校外导师">
                    <el-input v-model="formData.GOutCampusTutor" clearable/>
                </el-form-item>
                <el-form-item label="选题要求">
                    <el-input v-model="formData.GSelectRequire" clearable/>
                </el-form-item>
                <el-form-item label="辅修专业">
                    <el-select v-model="formData.minorDegree">
                        <el-option label="是" value="1"/>
                        <el-option label="否" value="0"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="容量">
                    <el-input-number v-model="formData.volume" />
                </el-form-item>
                <el-form-item label="选择转态">
                    <el-select v-model="formData.selectState">
                        <el-option label="待选" value="0" />
                        <el-option label="已满" value="1" />
                    </el-select>
                </el-form-item>
                <el-form-item label="任务书下载">
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
                <el-form-item label="论文简介">
                    <el-input v-model="formData.introduction" clearable/>
                </el-form-item>
                <el-form-item label="成果形式">
                    <el-input v-model="formData.resultType" clearable/>
                </el-form-item>
                <el-form-item label="题目来源">
                    <el-input v-model="formData.origin" clearable/>
                </el-form-item>
                <el-form-item label-width="0">
                    <el-button color="#7AB8CC" plain size="large" @click="formSubmit" class="submit-button">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    export default {
        name: "AddTopic",
        data(){
            return{
                formData:{
                    academy: '',
                    TName: '',
                    TNumber: '',
                    GTopic: '',
                    GType: '',
                    GRealCase: null,
                    GOutCampusTutor: '',
                    GSelectRequire: '',
                    minorDegree: null,
                    volume: null,
                    selectState: null,
                    missionStatementFile: null,
                    introduction: '',
                    resultType: '',
                    origin: ''
                },
                address: `${this.$store.state.address}/mainservice/teacher/addGraduation`,
                fileList:[]
            }
        },

        methods: {
            formSubmit(){
                let submitData = new FormData();
                let transData = {
                    academy: this.formData.academy,
                    TName: this.formData.TName,
                    TNumber: this.formData.TNumber,
                    GTopic: this.formData.GTopic,
                    GType: this.formData.GType,
                    GRealCase: Number(this.formData.GRealCase),
                    GOutCampusTutor: this.formData.GOutCampusTutor,
                    GSelectRequire: this.formData.GSelectRequire,
                    minorDegree: Number(this.formData.minorDegree),
                    volume: Number(this.formData.volume),
                    selectState: Number(this.formData.selectState),
                    missionStatementFile: this.fileList[0].raw,
                    introduction: this.formData.introduction,
                    resultType: this.formData.resultType,
                    origin: this.formData.origin
                }
                for(let key in transData) {
                    submitData.append(key, transData[key])
                }
                Axios.post(`${this.$store.state.address}/mainservice/teacher/addGraduation`,
                    submitData).then(res => {
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
            },

            handleExceed() {
                this.$message.error('只能上传一个文件')
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
        border: 2px solid #7ab8cc;
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