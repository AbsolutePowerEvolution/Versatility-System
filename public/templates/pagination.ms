<ul class="pagination center">
  <li class="{{#prevUrl}}waves-effect{{/prevUrl}}{{^prevUrl}}disabled{{/prevUrl}}">
    <a{{#prevUrl}} href="{{prevUrl}}"{{/prevUrl}}"><i class="material-icons">chevron_left</i></a>
  </li>
  {{#pages}}
    <li id="pagination-{{num}}" class="waves-effect"><a href="{{url}}">{{num}}</a></li>
  {{/pages}}
  <li class="{{#nextUrl}}waves-effect{{/nextUrl}}{{^nextUrl}}disabled{{/nextUrl}}">
    <a{{#nextUrl}} href="{{nextUrl}}"{{/nextUrl}}><i class="material-icons">chevron_right</i></a>
  </li>
</ul>
