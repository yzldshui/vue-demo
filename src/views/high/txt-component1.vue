<template>
  <div :style="{color: color}">
    <h1>
      {{ showNumber }}
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
  methods: {
    handleMinus() {
      this.showNumber -= 100
    }
  }
}
</script>

