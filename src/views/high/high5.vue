<template>
  <div class="app-container">
    <div style="margin-bottom:10px">
      <el-input v-model="content" placeholder="请输入" style="width:80%"/>
      <el-button type="ghost" @click="add()">add</el-button>
    </div>

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
      <el-table-column class-name="status-col" label="Status" width="220" click="changeStatus(scope.row.status,scope.$index)" align="center">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.status===70" :type="scope.row.status | typeFilter" size="min" @click="changeStatus(scope.row.status,scope.$index)">{{ scope.row.status | statusFilter }}</el-button>
          <el-button :disabled="scope.row.status===70" size="min" type="danger" @click="deleteRow(scope.$index)">删除</el-button>
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
    },
    typeFilter(status) {
      const statusMap = {
        10: 'info',
        30: 'primary',
        70: 'success'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      content: '',
      listLoading: false,
      list: [],
      sMap: {
        10: 30,
        30: 70
      }
    }
  },
  created() {

  },
  methods: {
    add() {
      if (!this.content) {
        this.$message.warning('内容不能为空！')
        return
      }
      var c = this.content
      this.list.push({ 'content': c, 'status': 10, 'create_time': new Date() })
    },
    changeStatus(status, idx) {
      this.list[idx].status = this.sMap[status]
    },
    deleteRow(idx) {
      console.log(idx)
      this.list.splice(idx, 1)
    }
  }
}
</script>
