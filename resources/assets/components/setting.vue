<template>
  <admin-menu></admin-menu>
  <div class="container Setting-Container">
    <div class="m6 Setting-Column">
    </div>
    <div class="m6 Setting-Column">
      <setting-form></setting-form>
    </div>
  </div>
</template>

<script>
  import when from 'when';
  import AdminMenu from './admin-menu.vue';
  import SettingForm from './setting-form.vue';
  export default {
    components: { AdminMenu, SettingForm },
    compiled() {
      when(this.$http.get('manager/setting'))
        .then((response) => {
          console.log(response.data);
        });
    }
  }
</script>
