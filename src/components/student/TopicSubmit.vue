<template>
    <div class="main-box">
        <div class="tips-and-search">
            <div class="tips">
                <p class="tips1">
                    名词解释：容量--是指本题目的最多选题人数； 已选--是指已被指导教师审核通过的选题数； 申请数--是指已提交的教师还未处理的申请数。
                </p>
                <p class="tips2">
                    操作提示：如果您要查询所有的已选题或未选题详细情况请将关键字设置为空然后选择相应类别查询即可。
                </p>
            </div>
            <el-form :inline="true" :model="searchData" class="search-form" size="small">
                <el-form-item label="请输入教师姓名查询">
                    <el-input v-model="searchData.tname"  />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" color="#7AB8CC" @click="searchTopic">点击查询</el-button>
                    <el-button type="primary" color="#7AB8CC" @click="viewAll">全部题目</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" border style="width: 100%;margin-top: 10px" >
            <el-table-column prop="gid" fixed label="编号"  align="center" width="100px" />
            <el-table-column prop="academy" label="学院"  align="center" width="100px"/>
            <el-table-column prop="tname" label="教师姓名" align="center" width="100px"/>
            <el-table-column prop="tnumber" label="教师编号" align="center" width="100px"/>
            <el-table-column prop="gtopic" label="主题" align="center" width="100px"/>
            <el-table-column prop="gtype" label="类型" align="center" width="100px"/>
            <el-table-column prop="grealCase" label="真题真做" align="center" width="100px"/>
            <el-table-column prop="goutCampusTutor" label="校外导师" align="center" width="100px"/>
            <el-table-column prop="gselectRequire" label="选题要求" align="center" width="100px"/>
            <el-table-column prop="minorDegree" label="辅修学位" align="center" width="100px" :formatter="formatDegree"/>
            <el-table-column prop="volume" label="容量" align="center" width="100px"/>
            <el-table-column prop="selectState" label="选题状态" align="center" width="100px" :formatter="formatState"/>
            <el-table-column prop="missionStatement" label="任务描述" align="center" width="100px">
                <template v-slot="{row}">
                    <el-link :href="row.missionStatement">任务书</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="leaderCheck" label="领导检查" align="center" width="100px" :formatter="formatCheck"/>
            <el-table-column prop="leaderMessage" label="领导留言" align="center" width="100px"/>
            <el-table-column prop="introduction" label="介绍" align="center" width="100px"/>
            <el-table-column prop="resultType" label="结果类型" align="center" width="100px"/>
            <el-table-column prop="origin" label="来源" align="center" width="100px"/>
            <el-table-column fixed="right" prop="operate" label="操作" align="center" width="200px">
                <template v-slot="{row}">
                    <el-button type="primary" @click="viewDescription(row.gid)" size="small">查看选题简介</el-button>
                    <el-button type="primary" @click="openDialogForm" size="small">选择</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogInfoVisible">
            <el-descriptions title="查看选题简介" border :column="1" >
                <el-descriptions-item label-align="center">
                    <template #label>
                        项目介绍
                    </template>
                    {{topicDescription.introduction}}
                </el-descriptions-item>
                <el-descriptions-item label-align="center">
                    <template #label>
                        结果类型
                    </template>
                    {{topicDescription.resultType}}
                </el-descriptions-item>
                <el-descriptions-item label-align="center">
                    <template #label>
                        任务书
                    </template>
                    <el-link type="primary" :href="topicDescription.missionStatement">
                        {{topicDescription.missionStatement}}
                    </el-link>
                </el-descriptions-item>
                <el-descriptions-item label-align="center">
                    <template #label>
                        主题
                    </template>
                    {{topicDescription.gtopic}}
                </el-descriptions-item>
                <el-descriptions-item label-align="center">
                    <template #label>
                        类型
                    </template>
                    {{topicDescription.gtype}}
                </el-descriptions-item>
                <el-descriptions-item label-align="center">
                    <template #label>
                        选题要求
                    </template>
                    {{topicDescription.gselectRequire}}
                </el-descriptions-item>
            </el-descriptions>
        </el-dialog>

        <el-dialog v-model="dialogFormVisible" title="新增选题">
            <el-form :model="formData" label-width="100px">
                <el-form-item label="邮箱">
                    <el-input v-model="formData.contactInfor" />
                </el-form-item>
                <el-form-item label="主题">
                    <el-input v-model="formData.gtopic" />
                </el-form-item>
                <el-form-item label="选题信息">
                    <el-input v-model="formData.selectMessage" />
                </el-form-item>
                <el-form-item label="时间">
                    <el-date-picker
                            v-model="formData.selectTime"
                            type="datetime"
                            format="YYYY/MM/DD hh:mm:ss"
                    />
                </el-form-item>
                <el-form-item label="学生姓名">
                    <el-input v-model="formData.stuName" />
                </el-form-item>
                <el-form-item label="学生学号">
                    <el-input v-model="formData.stuNumber" />
                </el-form-item>
                <el-form-item label="教师姓名">
                    <el-input v-model="formData.tname" />
                </el-form-item>
            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="selectTopic">确定</el-button>
      </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import Axios from 'axios'
    export default {
        name: "TopicSubmit",
        data(){
                return{
                    searchData:{
                        academy: this.$store.state.user.academy,
                        tname: ''
                    },
                    tableData:[],
                    topicDescription:{
                        introduction:"",
                        resultType:"",
                        missionStatement:"",
                        gtopic:"",
                        gtype:"",
                        gselectRequire:""
                    },
                    dialogInfoVisible: false,
                    dialogFormVisible: false,
                    formData:{
                        contactInfor:"",
                        gid:"",
                        gtopic:"",
                        selectMessage:"",
                        selectTime:"",
                        stuName:"",
                        stuNumber:"",
                        tname:""
                    },
                }
        },

        methods:{
            //查看所有选题
            getAllTopics(){
                Axios.post(`${this.$store.state.address}/mainservice/student/allTopics`,
                    {
                        academy: this.$store.state.user.academy,
                        currentPage: 1,
                        pageSize: 100
                    }).then(res => {
                        let result = res.data;
                        if(result.success){
                            this.tableData = [];
                            this.tableData = result.data.allTopicsList;
                        }
                        else{
                            this.$message.error(result.message)
                        }
                }).catch(err => {
                    console.log(err)
                })
            },
            //点击按钮查看所有选题
            viewAll(){
                this.getAllTopics();
            },
            //查询选题
            searchTopic(){
                Axios.post(`${this.$store.state.address}/mainservice/student/FindTopicByTeaName`,
                    this.searchData).then(res => {
                        let result = res.data;
                        if(result.success){
                            this.tableData = [];
                            this.tableData = result.data.findTopicByTeaNameList
                        }
                        else{
                            this.$message.error(result.message)
                        }
                }).catch(err => {
                    console.log(err)
                })
            },
            viewDescription(id){
                this.dialogInfoVisible = true
                Axios.post(`${this.$store.state.address}/mainservice/student/lookTopicByGid`,
                    {gid: id}).then(res => {
                    let result = res.data;
                    if(result.success){
                        this.topicDescription = result.data.topicByGidRes;
                        this.dialogInfoVisible = true
                    }
                    else{
                        this.$message.error(result.message)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },

            openDialogForm(){
                this.dialogFormVisible = true;
            },

            selectTopic(){
                Axios.post(`${this.$store.state.address}/mainservice/student/stuChooseTopic`,
                    Object.assign({gid: ''}, this.formData)).then(res => {
                    let result = res.data;
                    if(result.success){
                        this.$message({
                            message: result.message,
                            type: 'success'
                        });
                        this.dialogFormVisible = false;
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
            this.getAllTopics()
        }
    }
</script>

<style scoped>
    .tips-and-search{
        background-color: #F0F8FF;
        border-left: 5px solid #7AB8CC;
        padding-left: 5px;
        padding-top: 2px;
    }
    .main-box{

    }
    .tips{
        font-size: 12px;
        color: #625B57
    }

</style>