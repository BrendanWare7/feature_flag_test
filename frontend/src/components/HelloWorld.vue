<template>
  <span>Hello, this is a test</span>
  <div class="normal">
    <span>Should be visible always</span>
  </div>
  <div class="ff">
    <span>Should be visible only when FF enabled!</span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ff {
  color: red;
}

.normal {
  color: blue;
}

</style>
