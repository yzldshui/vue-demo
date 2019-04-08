<template>
  <div>
    <el-form style="margin-top: 20px;">
      <el-col :span="16">
        <el-form-item >
          <el-input v-model="newItem" placeholder="再做点啥好呢？"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item style="float:right">
          <el-button type="primary" @click="createItem(newItem)">创建</el-button>
          <el-button @click="emptyItem">清空输入</el-button>
        </el-form-item>
      </el-col>
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
