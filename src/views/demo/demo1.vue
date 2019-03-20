<template>
  <div class="app-container">
    <!-- data1 -->
    <div class="demo-b">
      <p>{{ data1 }}</p>
      <input v-model="data1" type="text">
    </div>
    <!-- data2 -->
    <div class="demo-b">
      <p v-if="flag2">{{ data2 }}</p>
      <button @click="flag2=!flag2">Click me</button>
    </div>
    <!-- data3 -->
    <div class="demo-b">
      <p v-for="data in data3" :key="data">{{ data }}</p>
    </div>
    <!-- data4 -->
    <div class="demo-b">
      <p>{{ data4 }}</p>
      <button @click="handleData4">Click me</button>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      data1: 'Hello World!',
      data2: 'Hello Vue!',
      flag2: true,
      data3: ['Tom', 'Sam', 'Arm'],
      data4: 'Hello Css!'
    }
  },
  methods: {
    handleData4() {
      this.data4 = this.data4.split('').reverse().join('')
    }
  }
}
</script>
