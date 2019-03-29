<template>
  <div class="app-container">
    <input v-model="content" type="text">
    <el-button type="ghost" @click="add()">add</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" click="changeStatus(scope.row.status,scope.$index)" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_time" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        10: '待开发',
        30: '进行中',
        70: '已完成'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      content: 'dd',
      list: new Array({ 'content': 'todo', 'status': 10, 'create_time': new Date() })
    }
  },
  created() {

  },
  methods: {
    add() {
      // if (!this.list) {
      //   this.list = new Array()
      // }
      var c = this.content
      this.list.push({ 'content': c, 'status': 10, 'create_time': new Date() })
    },
    changeStatus(status, idx) {
      this.list[idx].status = 30
    }
  }
}
</script>
