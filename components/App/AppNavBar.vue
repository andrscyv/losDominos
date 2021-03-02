<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="">
      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click="showModal('modal-instructions')">
            Invite friends!
          </b-nav-item>
          <b-nav-item @click="showModal('modal-instructions')">
            Instructions
          </b-nav-item>
          <b-nav-item href="#" :disabled="playerId !== currentPlayerId" @click="showModal('modal-start-game')">
            Start game
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['playerId', 'currentPlayerId'])
  },
  methods: {
    showModal (id) {
      this.$root.$emit('bv::show::modal', id)
    },
    hideModal () {
      this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
    },
    toggleModal () {
      this.$root.$emit('bv::toggle::modal', 'modal-1', '#btnToggle')
    }
  }
}
</script>

<style>

</style>
