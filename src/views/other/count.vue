<template>
  <div class="app-container">
    {{ count }}
    <br>
    <br>
    <el-button type="goust" @click="handleAdd">+</el-button>
    <el-button type="goust" @click="handleMinus">-</el-button>
  </div>
</template>

<script>
import count from './count'
export default {
  components: {
    count
  },
  computed: {
    count() {
      return this.$store.state.count.count
    }
  },
  methods: {
    handleAdd() {
      this.$store.commit('ADD')
    },
    handleMinus() {
      this.$store.commit('MINUS')
    }
  }
}
</script>
