<template>
  <div class="app-container">
    <!-- data1 -->
    <div class="demo-b" >
      <el-input v-model="text" style="width:20%" type="text" placeholder="to-do-list" />
      <el-button type="primary" style="background-color:'#fff';text-align:center !important" @click="add()">添加</el-button>
      <span style="color:red">{{ warning }}</span>
    </div>
    <todolist :datalist="data" @del="deleteOne" @changeS="changeStatus"/>
    <div class="demo-b" >
      <h3>
        <span name="total">总数：{{ data.length }}</span>
        <span name="unstart">未开始：{{ countUS }}</span>
        <span name="starting">进行中：{{ countStarting }}</span>
        <span name="finished">已完成：{{ countF }}</span>
      </h3>
    </div>
  </div>
</template>

<script>
import todolist from './todolist'
export default {
  components: {
    todolist
  },
  data() {
    return {
      data: [{
        name: '吃饭',
        status: 1
      },
      {
        name: '睡觉',
        status: 1
      },
      {
        name: '敲代码',
        status: 2
      }
      ],
      text: '',
      warning: ''
    }
  },
  computed: {
    countUS() {
      var count = 0
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].status === 1) {
          count++
        }
      }
      return count
    },
    countStarting() {
      var count = 0
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].status === 2) {
          count++
        }
      }
      return count
    },
    countF() {
      var count = 0
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].status > 2) {
          count++
        }
      }
      return count
    }
  },
  methods: {
    add() {
      if (this.text === '') {
        this.warning = '你还没有输入内容呢！'
        return
      }
      for (var i = 0; i < this.data.length; i++) {
        if (this.text === this.data[i].name) {
          this.warning = '该任务已重复,请换个！'
          return
        }
      }
      this.data.push({ name: this.text, status: 1 })
      this.warning = ''
    },
    deleteOne(name) {
      for (var i = 0; i < this.data.length; i++) {
        if (name === this.data[i].name) {
          this.data.splice(i, 1)
        }
      }
    },
    changeStatus(name) {
      for (var i = 0; i < this.data.length; i++) {
        if (name === this.data[i].name) {
          this.data[i].status++
        }
      }
    },
    mEnter() {
      alert('dfd')
      this.text = ''
    }
  }
}
</script>
<style type="text/css">
		/* span {
      margin-left:30px;
    } */
    span[name="total"] {
       color:black;
    }
    span[name="unstart"] {
       color:red;
    }
    span[name="starting"] {
       color:orange;
    }
     span[name="finished"] {
       color:green;
    }
    el-button {
      text-align:center!important;
    }
	</style>
