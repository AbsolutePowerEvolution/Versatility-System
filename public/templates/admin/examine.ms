<div id="Examine" class="container Examine">
  {{>menu}}
  <span>教室審核</span>
  <ul class="collapsible popout" data-collapsible="accordion">
    {{#list}}
      <li class="Examine-Item" data-id="{{id}}">
        <a class="Examine-Pass secondary-content">
          <i class="material-icons">done</i>
        </a>
        <a class="Examine-Reject secondary-content">
          <i class="material-icons">clear</i>
        </a>
        <div class="collapsible-header">
          <span class="Examine-Username">{{user.nickname}}</span>
          <span class="Examine-Classroom">{{property_name}}</span>
          <span class="Examine-Time">{{time}}</span>
        </div>
        <div class="collapsible-body">
          <p>{{remark}}</p>
        </div>
      </li>
    {{/list}}
  </ul>
  {{>pagination}}
</div>
