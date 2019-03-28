<template>
  <div class="app-container">
    <div style="background-color: #eee; padding: 50px;">
      <todo-list/>
    </div>
  </div>
</template>

<script>
import TodoList from './components/todolist'
export default {
  name: 'Sample',
  components: { TodoList },
  data() {
    return {
    }
  }
}
</script>
