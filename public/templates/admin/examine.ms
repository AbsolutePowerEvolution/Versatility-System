<div class="Examine">
  <ul class="collection with-header">
    <li class="collection-header">教室審核</li>
    {{#list}}
      <li class="Examine-Item collection-item" data-id="{{id}}">
        <div>
          <span class="Examine-Username">{{username}}</span>
          <span class="Examine-Classroom">{{propertyName}}</span>
          <span class="Examine-Time">{{time}}</span>
          <a class="Examine-Detail secondary-content tooltipped material-icons" data-tooltip="More Detail">
            details
          </a>
          <a class="Examine-Pass secondary-content material-icons">
            done
          </a>
          <a class="Examine-Reject secondary-content material-icons">
            clear
          </a>
        </div>
      </li>
    {{/list}}
  </ul>
</div>
