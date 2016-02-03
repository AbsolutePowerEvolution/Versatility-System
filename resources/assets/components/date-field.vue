<template>
  <div class="input-field">
    <label :for="name" :class="{active: date}">
      <slot></slot>
    </label>
    <input v-el:picker :id="name" v-model="date" :data-value="date"
       class="datepicker Setting-DateField {{className}}" type="date" :name="name">
  </div>
</template>

<script>
  import $ from 'jquery';
  export default {
    props: {
      date: {
        type: String,
        required: true,
        twoWay: true
      },
      name: {
        type: String,
        required: true
      },
      className: {
        type: String,
        required: true
      }
    },
    compiled() {
      $(this.$els.picker)
        .pickadate({
          format: 'yyyy-mm-dd',
          formatSubmit: 'yyyy-mm-dd',
          closeOnSelect: true,
          closeOnClear: true,
        });
    }
  }
</script>
