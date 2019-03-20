<template>
  <div class="app-container">
    <div class="demo-b">
      <p :class="{active: isActive}" :style="{backgroundColor: color, width: '100px'}">txt</p>
      <p>active: {{ isActive }}</p>
      <button @click="handleClick">Change Color</button>
      <button @click="handleClick2">Change Background</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      color: 'white'
    }
  },
  methods: {
    handleClick() {
      this.isActive = !this.isActive
    },
    handleClick2() {
      if (this.color === 'grey') {
        this.color = 'white'
      } else {
        this.color = 'grey'
      }
    }
  }
}
</script>

<style lang="scss">
  .active {
    color: red;
  }
</style>

