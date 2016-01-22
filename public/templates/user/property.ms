{{>menu}}

<div id="property_container" class="container">    
    <div class="container">
        <div class="row">
            <div class="col s6 right">
                <ul id="sub_menu" class="tabs">
                    <li id="property_system" class="tab center"><a herf=""><i class="material-icons">gavel</i>財產管理系統</a></li>
                    <li id="property_history" class="tab center"><a herf=""><i class="material-icons">history</i>歷史紀錄</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div id="property_system_content" class="property_system row">
        <div class="row">
            <input id="search_property" class="offset-s3 col s6" type="text" placeholder="財產名稱"/>
            <span id="search_property_btn" class="col s3 left-align"><a class="waves-effect waves-light btn blue darken-4"><i class="material-icons left">search</i>搜尋</a></span>
        </div>
        <ul class="collapsible popout" data-collapsible="accordion">
            {{#propertyData}}
                <li class="showContent propertyContent searched row hide">
                    <span class="collapsible-header s4" style="color:{{status.color}}">{{status.name}}<span class="s4 col" style="color:black">{{name}}</span></span>
                    <span class="collapsible-body col s4 center-align">{{describe}}</span>
                </li>
            {{/propertyData}}
        </ul>
    </div>

    <div id="property_history_content" class="row" style="display:none">
    </div>

    <div id="history_modal" class="modal">
        <div class="modal-content">
            <h4></h4>
            <span></span><br>
            <p></p>
            <div class="input-field">
            </div>
        </div>
        <div class="modal-footer">
        </div>
    </div>
    <div class="lean-overlay" id="materialize-lean-overlay-30"></div>

    <div class="property_system">
        <ul class="pagination center-align">
            <li onselectstart="return false">
                <a class="page" data-pagenum="prev"><i class="material-icons">chevron_left</i></a>
            </li>
            {{#propertyPage}}
            <li onselectstart="return false" class="{{classes}}">
                <a class="page" data-pagenum="{{pageNum}}">{{pageNum}}</a>
            </li>
            {{/propertyPage}}
            <li onselectstart="return false">
                <a class="page" data-pagenum="next"><i class="material-icons">chevron_right</i></a>
            </li>
        </ul>
    </div>

</div>
