{{>menu}}
<div id="Examine" class="Examine">
  <ul class="collection with-header">
    <li class="collection-header">教室審核</li>
    {{#list}}
      <li class="Examine-Item collection-item" data-id="{{id}}">
        <div>
          <span class="Examine-Username">{{user.nickname}}</span>
          <span class="Examine-Classroom">{{property_name}}</span>
          <span class="Examine-Time">{{time}}</span>
          <a class="Examine-Pass secondary-content">
            <i class="material-icons">done</i>
          </a>
          <a class="Examine-Reject secondary-content">
            <i class="material-icons">clear</i>
          </a>
        </div>
      </li>
    {{/list}}
  </ul>
  <a href="{{prevUrl}}" class="btn-flat waves-effect waves-teal{{#disablePrev}} disabled{{/disablePrev}}">
    <i class="material-icons">chevron_left</i>Prev
  </a>
  <a href="{{nextUrl}}" class="btn-flat waves-effect waves-teal{{#disableNext}} disabled{{/disableNext}}">
    Next<i class="material-icons">chevron_right</i>
  </a>
</div>
