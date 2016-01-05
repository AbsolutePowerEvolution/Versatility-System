<table>
  <thead>
    <tr>
      <td>Time</td>
      <td>Mon</td>
      <td>Tue</td>
      <td>Wed</td>
      <td>Thu</td>
      <td>Fri</td>
    </tr>
  </thead>
  <tbody>
    {{#list}}
      <tr>
        <td>
          {{time}}
        </td>
        {{#classes}}
          <td class="{{#mon}}Sehedule-Class{{/mon}}">
            {{{mon}}}
          <td>
          <td class="{{#tue}}Sehedule-Class{{/tue}}">
            {{{tue}}}
          <td>
          <td class="{{#wed}}Sehedule-Class{{/wed}}">
            {{{wed}}}
          <td>
          <td class="{{#thu}}Sehedule-Class{{/thu}}">
            {{{thu}}}
          <td>
          <td class="{{#fri}}Sehedule-Class{{/fri}}">
            {{{fri}}}
          <td>
        {{/classes}}
      </tr>
    {{/list}}
  </tbody>
</table>
