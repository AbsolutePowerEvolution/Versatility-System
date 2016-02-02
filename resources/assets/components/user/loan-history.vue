<template>
  <div id="history_container">
    <div id="history_card_container"></div>
    <ul class="pagination">
      <li onselectstart="return false">
        <i class="material-icons">chevorn_left</i>
      </li>
    </ul>
  </div>
</template>
<script>
import Pagination from '../pagination.vue';

export default({
  props: {
    page: {
      type: Number,
      require: true
    }
  },
  methods: {

  },
  compiled() {

  }
});
</script>
