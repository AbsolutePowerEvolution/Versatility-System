<template>
  <user-menu></user-menu>
  <div class="container">
      <div class="row">
          <div class="col s6 right">
              <ul id="sub_menu" class="tabs">
                <li class="tab center switch_screen" data-screen_type="loan">
                  <a herf=""><i class="material-icons">list</i>借用教室</a>
                </li>
                <li class="tab center switch_screen" data-screen_type="history">
                  <a herf=""><i class="material-icons">history</i>歷史紀錄</a>
                </li>
              </ul>
          </div>
      </div>
  </div>

  <loan-request></loan-request>
  <loan-history
    :page="page">
  </loan-history>

  <div class="lean-overlay" id="materialize-lean-overlay-30">
  </div>
</template>
<script>
// Lib
import $ from 'jquery';

// component
import UserMenu from './user-menu.vue';
import LoanRequest from './loan-request.vue';
import LoanHistory from './loan-history.vue';

export default({
  props: {
    baseUrl: {
      type: String,
      require: true
    },
    page: {
      type: Number,
      require: true
    }
  },
  components: { UserMenu, LoanRequest, LoanHistory},
  methods: {
    displayScreen(screen) {

    }
  },
  compiled() {
    console.log(this.$root);
    console.log(this.$data.screen);
  }
});
</script>
