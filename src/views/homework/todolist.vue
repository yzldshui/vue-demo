<template>
  <div class="app-container">
    <el-row class="todo-txt">
      <el-col :span="8">
        <el-card class="item-all" shadow="hover">
          当前任务总数：{{ data.length }}
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="item-undone" shadow="hover">
          未完成任务数：{{ countUndone }}
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="item-doing" shadow="hover">
          进行中任务数：{{ countDoing }}
        </el-card>
      </el-col>
    </el-row>
    <todo-input @create="createTask"/>
    <el-table
      v-loading="listLoading"
      :data="data"
      element-loading-text="Loading"
      height="500"
      border
      fit>
      <el-table-column
        :index="index"
        type="index"/>
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
    <el-form style="margin-top: 20px;">
      <el-col :span="2" style="font-size: 14px;color: gray;text-align: center;">
        任务完成总进度：
      </el-col>
      <el-col :span="22">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="countDonePer"/>
      </el-col>
    </el-form>
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
          content: '扶老奶奶过马路！',
          status: 2
        },
        {
          content: '把钱交给警察叔叔！',
          status: 1
        },
        {
          content: '石室诗士施氏，嗜狮，誓食十狮。',
          status: 2
        },
        {
          content: '睡觉睡觉睡觉睡觉睡觉！',
          status: 0
        },
        {
          content: '西溪犀，喜嬉戏。席熙夕夕携犀徙，席熙细细习洗犀。',
          status: 0
        },
        {
          content: '工作工作工作工作工作工作工作工作工作工作！',
          status: 1
        }
      ]
    }
  },
  computed: {
    countUndone() {
      return this.data.filter(item => item.status < 2).length
    },
    countDoing() {
      return this.data.filter(item => item.status === 1).length
    },
    countDonePer() {
      return Number((((1 - this.countUndone / this.data.length) * 100).toFixed(2)))
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
      this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        rows.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    updateStatus(index) {
      if (this.data[index].status < 2) {
        this.data[index].status = (this.data[index].status + 1) % 3
      } else {
        this.$confirm('此操作将重新打开已完成的任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '重新打开成功!'
          })
          this.data[index].status = (this.data[index].status + 1) % 3
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }
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
    },
    index(index) {
      return index
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
    font-size: 14px;
    margin: 0px -10px 0px -10px;
    .item-all{
      color: #409eff;
      margin: 0px 10px;
    }
    .item-undone{
      color: gray;
      margin: 0px 10px;
    }
    .item-doing{
      color: orangered;
      margin: 0px 10px;
    }
  }
</style>
