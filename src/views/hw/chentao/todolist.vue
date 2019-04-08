<template>
  <div>
    <div class="demo-b">
      <ul style="list-style-type:none">
        <li v-for="item in datalist" :key="item">
          <span :style="{color:toColor(item.status)}">{{ item.name }}</span>
          <el-button @click="deleteOne(item.name)"> x </el-button ><el-button :disabled="item.status>2" @click="changeStatus(item.name)">{{ item.status | filter1 }} </el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    filter1(v) {
      if (v === 1) {
        return '未开始'
      } else if (v === 2) {
        return '进行中'
      } else if (v > 2) {
        return '已完成'
      }
    }
  },
  props: {
    datalist: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    deleteOne(name) {
      this.$emit('del', name)
    },
    changeStatus(name) {
      this.$emit('changeS', name)
    },
    toColor(status) {
      if (status === 1) {
        return 'red'
      } else if (status === 2) {
        return 'orange'
      } else if (status > 2) {
        return 'green'
      }
    }
  }
}
</script>
