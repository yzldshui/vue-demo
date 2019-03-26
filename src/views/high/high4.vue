<template>
  <div class="app-container">
    <div class="demo-b">
      <txt-component1 :show-number="data1" color="red"/>
      <txt-component2 :show-number="data2" color="red" @minus="handleMinus"/>
      <txt-component3 :show-number="data3" color="red"/>
      <el-button type="primary" @click="handleAdd">+100</el-button>
    </div>
  </div>
</template>

<script>
import txtComponent1 from './txt-component1'
import txtComponent2 from './txt-component2'
import txtComponent3 from './txt-component3'
export default {
  components: {
    txtComponent1,
    txtComponent2,
    txtComponent3
  },
  data() {
    return {
      data1: 100,
      data2: 100,
      data3: 100
    }
  },
  methods: {
    handleAdd() {
      this.data1 += 100
      this.data2 += 100
      this.data3 += 100
      this.data4 += 100
    },
    handleMinus(v) {
      this.data2 -= v
    }
  }
}
</script>

