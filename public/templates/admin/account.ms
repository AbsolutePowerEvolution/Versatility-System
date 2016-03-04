{{>menu}}
<div id="account_container">
  <div id="account_system_content" class="row">
    <div id="search_bar" class="row">
      <div class="input-field">
        <select id="">
          <option value=""></option>
        </select>
        <input type="text" placeholder="帳號名稱" name="search"/>
      </div>
    </div>

    <div class="row">
      <span class="waves-effect waves-light btn modal-trigger" data-modal_target="add">
        <i class="material-icons">add</i>
      </span>
      <span class="waves-effect waves-light btn modal-trigger" data-modal_target="import_file">
        匯入檔案
      </span>
    </div>
  </div>

  <!-- History Page -->
  <div id="list_container">
    <ul id="list_element_container" class="collapsible" data-collapsible="accordion">
    </ul>
    <ul id="list_page_container" class="pagination center">
    </ul>
  </div>

  <!-- Create Account Modal -->
  <div id="add" class="modal materialize_modal">
    <div class="modal-content">
      <div class="row">
        <div class="input-field">
          <input id="account" type="text" class="validate">
          <label for="account">Account</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="password" type="password" class="validate">
          <label for="password">Password</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="email" type="email" class="validate">
          <label for="email">Email</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="nickname" type="text" class="validate">
          <label for="nickname">NickName</label>
        </div>
      </div>
      <div class="row">
        <span>類型：</span>
        <input class="with-gap" name="type" type="radio" id="student-radio" value="student">
        <label for="student-radio">
          學生
        </label>
        <input class="with-gap" name="type" type="radio" id="lab-radio" value="lab">
        <label for="lab-radio">
          Lab
        </label>
      </div>
    </div>
    <div class="modal-footer">
      <button id="addAccountBtn" class="center btn">
        確認送出
      </button>
    </div>
  </div>

  <!-- Import File Modal -->
  <div id="import_file" class="modal materialize_modal">
    <div class="modal-content">
      <form id="fileForm">
        <div class="file-field input-field">
          <div class="btn">
            <span>File</span>
            <input type="file" name="studentData">
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text">
          </div>
        </div>

      </form>
    </div>
    <div class="modal-footer">
      <button id="importFileBtn" class="center btn">
        確認送出
      </button>
    </div>
  </div>

  <div class="lean-overlay" id="materialize-lean-overlay-30">
  </div>
</div>
