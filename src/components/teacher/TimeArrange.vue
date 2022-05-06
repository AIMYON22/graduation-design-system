<template>
    <div class="main-box">
        <div class="tips"></div>
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
        name: "TimeArrange"
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
        color: #625B57;
        height: 40px;
    }
    .stage{
        font-size: 13px;
    }
    .stage-item{
        margin-bottom: 20px;
    }
</style>