<template>
  <div class="juan-count">
    <button class="decrease" @click="decrease" :disabled="count === 1">-</button>
    <span class="count" v-text="count"></span>
    <button class="increase" @click="increase" :disabled="count === maxCount">+</button>
  </div>
</template>

<script>
export default {
  name: "JuanCount",
  props: {
    count: {
      type: Number,
      required: true
    },
    maxCount: {
      type: Number,
      default: 7
    },
  },
  model: {
    prop: 'count',
    event: 'change'
  },
  methods: {
    decrease() {
      this.$emit('decrease');
      this.$emit('change', this.count - 1);
    },
    increase() {
      this.$emit('increase');
      this.$emit('change', this.count + 1);
    }
  }
}
</script>

<style lang="stylus" scoped>
  .juan-count
    button.decrease, button.increase
      width: 6.7vw
      background-color: #ff464e
      color: #fff
      border: 0.1px solid #b0b0b0
      font-size: 3.7vw
    span.count
      margin: 0 1.3vw
</style>
