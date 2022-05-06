<template>
    <div class="main-box">
        <div class="tips">
            <p>
                网上选题申请说明：
            </p>
            <p>
                1、每个同学最多可以提交3个申请，一旦有一个题目申请被满足，其他申请自动废除；
            </p>
            <p>
                2、如果您已提交了3个申请，重新选择其他题目请必须先删除申请再提交；
            </p>
            <p>
                3、我们建议您选提前尽可能的与指导老师联系，以便于指导教师了解你的情况
            </p>
            <p>
                4、如果您有业务流程的问题请咨询教务部门。
            </p>
        </div>
        <el-divider border-style="dashed" />
        <div class="voluntary" v-for="(item, index) in topicData" :key="item.sid">
            <div class="voluntary-item">
                <h4 class="title">【申请志愿{{index + 1}}】</h4>
                <div class="description">
                    <el-row class="description-item">
                        <el-col :span="2">
                            编号：
                        </el-col>
                        <el-col :span="22">
                            {{item.sid}}
                        </el-col>
                    </el-row>
                    <el-row class="description-item">
                        <el-col :span="2">
                            标题：
                        </el-col>
                        <el-col :span="22">
                            {{item.gtopic}}
                        </el-col>
                    </el-row>
                    <el-row class="description-item">
                        <el-col :span="2">
                            学生姓名：
                        </el-col>
                        <el-col :span="22">
                            {{item.stuName}}
                        </el-col>
                    </el-row>
                    <el-row class="description-item">
                        <el-col :span="2">
                            学生学号：
                        </el-col>
                        <el-col :span="22">
                            {{item.stuNumber}}
                        </el-col>
                    </el-row>
                    <el-row class="description-item">
                        <el-col :span="2">
                            邮箱：
                        </el-col>
                        <el-col :span="22">
                            {{item.contactInfor}}
                        </el-col>
                    </el-row>
                    <el-row class="description-item">
                        <el-col :span="2">
                            申请留言：
                        </el-col>
                        <el-col :span="22" class="description-item">
                            {{item.selectMessage}}
                        </el-col>
                    </el-row>
                    <el-row class="description-item">
                        <el-col :span="2">
                            申请时间：
                        </el-col>
                        <el-col :span="22">
                            {{item.selectTime}}
                        </el-col>
                    </el-row>
                    <el-row class="description-item">
                        <el-col :span="2">
                            申请状态：
                        </el-col>
                        <el-col :span="22">
                            <el-tag v-if="item.processState === 0">未处理</el-tag>
                            <el-tag v-else-if="item.processState === 1" type="success">选择成功</el-tag>
                            <el-tag v-else-if="item.processState === 2" type="danger">落选</el-tag>
                            <el-tag v-else-if="item.processState === 3" type="info">废弃的申请</el-tag>
                            <el-tag v-else type="warning">出错了</el-tag>
                        </el-col>
                    </el-row>
                    <el-button type="primary" @click="deleteData(item.sid)" size="small">删除申请</el-button>
                </div>
            </div>
            <el-divider />
        </div>
    </div>
</template>

<script>
    import Axios from "axios";

    export default {
        name: "MyTopic",
        data(){
            return{
                topicData:[]
            }
        },
        methods:{
            getData(){
                Axios.post(`${this.$store.state.address}/mainservice/student/stuLookChooseTopic`,
                    {stuNumber: this.$store.state.user.number}).then(res => {
                    let result = res.data;
                    if(result.success){
                        this.topicData = [];
                        this.topicData = result.data.stuLookChooseTopicList;
                    }
                    else{
                        this.$message.error(result.message)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            deleteData(id){
                Axios.post(`${this.$store.state.address}/mainservice/student/stuDeleteChooseTopic`,
                    {sid: id}).then(res => {
                    let result = res.data;
                    if(result.success){
                        this.$message({
                            message: result.success,
                            type: 'success'
                        })
                        this.getData()
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
            this.getData()
        }
    }
</script>

<style scoped>
    .main-box{

    }
    .tips{
        background-color: #F0F8FF;
        border-left: 5px solid #7AB8CC;
        padding-left: 5px;
        padding-top: 2px;
        padding-bottom: 2px;
        font-size: 12px;
        color: #625B57
    }
    .title{
        background-color: #E0FFFF;
        color: #4798B3;
        padding-top: 2px;
        padding-bottom: 2px;
    }
    .description-item{
        margin-bottom: 10px;
        font-size: 14px;
    }
</style>