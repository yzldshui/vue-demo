<template>
  <div class="search-area">
    <div class="search-header">
      <slot name="header"/>
    </div>
    <div class="search-body">
      <slot/>
    </div>
    <div class="search-footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data1: 'Hello World!'
    }
  }
}
</script>

<style lang="scss">
  .search-area {
    margin: 20px;
    padding: 20px;
    background-color: lightblue;
    .search-header {
      padding: 20px;
      background-color: lightcyan;
    }
    .search-body {
      padding: 20px;
      background-color: lightgray;
    }
    .search-footer {
      padding: 20px;
      background-color: lightgreen;
    }
  }
</style>

