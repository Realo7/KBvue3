<template>
  <div></div>
</template>
<script>
import { reactive } from 'vue'
export default {
  setup() {
    reactive(['blue', 'red', 'green'])
  }
}
</script>