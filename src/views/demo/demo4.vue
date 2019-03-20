<template>
  <div class="app-container">
    <div class="demo-b">
      <txt-component/>
      <txt-component/>
      <txt-component/>
      <txt-component/>
    </div>
    <div class="demo-b">
      <txt-component color="red"/>
      <txt-component color="green"/>
      <txt-component color="blue"/>
      <txt-component color="white"/>
    </div>
  </div>
</template>

<script>
import txtComponent from './txt-component'
export default {
  components: {
    txtComponent
  },
  data() {
    return {
    }
  }
}
</script>

