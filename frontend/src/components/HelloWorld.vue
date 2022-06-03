<template>
  <span>Hello, this is a test</span>
  <div class="normal">
    <span>Should be visible always</span>
  </div>
  <div class="ff" v-if="test_ff">
    <span>Should be visible only when FF enabled!</span>
  </div>
</template>

<script>
import {checkFeatureFlag} from "@/services/checkFeatureFlag";
export default {
  name: 'HelloWorld',
  data() {
    return {
      test_ff: false
    }
  },
  async mounted() {
    console.log('test');
    this.test_ff = await checkFeatureFlag('test_FF');
    console.log(this.test_ff);
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
