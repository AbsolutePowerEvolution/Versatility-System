{{>menu}}
<div class="container">
  <form action="#/admin/setting" method="PUT">
    <div class="input-field">
      <input id="time_name" class="validate Setting-TimeName" type="text" name="time_name" value="{{time_name}}">
      <label for="time_name" class="{{#time_name}}active{{/time_name}}">名稱 (ex: 104上學期):</label>
    </div>
    <div class="input-field">
      <label for="begin_date" class="{{#began_date}}active{{/began_date}}">開始時間：</label>
      <input id="begin_date" {{#began_date}}data-value="{{began_date}}"{{/began_date}}
         class="datepicker Setting-DateField Setting-BegTime" type="date" name="begin_date">
    </div>
    <div class="input-field">
      <label for="ended_date" class="{{#ended_date}}active{{/ended_date}}">結束時間：</label>
      <input id="ended_date" {{#ended_date}}data-value="{{ended_date}}"{{/ended_date}}
         class="datepicker Setting-DateField Setting-EndTime" type="date" name="ended_date">
    </div>
    <div class="input-field">
      <label for="stu_start" class="{{#stu_start}}active{{/stu_start}}">學生借用開始時間：</label>
      <input id="stu_start" {{#stu_start}}data-value="{{stu_start}}"{{/stu_start}}
         class="datepicker Setting-DateField Setting-StuStart" type="date" name="stu_start">
    </div>
    <div class="input-field">
      <label for="lab_start"  class="{{#lab_start}}active{{/lab_start}}">Lab 借用開始時間：</label>
      <input id="lab_start"  {{#lab_start}}data-value="{{lab_start}}"{{/lab_start}}
      class="datepicker Setting-DateField Setting-LabStart" type="date" name="lab_start">
    </div>
    <button id="apply-btn" type="submit" class="waves-effect waves-light btn">
      <i class="material-icons left">done</i>套用設定
    </button>
  </form>
</div>
