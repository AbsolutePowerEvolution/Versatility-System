<template>
  <admin-menu></admin-menu>
  <div class="container Setting-Container">
    <div class="m6 Setting-Column">
      <setting-list title="目前設定" filter=">"></setting-list>
      <setting-list title="歷史設定" filter="<=">
    </div>
    <div class="m6 Setting-Column">
      <setting-form></setting-form>
    </div>
  </div>
</template>

<script>
  import AdminMenu from './admin-menu.vue';
  import SettingForm from './setting-form.vue';
  import SettingList from './setting-list.vue';
  export default {
    components: { AdminMenu, SettingForm, SettingList },
  }
</script>
