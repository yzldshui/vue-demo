<template>
  <div :style="{color: color}">
    <h1>
      {{ number }}
      <el-button type="ghost" @click="handleMinus">-100</el-button>
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'black'
    },
    showNumber: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      number: 0
    }
  },
  mounted() {
    this.number = this.showNumber
  },
  methods: {
    handleMinus() {
      this.number -= 100
    }
  }
}
</script>

