<template>
  <div class="app-container">
    <search-area>
      <div slot="header">Header</div>
      <div>Body</div>
      <div slot="footer">Footer</div>
    </search-area>
  </div>
</template>

<script>
import SearchArea from './SearchArea.vue'
export default {
  components: {
    SearchArea
  },
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
