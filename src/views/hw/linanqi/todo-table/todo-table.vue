
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="日期" width="250">
      <template slot-scope="scope">
        <i class="el-icon-time"/>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <!-- <el-table-column prop="log" label="日志"/> -->
    <el-table-column label="日志">
      <template slot-scope="scope">
        <el-input
          v-show="scope.row.edit"
          v-model="scope.row.log"
          placeholder="请输入内容"
          @keyup.enter.native="scope.row.edit = !scope.row.edit"/>
        <span
          v-show="!scope.row.edit"
          style="margin-left: 10px"
          @click="scope.row.edit = !scope.row.edit">{{ scope.row.log }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          :class="{'notStart' : scope.row.status === 0,'success' : scope.row.status === 2,'unfinished' : scope.row.status === 1}"
          size="mini"
          @click="handleEdit(scope.$indsex, scope.row)"
        >{{ scope.row.status | statusFilter }}</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import './todo-table.scss'

export default {
  filters: {
    statusFilter(v) {
      if (v === 0) {
        return '未开始'
      } else if (v === 1) {
        return '进行中'
      } else {
        return '已完成'
      }
    }
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleEdit(index, row) {
      if (row.status === 0) {
        row.status = 1
      } else if (row.status === 1) {
        row.status = 2
      } else if (row.status === 2) {
        row.status = 0
      }
    },
    handleDelete(index, row) {
      this.$emit('delete', index)
    }
  }
}
</script>
