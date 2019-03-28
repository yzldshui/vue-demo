<template>
  <div>
    <el-form>
      <el-form-item label="我的任务">
        <el-input v-model="newItem" placeholder="做点啥好呢？"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createItem(newItem)">创建任务</el-button>
        <el-button @click="emptyItem">清空输入</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    newItem: {
      type: String,
      default: ''
    }
  },
  methods: {
    createItem(newItem) {
      this.newItem = ''
      this.$emit('create', newItem)
    },
    emptyItem() {
      this.newItem = ''
    }
  }
}
</script>
