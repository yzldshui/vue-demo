<template>
  <div class="todo-item">
    <div :class="getItemClass(data.status)">
      <span>{{ data.content }}</span>
      <el-button size="mini" @click="handleDelete">×</el-button>
      <el-button size="mini" @click="handleUpdate">{{ data.status | statusFilter }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    statusFilter(status) {
      if (status === 0) {
        return '未开始'
      } else if (status === 1) {
        return '进行中'
      } else if (status === 2) {
        return '已完成'
      } else {
        return ''
      }
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {
    itemClass() {
      return this.data.status
    }
  },
  methods: {
    getItemClass(status) {
      if (status === 0) {
        return 'item-undo'
      } else if (status === 1) {
        return 'item-doing'
      } else if (status === 2) {
        return 'item-done'
      } else {
        return ''
      }
    },
    handleUpdate() {
      this.data.status = (this.data.status + 1) % 3
    },
    handleDelete() {
      this.$emit('delete')
    }
  }
}
</script>

<style lang="scss">
  .todo-item {
    line-height: 34px;
  }
  .item-undo {
    color: blue;
  }
  .item-doing {
    color: orange;
  }
  .item-done {
    color: lightgrey;
  }
</style>

