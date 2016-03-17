{{>menu}}
<div id="account_container">
  <div class="row">
    <div class="col s3">
      <select id="view_role">
        <option disabled>顯示類型</option>
        <option value="student" selected>學生</option>
        <option value="lab">LAB</option>
        <option value="manager">管理者</option>
      </select>
    </div>
  </div>
  <div class="row">
    <span class="waves-effect waves-light btn modal-trigger" data-modal_target="user" data-type="add">
      <i class="material-icons">add</i>
    </span>
    <span class="waves-effect waves-light btn modal-trigger" data-modal_target="import_file">匯入檔案</span>
    <span class="waves-effect waves-light btn red" id="deleteAccountBtn">刪除</span>
  </div>
  <div class="row">
    <span class="waves-effect waves-light btn" id="selectAllBtn">全選</span>
  </div>

  <!-- list Page -->
  <div id="list_container">
    <ul id="list_element_container" class="collapsible" data-collapsible="accordion">
    </ul>
    <ul id="list_page_container" class="pagination center">
    </ul>
  </div>

  <!-- Create Account Modal -->
  <div id="user" class="modal materialize_modal">
    <div class="modal-content">
      <div class="row">
        <div class="input-field">
          <input id="account" type="text" class="validate">
          <label for="account">帳號</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="password" type="password" class="validate">
          <label for="password">密碼</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="email" type="email" class="validate">
          <label for="email">Email</label>
        </div>
        <div class="input-field col s6">
          <input id="phone" type="text" class="validate">
          <label for="phone">電話</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="group" type="text" class="validate">
          <label for="group">班級</label>
        </div>
        <div class="input-field col s6">
          <input id="nickname" type="text" class="validate">
          <label for="nickname">姓名</label>
        </div>
      </div>
      <div class="row">
        <span>類型：</span>
        <input class="with-gap" name="type" type="radio" id="student-radio" value="student">
        <label for="student-radio">學生</label>
        <input class="with-gap" name="type" type="radio" id="lab-radio" value="lab">
        <label for="lab-radio">Lab</label>
        <input class="with-gap" name="type" type="radio" id="manager-radio" value="manager">
        <label for="manager-radio">Manager</label>
      </div>
    </div>
    <div class="modal-footer">
      <button id="addAccountBtn" class="center btn">新增</button>
      <button id="updateAccountBtn" class="center btn">更新</button>
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
