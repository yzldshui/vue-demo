<style>
  .marginTop{
    margin-top: 15px
  }
  .active{
    color: red
  }
</style>

<template>
  <div class="marginTop">
    <el-row :gutter="10">
      <el-col :span="7">
        <div>{{ index + 1 }}、{{ data }}</div>
      </el-col>
      <el-col :span="7">
        <div>
          <el-button type="{primary: status}" @click="changeStatus">{{ statusWord }}</el-button>
          <i class="el-icon-delete" @click="removeTodo"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 1
    },
    data: {
      type: String,
      default: ''
    },
    unfinishedCount: {
      type: Number,
      default: 0
    },
    finishedCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      status: false,
      statusWord: '待办',
      unfinishedCount1: this.unfinishedCount,
      finishedCount1: this.finishedCount
    }
  },
  methods: {
    removeTodo() {
      this.$emit('delete', this.index)
    },
    changeStatus() {
      if (!this.status) {
        this.statusWord = '已完成'
      } else {
        this.statusWord = '待办'
      }
      this.status = !this.status
    }
  }
}
</script>
