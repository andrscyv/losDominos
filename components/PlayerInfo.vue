<template>
  <div class="player-info" :class="{'player-info--active':isNextToPlay}">
    <span> {{ name }}: {{ tiles }}</span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    tiles: {
      type: Number,
      required: true
    },
    isNextToPlay: {
      type: Boolean,
      required: true
    }
  }

}
</script>

<style scoped>
.player-info{
    color:white;

}
.player-info--active{
    color:red
}

</style>
