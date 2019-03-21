<template>
  <div class="app-container">
    <div>
      <div>Todo List</div>
      <div>
        <input v-model="newItem" type="text">
        <button @click="handleAdd">Add</button>
      </div>
      <div class="todo-border">
        <todo-item v-for="(item,index) in data" :key="index" :data="item" @delete="handleDelete(index)"/>
      </div>
    </div>
    <div>
      Total: {{ data.length }}, Undo: {{ undoCount }}
    </div>
  </div>
</template>

<script>
import todoItem from './item'
export default {
  components: {
    todoItem
  },
  data() {
    return {
      newItem: '',
      data: [
        {
          content: 'Self study Vue',
          status: 0
        },
        {
          content: 'Self study Java',
          status: 1
        },
        {
          content: 'Setup nodejs',
          status: 0
        },
        {
          content: 'Buy PC',
          status: 0
        },
        {
          content: 'Work hard',
          status: 2
        }
      ]
    }
  },
  computed: {
    undoCount() {
      return this.data.filter(item => item.status < 2).length
    }
  },
  methods: {
    handleAdd() {
      if (this.newItem) {
        this.data.push({ content: this.newItem, status: 0 })
      }
      this.newItem = ''
    },
    handleDelete(index) {
      this.data.splice(index, 1)
    }
  }
}
</script>

<style lang="scss">
  .todo-border {
    border: 1px solid #eee;
    width: 400px;
    margin: 20px 0;
    padding: 20px;
  }
</style>

