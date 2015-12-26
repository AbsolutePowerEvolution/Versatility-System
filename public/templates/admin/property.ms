<div id="property_container" class="container">
    <div id="menu" class="row">
        <span class="col s2 offset-s6 center-align">首頁</span>
        <span class="col s2 center-align">教室預借系統</span>
        <span class="col s2 center-align">財產管理系統</span>
    </div>

    <div id="sub_menu" class="row">
        <span id="property_system" class="col s6 center-align waves-effect waves-light btn"><i class="material-icons">gavel</i>財產管理系統</span>
        <span id="property_manage" class="col s6 center-align waves-effect waves-light btn"><i class="material-icons">settings</i>管理財產</span>
    </div>

    <div id="property_system_content" class="property_system row">
        <div class="row">
            <input id="search_property" class="offset-s3 col s6" type="text" placeholder="財產名稱"/>
            <span id="search_property_btn" class="col s3 left-align"><a class="waves-effect waves-light btn blue darken-4
"><i class="material-icons left">search</i>搜尋</a></span>
        </div>
        {{#propertyData}}
        <div class="card propertyContent searched hide">
            <div class="row card-content" data-name="{{name}}" data-propertyid="{{id}}" data-describe="{{describe}}" data-code="{{code}}">
                <span class="col s4 center-align">{{name}}</span>
                <span class="col s4 center-align" style="color: {{status.color}}">{{status.name}}</span>
                <span class="col s4 center-align">
                    <a class="waves-effect waves-light btn modal-trigger"><i class="material-icons left">description</i>詳細資料</a>
                </span>
            </div>
        </div>
        {{/propertyData}}
    </div>

    <div id="property_manage_content" class="row card">
        <div class="row card-content">
            <span class="col s6 center-align">
                <a id="create_property" class=" center-align waves-effect waves-light btn modal-trigger s4"><i class="material-icons left">add_circle</i>新增財產</a>
            </span>
            <span class="col s6 center-align">
                <a id="load_property" class=" center-align waves-effect waves-light btn modal-trigger s4"><i class="material-icons left">alarm</i>財產借用/歸還</a>
            </span>
        </div>
    </div>

    <div id="property_modal" class="modal">
        <div class="modal-content">
            <a id="delete_property_btn" class=" modal-action modal-close waves-effect btn red right"><i class="material-icons left">delete</i>刪除財產</a>
            <h4></h4>
            <p></p>
        </div>
        <div class="modal-footer">
            <a class=" modal-action modal-close waves-effect waves-green btn-flat">關閉</a>
        </div>
    </div>

    <div id="create_property_modal" class="modal">
        <div class="modal-content">
            <h4>新增財產</h4><br>
            <div class="input-field">
                <input id="create_property_name" type="text"/>
                <label for="create_property_name">財產名稱</label>
            </div>
            <div class="input-field">
                <textarea id="create_property_describe" class="materialize-textarea"/>
                <label for="create_property_describe">財產描述</label>
            </div>
        </div>
        <div class="modal-footer">
            <a id="create_property_btn" class=" modal-action modal-close waves-effect waves-green btn blue darken-4">確定新增</a>
        </div>
    </div>
    <div class="lean-overlay" id="materialize-lean-overlay-30"></div>

    <ul class="property_system pagination center-align">
        <li onselectstart="return false">
            <a class="page" data-pagenum="prev"><i class="material-icons">chevron_left</i></a>
        </li>
        {{#page}}
            <li onselectstart="return false" class="{{classes}}">
                <a class="page" data-pagenum="{{pageNum}}">{{pageNum}}</a>
            </li>
        {{/page}}
        <li onselectstart="return false">
            <a class="page" data-pagenum="next"><i class="material-icons">chevron_right</i></a>
        </li>
    </ul>
</div>
