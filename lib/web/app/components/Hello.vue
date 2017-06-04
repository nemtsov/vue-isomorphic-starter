<template>
  <div class="hello">
    {{ msg }}
    <div>{{ item.title }}</div>
  </div>
</template>

<script>
export default {
  name: 'hello',

  asyncData({ store, route }) {
    return store.dispatch('fetchItem', route.params.id);
  },

  data() {
    return {
      msg: 'Hello, incredible world!',
    };
  },

  computed: {
    item () {
      return this.$store.state.items[this.$route.params.id];
    }
  }
};
</script>

<style scoped>
.hello {
  font-size: 120%;
}
</style>
