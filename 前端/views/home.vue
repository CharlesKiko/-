<template>
    <div id="myself">
        <el-container>
            <el-header class="header">
                <div
                    style="width:100%; font-style: italic;display: flex; justify-content:space-between;align-items: center;">
                    <span>测盟汇管理系统</span>
                    <el-button type="primary" @click="exit()">退出</el-button>
                </div>
            </el-header>
            <el-container>
                <el-aside class="aside" width="200px"> <!-- 设置侧边栏背景为黑色 -->
                    <el-menu active-text-color="#ffd04b" background-color="#444655" text-color="#fff" @select="MenuSelect"
                        :default-active="act">
                        <el-menu-item index="1" @click="goMain()">
                            <el-icon>
                                <House />
                            </el-icon>
                            <span slot="title">主页</span>
                        </el-menu-item>
                        <el-menu-item index="2" @click="goDetail()">
                            <el-icon>
                                <User />
                            </el-icon>
                            <span slot="title">个人中心</span>
                        </el-menu-item>
                        <el-menu-item index="3" @click="goCourse()">

                            <el-icon>
                                <DataBoard />
                            </el-icon>
                            <span slot="title">课程管理</span>

                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>

            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts">
export default {
    name: 'home'
}
</script>

<script lang="ts" setup>
import { House, User } from '@element-plus/icons-vue';
import { RouterView } from 'vue-router';
import useHome from '../hooks/useHome';
import { DataBoard } from '@element-plus/icons-vue';
const { act,exit, goMain, goDetail, goCourse, MenuSelect} = useHome();
</script>

<style scoped>
.header {
    display: flex;
    height: 50px;
    color: #ffffff;
    font-size: 30px;
    background-color: #474953
}


.aside {
    height: 100vh;
    background-color: #474953
}
</style>