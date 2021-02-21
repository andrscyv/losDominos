<template>
  <div class="tile-face left-side" :class="{'tile-face--vertical':isVertical}">
    <div
      v-for="(dot,i) in pips"
      :key="i"
      class="dot"
      :class="{'dot--on':dot}"
    />
  </div>
</template>

<script>
export default {
  props: {
    n: {
      type: Number,
      required: true
    },
    isVertical: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    pips () {
      switch (this.n) {
        case 1:
          return [0, 0, 0,
            0, 1, 0,
            0, 0, 0]
        case 2:
          return [1, 0, 0,
            0, 0, 0,
            0, 0, 1]
        case 3:
          return [1, 0, 0,
            0, 1, 0,
            0, 0, 1]
        case 4:
          return [1, 0, 1,
            0, 0, 0,
            1, 0, 1]
        case 5:
          return [1, 0, 1,
            0, 1, 0,
            1, 0, 1]
        case 6:
          return [1, 0, 1,
            1, 0, 1,
            1, 0, 1]
        default:
          return [0, 0, 0,
            0, 0, 0,
            0, 0, 0]
      }
    }
  }

}
</script>

<style scoped>
.tile-face{
    width: 50%;
    height: 100%;
    padding:3px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}
.tile-face--vertical{
    width: 100%;
    height:50%;
}
.dot{
    width:8px;
    height: 8px;
    background-color: black;
    border-radius: 50%;
}
.dot--on{
    background-color:white
}
.left-side{
}
</style>
