<template>
  <div class="app-container">
    <div class="demo-b">
      <p>{{ data1 }}</p>
    </div>
    <div class="demo-b">
      <p>{{ data2 }}</p>
      <p>{{ data2[0] }}</p>
    </div>
    <div class="demo-b">
      <p>{{ data3 }}</p>
      <p>{{ data3.key }}</p>
    </div>
    <div class="demo-b">
      <p>{{ data4 }}</p>
      <p>{{ data4[0] }}</p>
      <p>{{ data4[0].key }}</p>
    </div>
    <div class="demo-b">
      <p>{{ data5 }}</p>
      <p>{{ data5.Fujian[0].key }}</p>
      <button @click="handleClick">CLick me</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data1: 'Hellow 123',
      data2: ['1', '2', '3'],
      data3: { key: '001', value: 'Beijing' },
      data4: [
        { key: '001', value: 'Beijing' },
        { key: '002', value: 'Shanghai' },
        { key: '003', value: 'Xiamen' }
      ],
      data5: {
        'Fujian': [
          { key: '001', value: 'Fuzhou' },
          { key: '002', value: 'Quanzhou' },
          { key: '003', value: 'Xiamen' }
        ],
        'Guangdong': [
          { key: '001', value: 'Shantou' },
          { key: '002', value: 'Shenzhen' },
          { key: '003', value: 'Guangzhou' }
        ]
      }
    }
  },
  methods: {
    handleClick() {
      this.data5.Fujian[0].key = '100'
    }
  }
}
</script>

