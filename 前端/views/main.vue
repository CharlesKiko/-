<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <button @click="changeMessage">Change Message</button>
  </div>
</template>

<script lang="ts">
import { onMounted, ref ,inject} from 'vue';
import router from '@/router';
export default {
  
  setup() {
    
    const message = ref('Hello Vue 3!');

    function changeMessage() {
      message.value = 'Message changed!';
    }

    return {
      message,
      changeMessage,
    };
  },
};
</script>

<style scoped>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>