<template>
  <div class="app-container">
    欢迎脚泥老师大驾光临
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

