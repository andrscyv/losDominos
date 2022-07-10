<template>
  <div class="domino " />
</template>

<script>
export default {

}
</script>

<style scoped>
.domino{
    --dominoW:130px;
    --dominoH:64px;
    width: var(--dominoW);
    height:var(--dominoH);
    position:relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:20px 0px;
    opacity: 0.5;
    background-color: green;
}

</style>
