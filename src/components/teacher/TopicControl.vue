<template>
    <div class="main-box">
        <div class="tips">
        </div>
        <el-table :data="tableData" border style="width: 100%;margin-top: 10px" >
            <el-table-column prop="academy" label="学院"  align="center"  />
            <el-table-column prop="tname" label="教师名字" align="center"/>
            <el-table-column prop="tnumber" label="教师工号" align="center"/>
            <el-table-column prop="gtopic" label="题目名称" align="center"/>
            <el-table-column label="操作" align="center">
                <template v-slot="{row}">
                    <el-button size="small" type="primary" plain @click="edit(row)">修改</el-button>
                    <el-button size="small" type="danger" plain @click="deleteItem(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogFormVisible" title="修改选题">
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
                    <el-input v-model="formData.source" clearable/>
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
        name: "TopicControl",
        data(){
            return{
                tableData:[],
                dialogFormVisible: false,
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
                address: `${this.$store.state.address}/mainservice/teacher/updateGraduation`,
                fileList: []
            }
        },
        methods:{
            handleExceed(){
                this.$message.error('只能上传一个文件')
            },

            edit(row){
                this.formData.academy = row.academy;
                this.formData.TName = row.tname;
                this.formData.TNumber = row.tnumber;
                this.formData.GTopic = row.gtopic;
                this.formData.GType = row.gtype;
                this.formData.GRealCase = row.grealCase;
                this.formData.GOutCampusTutor = row.goutCampusTutor;
                this.formData.GSelectRequire = row.gselectRequire;
                this.formData.minorDegree = row.minorDegree;
                this.formData.volume = row.volume;
                this.formData.selectState = row.selectState;
                this.formData.introduction = row.introduction;
                this.formData.resultType = row.resultType;
                this.formData.origin = row.origin;
                this.formData.gid = row.gid;
                this.dialogFormVisible = true;
            },

            formSubmit(){
                let submitData = new FormData();
                let transData = {
                    academy: this.formData.academy,
                    Tname: this.formData.TName,
                    TNumber: this.formData.TNumber,
                    GTopic: this.formData.GTopic,
                    GType: this.formData.GType,
                    GRealCase: Number(this.formData.GRealCase),
                    GOutCampusTutor: this.formData.GOutCampusTutor,
                    GSelectRequire: this.formData.GSelectRequire,
                    minorDegree: Number(this.formData.minorDegree),
                    volume: Number(this.formData.volume),
                    selectState: Number(this.formData.selectState),
                    introduction: this.formData.introduction,
                    resultType: this.formData.resultType,
                    origin: this.formData.origin,
                    missionStatementFile: this.fileList[0].raw,
                    gid: this.formData.gid
                }
                for(let key in transData) {
                    submitData.append(key, transData[key])
                }
                Axios.post(`${this.$store.state.address}/mainservice/teacher/updateGraduation`,
                    submitData).then(res => {
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
            },

            deleteItem(row){
                Axios.post(`${this.$store.state.address}/mainservice/teacher/deleteGraduation`, {
                    gid: row.gid
                }).then(res => {
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
            load() {
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