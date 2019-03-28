<template>
  <div class="app-container">
    <todo-input @create="createTask"/>
    <el-table
      v-loading="listLoading"
      :data="data"
      element-loading-text="Loading"
      border
      fit>
      <el-table-column prop="content" label="任务" min.width="500"/>
      <el-table-column class-name="status-col" label="状态" width="200" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span :class="getItemClass(scope.row.status)" style="margin-left: 10px">{{ scope.row.status | statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button size="small" @click.native.prevent="updateStatus(scope.$index)">{{ scope.row.status | statusFilterButton }}</el-button>
          <el-button type="primary" size="small" @click.native.prevent="deleteRow(scope.$index, data)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="todo-txt">
      当前任务总数：{{ data.length }}
    </div>
  </div>

</template>

<script>
import todoInput from './input'
export default {
  components: {
    todoInput
  },
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
    },
    statusFilterButton(status) {
      if (status === 0) {
        return '开始任务'
      } else if (status === 1) {
        return '完成任务'
      } else if (status === 2) {
        return '重新打开'
      } else {
        return ''
      }
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      newTask: '',
      data: [
        {
          content: '扶老奶奶过马路',
          status: 0
        },
        {
          content: '把钱交给警察叔叔',
          status: 1
        },
        {
          content: '吃饭吃饭吃饭吃饭吃饭吃饭',
          status: 0
        },
        {
          content: '睡觉睡觉睡觉睡觉睡觉',
          status: 0
        },
        {
          content: '工作工作工作工作工作工作',
          status: 2
        }
      ]
    }
  },
  beforeCreate() {
    this.listLoading = true
  },
  mounted() {
    setTimeout(() => {
      this.listLoading = false
    }, 500)
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    updateStatus(index) {
      this.data[index].status = (this.data[index].status + 1) % 3
    },
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
    createTask(v) {
      if (v) {
        this.data.push({ content: v, status: 0 })
      }
    }
  }
}
</script>
<style lang="scss">
  .todo-item {
    line-height: 34px;
  }
  .item-undo {
    color: gray;
  }
  .item-doing {
    color: orangered;
  }
  .item-done {
    color: green;
  }
  .todo-txt {
    color: #409eff;
    font-size: 14px;
    margin: 20px 0px 0px 12px;
  }
</style>
