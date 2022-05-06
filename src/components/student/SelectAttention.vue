<template>
    <div class="main-box">
        <div class="tips">
            <p class="tips-important">
                （一）毕业设计（论文）选题后，学生本人须在选课系统里选择毕业设计（论文）课程，选课开通具体时间以教务网通知为准。
            </p>
            <p>
                （二）选题时间由各学院确定并自行关闭网上选题通道；
            </p>
            <p>
                （三）每个同学可以最多提交三个选题志愿，教师通过网络选择合适的学生，一旦选题被确认，其他志愿自动无效；
            </p>
            <p>
                （四）经过同学与教师的相互选题过程后，如仍有部分申请未满足则由学院进行选题调度；
            </p>
            <p>
                （五）建议您在提交志愿之前应仔细了解题目要求，尽可能的与指导教师联系然后提交申请志愿
            </p>
            <p>
                （六）每个同学是否具备选题资格由学院负责审核，具体请咨询学院
            </p>
            <p>
                （七）原则上只能选择本学院的毕业设计题目，如需选择其他学院毕业设计题目请经学院允许后通过学院统一调配
            </p>
        </div>
        <el-divider border-style="dashed" />
        <h3 class="mid-title">学校总体安排</h3>
        <div class="stage">
            <p class="stage-item">
                第一阶段：教师上报题目（学校时间：2021-11-19至2021-12-31）
            </p>
            <p class="stage-item">
                第二阶段：毕业设计论文选题（学校时间：2021-12-13至2022-12-31）
            </p>
            <p class="stage-item">
                第三阶段：毕业设计论文中期检查（学校时间：2022-04-06至2022-04-15）
            </p>
            <p class="stage-item">
                第四阶段：毕业设计论文上传（学校时间：2022-5-16至2022-05-30）
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SelectAttention"
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
    .tips-important{
        font-size: 13px;
        color:#CD5C5C;
        font-weight: bold;
    }
    .stage{
        font-size: 13px;
    }
    .stage-item{
        margin-bottom: 20px;
    }
</style>