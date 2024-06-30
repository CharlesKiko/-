import { ref, reactive, onMounted, inject, onUnmounted } from 'vue'
import type { FormInstance } from 'element-plus'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { type ElUpload, type UploadFile } from 'element-plus'
export default function () {
    let show = ref(true);
    const userInfo = reactive({
        userName: '',
        tel: '',
        email: '',
        department: '',
        role: '',
        date: '',
        imageUrl: ''
    })
    const act = inject<any>('action');
    const userRef = ref<FormInstance>()
    const user = reactive({
        id: '',
        nickName: '',
        imgUrl: '',
        tel: '',
        email: '',
        gender: ''
    })
    const rules = reactive({
        nickName: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
        tel: [{ required: true, message: '手机号码不能为空', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        gender: [{ required: true, message: '性别不能为空', trigger: 'change' }],
    })
    function load() {
        axios.post("http://localhost:8080/user/loadMyself").then(res => {
            if (res.data.isOk) {
                userInfo.imageUrl=res.data.user.imageUrl;
                userInfo.userName = res.data.user.userName;
                userInfo.tel = res.data.user.phoneNumber;
                userInfo.email = res.data.user.email;
                userInfo.department = res.data.user.department;
                userInfo.role = res.data.userName == "admin" ? "超级管理员" : "租户管理员";
                userInfo.date = res.data.user.date;
                //表单
                user.id = res.data.user.id
                if (res.data.user.nickName == null) {
                    user.nickName = res.data.user.userName
                } else {
                    user.nickName = res.data.user.nickName
                }
                user.tel = res.data.user.phoneNumber
                user.email = res.data.user.email
                if (res.data.user.gender == null) {
                    user.gender = 'man'
                } else {
                    user.gender = res.data.user.gender
                }
                ElMessage.success(res.data.msg);
            } else {
                ElMessage.error(res.data.msg);
            }

        });
    }
    onMounted(() => {
        console.log(inject<any>('action'))
        axios.post("http://localhost:8080/user/loadMyself").then(res => {
            if (res.data.isOk) {
                userInfo.imageUrl=res.data.user.imageUrl;
         
                userInfo.userName = res.data.user.userName;
                userInfo.tel = res.data.user.phoneNumber;
                userInfo.email = res.data.user.email;
                userInfo.department = res.data.user.department;
                userInfo.role = res.data.user.userName === "admin" ? "超级管理员" : "租户管理员";
                userInfo.date = res.data.user.date;
                //表单
                user.id = res.data.user.id

                if (res.data.user.nickName == null) {
                    user.nickName = res.data.user.userName
                } else {
                    user.nickName = res.data.user.nickName
                }
                user.tel = res.data.user.phoneNumber
                user.email = res.data.user.email
                if (res.data.user.gender == null) {
                    user.gender = 'man'
                } else {
                    user.gender = res.data.user.gender
                }
                ElMessage.success(res.data.msg);
            } else {
                ElMessage.error(res.data.msg);
            }

        });
    })

    const save = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate((valid) => {
            if (valid) {
                let fd = new FormData();
                fd.append('id', user.id);
                fd.append('nickName', user.nickName)
                fd.append('phoneNumber', user.tel)
                fd.append('email', user.email)
                fd.append('gender', user.gender)
                axios.post('http://localhost:8080/user/updateUser', fd).then(res => {
                    if (res.data.isOk) {
                        ElMessage.success(res.data.msg);
                        load();
                    } else {
                        ElMessage.error(res.data.msg);
                    }
                })
            } else {
                ElMessage({
                    message: '请输入完整的信息！',
                    type: 'error'
                })

            }
        })
    }
    let firstButtonType = ref<string>("primary")
    let secondButtonType = ref<string>("")

    function lookSelfIntro() {
        show.value = true;
        router.push("/home/myself")
        firstButtonType.value = "primary"
        secondButtonType.value = ""
    }
    function changePassword() {
        show.value = false;

        router.push("/home/myself/change")
        firstButtonType.value = ""
        secondButtonType.value = "primary"
    }
    //修改头像
    const dialogFormVisible = ref(false)
    const fileList = ref([]);
    const dialogImageUrl = ref('');
    const dialogVisible1 = ref(false);
    function openForm() {
        dialogFormVisible.value = true
    }
    function beforeUploadImage(file: any) {
        console.log("file.size", file.size);
        //文件大小
        const isLt5M = file.size / 1024 / 1024 < 5
        //视频后缀检查
        if (['image/jpeg', 'image/png', 'image/jpg'].indexOf(file.type) === -1) {
            ElMessage.error('请上传正确的图片格式')
            return false
        }
        if (!isLt5M) {
            ElMessage.error('上传视频大小不能超过5MB哦!')
            return false
        }
    }
    const UploadImage = (res: any, file: any) => {
        if (res.resCode === '200') {
            console.log(res.ImageUrl)
            user.imgUrl = res.ImageUrl
            ElMessage.success('图片上传成功！')
        } else {
            ElMessage.error('图片上传失败，请重新上传！')
        }
    };
    const handleRemove = (file: any, fileList: any) => {
        console.log(file, fileList);
    };

    const handlePictureCardPreview = (file: UploadFile) => {
        console.log(file.url);
        dialogVisible1.value = true;
        dialogImageUrl.value = file.url!
    };
    const uploadImageRef = ref<InstanceType<typeof ElUpload> | null>(null);
    function reset1() {
        uploadImageRef.value!.clearFiles(); //清除文件列表
    }
    function close() {
        reset1()
    }
    //结束修改头像
    const back = () => {
        act.value = "1"
        console.log(act.value)
        router.push("/home/main")
    };
    function modifyImage() {
        console.log(user.imgUrl)
        let fd = new FormData();
        fd.append('id', user.id);
        fd.append('imageUrl', user.imgUrl)
        axios.post('http://localhost:8080/user/updateImage', fd).then(res => {
            if (res.data.isOk) {
                dialogFormVisible.value = false
                ElMessage.success(res.data.msg);
                load();
            } else {
                ElMessage.error(res.data.msg);
            }
        })
    }
    return {
            firstButtonType,
            secondButtonType,
            lookSelfIntro,
            changePassword,
            openForm,
            save,
            user,
            rules,
            userInfo,
            userRef,
            show,
            back,
            dialogFormVisible,
            fileList,
            dialogImageUrl,
            dialogVisible1,
            beforeUploadImage,
            UploadImage,
            handleRemove,
            handlePictureCardPreview,
            uploadImageRef,
            close,
            modifyImage
        }
    }