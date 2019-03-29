<template>
  <div class="app-container">
    <div class="demo-b">
      <el-row>
        <el-col :span="24">
          <div>Todo List</div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="7">
          <div>
            <el-input v-model="todo" type="text" placeholder="请输入内容" class="todo-input"/>
          </div>
        </el-col>
        <el-col :span="7">
          <div>
            <el-button type="primary" @click="addTodoList">添加</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div>
            <p>
              总共：
              <span style="color:#409EFF">{{ total }}</span>，
              待办：
              <span style="color:#F56C6C">{{ unfinishedCount }}</span>，
              已完成：
              <span style="color:#67C23A">{{ successCount }}</span>
            </p>
          </div>
        </el-col>
      </el-row>
      <todo-table :table-data="todoList" @delete="removeTodo"/>
    </div>
  </div>
</template>

<script>
import todoTable from './todo-table/todo-table'
import '@/utils/utils.js'

export default {
  components: {
    todoTable
  },
  data() {
    return {
      todo: '',
      todoList: [
        {
          date: '2019-01-01 00:00:00',
          log: '测试测试111',
          status: 0,
          edit: false
        },
        {
          date: '2019-02-01 00:00:00',
          log: '测试测试222',
          status: 1,
          edit: false
        },
        {
          date: '2019-03-01 00:00:00',
          log: '测试测试333',
          status: 2,
          edit: false
        }
      ]
    }
  },
  computed: {
    total: function() {
      return this.todoList.length
    },
    successCount: function() {
      var count = 0
      this.todoList.forEach(item => {
        if (item.status === 2) {
          count++
        }
      })
      return count
    },
    unfinishedCount: function() {
      return this.total - this.successCount
    }
  },
  methods: {
    addTodoList() {
      if (this.todo !== '' && this.todo !== null) {
        var oneData = {}
        oneData.log = this.todo
        oneData.edit = false
        oneData.date = Date.CustomerDateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss')
        oneData.status = 0
        this.todoList.push(oneData)
        this.todo = ''
      }
    },
    removeTodo(index) {
      this.todoList.splice(index, 1)
    }
  }
}

</script>

<style>
.marginTop {
  margin-top: 15px;
}
</style>
