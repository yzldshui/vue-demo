<template>
  <div class="app-container">
    <!-- data1 -->
    <div class="demo-b">
      <p>局部过滤器</p>
      <p>{{ data1 }}</p>
      <p>{{ data1 | filter1 }}</p>
      <input v-model="data1" type="text">
    </div>
    <!-- data2 -->
    <div class="demo-b">
      <p>全局过滤器</p>
      <p>{{ data2 }}</p>
      <p>{{ data2 | gFilter }}</p>
      <input v-model="data2" type="text">
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    filter1(v) {
      if (v === 'a') {
        return 'apple'
      } else {
        return 'banana'
      }
    }
  },
  data() {
    return {
      data1: 'a',
      data2: 'b'
    }
  }
}
</script>
