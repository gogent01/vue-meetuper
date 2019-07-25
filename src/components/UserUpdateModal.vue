<template>
  <div>
    <button class="button is-primary is-outlined m-t-sm"
            @click="toggleModal">Update Info</button>
    <div class="modal"
         :class="{'is-active': modalOpen}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">User Profile</p>
          <button class="delete"
                  aria-label="close"
                  @click="toggleModal"></button>
        </header>
        <section class="modal-card-body">
          <form>
            <div class="field">
              <label class="title">Name
                <input class="input"
                       v-model="user.name">
              </label>
            </div>
            <div class="field">
              <label class="title">Username
                <input class="input"
                      v-model="user.username">
              </label>
            </div>
            <div class="field">
              <label class="title">Avatar
                <input class="input"
                      v-model="user.avatar">
              </label>
            </div>
            <div class="field">
              <label class="title">Info
                <input class="input"
                      v-model="user.info">
              </label>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success"
                  @click="emitUser">Save changes</button>
          <button class="button"
                  @click="toggleModal">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      authUser: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        modalOpen: false,
        user: {...this.authUser}
      }
    },
    methods: {
      toggleModal () {
        this.modalOpen = !this.modalOpen;
      },
      emitUser () {
        this.$emit('userSubmitted', {user: this.user, done: () => {
            this.modalOpen = false;
          }});
      }
    }
  }
</script>

<style scoped>

</style>