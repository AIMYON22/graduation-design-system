import { createRouter, createWebHistory } from 'vue-router'
import HomeStudent from "@/pages/HomeStudent";
import TopicSubmit from "@/components/student/TopicSubmit";
import MyTopic from "@/components/student/MyTopic";
import MidSubmit from "@/components/student/MidSubmit";
import AdviceView from "@/components/student/AdviceView";
import PaperSubmit from "@/components/student/PaperSubmit";
import PaperGrade from "@/components/student/PaperGrade";
import SelectAttention from "@/components/student/SelectAttention";
import UserLogin from "@/pages/UserLogin";
import HomeTeacher from "@/pages/HomeTeacher";
import AddTopic from "@/components/teacher/AddTopic";
import AllTopic from "@/components/teacher/AllTopic";
import MidCheck from "@/components/teacher/MidCheck";
import SelectStudent from "@/components/teacher/SelectStudent";
import TimeArrange from "@/components/teacher/TimeArrange";
import TimeSubmit from "@/components/teacher/TimeSubmit";
import TopicControl from "@/components/teacher/TopicControl";
import HomeAdmin from "@/pages/HomeAdmin";
import AddCache from "@/components/admin/AddCache";
import MidCheckAdmin from "@/components/admin/MidCheckAdmin";
import AllTopicAdmin from "@/components/admin/AllTopicAdmin";
import UserRegister from "@/pages/UserRegister";
import ViewGuidance from "@/components/teacher/ViewGuidance";
import ViewPaper from "@/components/teacher/ViewPaper";
import FinalGrade from "@/components/teacher/FinalGrade";
import ViewResult from "@/components/teacher/ViewResult";

const routes = [
    {
        path: '/home-student',
        component: HomeStudent,
        children:[
            {
              path: 'select-attention',
              component: SelectAttention
            },
            {
                path: 'topic-submit',
                component: TopicSubmit
            },
            {
                path: 'my-topic',
                component: MyTopic
            },
            {
                path: 'mid-submit',
                component: MidSubmit
            },
            {
                path: 'advice-view',
                component: AdviceView
            },
            {
                path: 'paper-submit',
                component: PaperSubmit
            },
            {
                path: 'paper-grade',
                component: PaperGrade
            },
            {
                path: '/home-student',
                redirect: '/home-student/select-attention'
            }
        ]
    },
    {
        path: '/home-teacher',
        component: HomeTeacher,
        children: [
            {
                path: 'add-topic',
                component: AddTopic
            },
            {
                path: 'all-topic',
                component: AllTopic
            },
            {
                path: 'mid-check',
                component: MidCheck
            },
            {
                path: 'select-student',
                component: SelectStudent
            },
            {
                path: 'time-arrange',
                component: TimeArrange
            },
            {
                path: 'time-submit',
                component: TimeSubmit
            },
            {
                path: 'topic-control',
                component: TopicControl
            },
            {
                path: 'view-guidance',
                component: ViewGuidance
            },
            {
                path: 'view-paper',
                component: ViewPaper
            },
            {
                path: 'final-grade',
                component: FinalGrade
            },
            {
                path: 'view-result',
                component: ViewResult
            },
            {
                path: '/home-teacher',
                redirect: '/home-teacher/time-arrange'
            }
        ]
    },
    {
        path: '/home-admin',
        component: HomeAdmin,
        children: [
            {
                path: 'all-topic-admin',
                component: AllTopicAdmin
            },{
                path: 'mid-check-admin',
                component: MidCheckAdmin
            },{
                path: 'add-cache',
                component: AddCache
            }, {
                path: '/home-admin',
                redirect: '/home-admin/all-topic-admin'
            }

        ]
    },
    {
        path: '/login',
        component: UserLogin
    },
    {
        path: '/register',
        component: UserRegister
    },
    {
        path: '/',
        redirect: '/login'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
