//引入createRouter
import { createRouter, createWebHistory } from "vue-router"
//引入组件
import Login from "../view/login.vue";
import Register from "../view/register.vue";
import Home from "../view/home.vue"
import Myself from "../view/myself.vue"
import Main from "../view/main.vue"
import ChangePwd from "@/components/changePwd.vue";
import Course from "../view/course.vue";
//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'login',
            path: '/',
            component: Login
        },

        {
            name: 'register',
            path: '/register',
            component: Register
        },
        {
            name: 'home',
            path: '/home',
            component: Home,
            children: [{
                name: 'main',
                path: 'main',
                component: Main
            },
            {
                name: 'course',
                path: 'course',
                component: Course
            },
            {
                name: 'myself',
                path: 'myself',
                component: Myself,
                children: [{
                    name: 'change',
                    path: 'change',
                    component: ChangePwd
                },
                ]
            },

            ]


        }

    ],
})
export default router;