<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="">
      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click="showModal('modal-instructions')">
            {{ $t('invite') }}
          </b-nav-item>
          <b-nav-item @click="showModal('modal-instructions')">
            {{ $t('instructions') }}
          </b-nav-item>
          <b-nav-item href="#" :disabled="playerId !== currentPlayerId" @click="showModal('modal-start-game')">
            {{ $t('start') }}
          </b-nav-item>
          <b-nav-item-dropdown :text="$t('lang')">
            <b-dropdown-item
              v-for="lang in $i18n.locales"
              :key="lang.code"
              :value="lang.code"
              @click="$i18n.locale=lang.code"
            >
              {{ lang.name }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
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
    },
    changeLocale (locale) {
      console.log(locale)
      console.log(this.$i18n)
      console.log(this.$i18n.localeProperties.name)
      this.$i18n.setLocale(locale.code)
    }
  }
}
</script>

<style>

</style>
