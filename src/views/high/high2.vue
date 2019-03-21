<template>
  <div class="app-container">
    <!-- data1 -->
    <div class="demo-b">
      <p>{{ data1 }}</p>
      <input v-model="data1" type="text">
      <p>------------------------------------------------------------</p>
      <div v-for="d in data2" :key="d.old">
        <p style="width: 200px; display: inline-block;">{{ d.old }}</p>
        <p style="display: inline-block;">{{ d.new }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      data1: 'Hello World!',
      data2: []
    }
  },
  watch: {
    data1(newValue, oldValue) {
      console.log(oldValue, newValue)
      this.data2.push({ old: oldValue, new: newValue })
    }
  }
}
</script>
