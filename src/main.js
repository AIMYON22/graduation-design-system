import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import {createStore} from "vuex";

const store = createStore({
    state(){
        return{
            user:{
                personType: '',
                name: '',
                number: '',
                academy: ''
            },
            address: 'http://192.168.10.103:8080'
        }
    },
    mutations:{
        commitUser(state, user){
            state.user.personType = user.personType;
            state.user.name = user.name;
            state.user.number = user.number;
            state.user.academy = user.academy;
        }
    }
})

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(store);
app.config.globalProperties.$axios = axios;
require('./mock');

app.mount('#app');
