<template>
  <div class="app-container">
    <button @click="showImage=!showImage">show image</button>
    <div v-if="showImage" class="image-con">
      <img src="./lifecycle.png" alt="">
    </div>
    <div v-else class="demo-b">
      <p v-for="p in data" :key="p">I am {{ p }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      showImage: false
    }
  },
  beforeCreate() {
    // this.data.push('beforeCreate')
    console.log('beforeCreate')
  },
  created() {
    this.data.push('created')
    console.log('created')
  },
  beforeMount() {
    this.data.push('beforeMount')
    console.log('beforeMount')
  },
  mounted() {
    this.data.push('mounted')
    console.log('mounted')
  },
  beforeDestroy() {
    this.data.push('beforeDestroy')
    console.log('beforeDestroy')
  },
  destroyed() {
    this.data.push('destroyed')
    console.log('destroyed')
  }
}
</script>

<style lang="scss">
  // .image-con {
  //   // height: 800px;
  // }
</style>

