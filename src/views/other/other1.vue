<template>
  <div class="app-container">
    <router-link to="/dashboard">
      <el-button type="primary">跳转至首页1</el-button>
    </router-link>
    <br><br>
    <el-button type="primary" @click="handleJumpHome">跳转至首页2</el-button>
    <br><br>
    <el-button type="primary" @click="handlePre">跳转至上一页</el-button>
    <br><br>
    <el-button type="primary" @click="handleJumpPara1">带参跳转1</el-button>
    <br><br>
    <el-button type="primary" @click="handleJumpPara2">带参跳转2</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    handleJumpHome() {
      this.$router.push('/dashboard')
    },
    handlePre() {
      this.$router.go(-1)
    },
    handleJumpPara1() {
      this.$router.push({ path: '/other/o11', query: { id: '100' }})
    },
    handleJumpPara2() {
      this.$router.push({ name: 'o11', params: { id: '200' }})
    }
  }
}
</script>
