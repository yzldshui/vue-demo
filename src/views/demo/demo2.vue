<template>
  <div class="app-container">
    欢迎脚泥老师大驾光临
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
      data5: [
        { value: true }
      ]
    }
  },
  methods: {
    handleClick() {
      const flag = this.data5[0].value
      // 1
      this.data5[0] = { value: !flag }
      // 2
      // this.$set(this.data5, 0, { value: !flag })
      // 3
      // this.data5[0].value = !flag
    }
  }
}
</script>

