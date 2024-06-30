import { ref, reactive, provide, onMounted, watchEffect } from 'vue'
import router from '@/router'
import { ElMessage, type FormProps } from 'element-plus'
import axios from 'axios';
export default function () {

    const act = ref(localStorage.getItem('active') || '1'); // 初始化为localStorage中的值或默认为1
    function MenuSelect(index: any, path: any) {
        console.log(index, path);
        act.value = index;
        localStorage.setItem('active', index);
    }
    watchEffect(() => {
        const storedActive = localStorage.getItem('active');
        if (storedActive !== null) {
            act.value = storedActive;
        }
    });
    provide('action', act);
    function exit() {
        if (confirm("确定退出吗？")) {
            localStorage.clear();
            axios.post("http://localhost:8080/user/exit").then(res => {
                if (res.data.isOk) {
                    ElMessage.success(res.data.msg);
                }
            }
            )
            router.push('/');
        }
    }

    function goMain() {
        act.value = '1';
        router.push({
            name: 'main'
        });
    }
    function goDetail() {
        act.value = '2';
        router.push({
            name: 'myself'

        });
    }
    function goCourse() {
        act.value = '3';
        router.push({
            name: 'course'

        });
    }



    return {
        act,
        exit,
        goMain,
        goDetail,
        goCourse,
        MenuSelect

    }
}
