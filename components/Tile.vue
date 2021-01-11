<template>
  <div class="tile">
    <pips :n="tile[0]" />
    <pips :n="tile[1]" />
  </div>
</template>

<script>
export default {
  props: {
    tile: {
      type: Array,
      required: true
    }
  }

}
</script>

<style scoped>
.tile{
    height: 40px;
    width: 80px;
    display: flex;
    flex-direction: row;
    background-color:black;
    border: 3px solid white;
}
</style>
