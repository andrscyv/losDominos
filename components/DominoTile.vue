<template>
  <div class="domino" :style="rotateStyle">
    <p> {{ tile[0] }} </p>
    <p> {{ tile[1] }} </p>
  </div>
</template>

<script>
export default {
  props: {
    tile: {
      type: Array,
      required: true
    },
    rotateLeft: {
      type: Boolean,
      default: () => false
    },
    rotateRight: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    rotateStyle () {
      let rotationDegrees = '-90'
      if (this.rotateRight) { rotationDegrees = '0' }
      if (this.rotateLeft) { rotationDegrees = '-180' }
      return {
        transform: rotationDegrees + 'deg'
      }
    }
  }

}
</script>

<style scoped>
.domino {
    display: inline-block;
    height: 80px;
    width: 40px;
    background-color: rgb(240, 240, 240);
    border: 1px solid black;
    border-radius: 5px;
    position: relative;
}
.domino::after {
    content: "";
    background-color: black;
    height: 1px;
    width: 32px;
    position: absolute;
    top: 40px;
    left: 4px;
}
.domino p {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
