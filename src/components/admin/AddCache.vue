<template>
    <div class="main-box">
        <el-button type="primary" @click="addCache" color="#7AB8CC">添加缓存</el-button>
    </div>

</template>

<script>
    import Axios from 'axios'
    export default {
        name: "AddCache",
        methods:{
            addCache(){
                Axios.post(`${this.$store.state.address}/mainservice/g-leader/addRedis`,
                    {academy: this.$store.state.user.academy}
                ).then(res => {
                    console.log(res)
                    let result = res.data;
                    if(result.success){
                        this.$message({
                            message: result.message,
                            type: 'success'
                        })
                    }
                    else{
                        this.$message.error('请求失败')
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>