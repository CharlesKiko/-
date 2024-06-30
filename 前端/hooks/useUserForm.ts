import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
export default function () {
    const userFormRef = ref<FormInstance>()
    const userForm = reactive({
        userName: '',
        password: ''
    })
    const rules = reactive({
        userName: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
    })
    const login = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate((valid) => {
            if (valid) {
                let fd = new FormData();
                fd.append('userName', userForm.userName);
                fd.append('password', userForm.password);
                axios.post('http://localhost:8080/user/login', fd).then(res => {
                    if (res.data.isOk) {
                        ElMessage.success(res.data.msg);
                        router.push('/home/main')
                    } else {
                        ElMessage.error(res.data.msg);
                    }
                })
            } else {
                ElMessage({
                    message: '请输入完整的账号密码！',
                    type: 'error'
                })

            }
        })
    }
    function register() {
        router.push('/register')
    }
    return { userFormRef, userForm, rules, login, register }
}