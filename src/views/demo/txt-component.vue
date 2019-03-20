<template>
  <div :style="{color: color}">
    {{ data }}
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'black'
    }
  },
  data() {
    return {
      data: ''
    }
  },
  mounted() {
    this.data = Math.random()
  }
}
</script>

