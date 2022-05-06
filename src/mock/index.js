// import Mock from 'mockjs'
//
// const loginData = {
//     "success":true,
//     "code":20000,
//     "message":"成功",
//     "data":{
//         "loginRes":{
//             "success":true,
//             "message":"登陆成功!",
//             "personType":"学生",
//             "name":"学生1",
//             "number":"2018112005",
//             "academy":"计算机"
//         }
//     }
// }
//
// Mock.mock(`http://192.168.10.103:4523/mock/869489/login`, 'post', function (options) {
//     let transData = JSON.parse(options.body)
//     if(transData.account === "2018112005" && transData.password === '1234'){
//         return loginData;
//     }
//     else {
//         return false
//     }
// })
//
// export default Mock