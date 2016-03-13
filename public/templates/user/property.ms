{{>menu}}

<div id="property_container" class="container">    
    <div class="container">
        <div class="row">
            <div class="col s8 right">
                <ul id="sub_menu" class="tabs">
                    <li id="property_system" class="property_system tab center"><a herf=""><i class="material-icons">gavel</i>財產</a></li>
                    <li id="property_loan" class="property_loan tab center"><a herf=""><i class="material-icons">history</i>借用歷史紀錄</a></li>
                    <li id="property_repair" class="property_repair tab center"><a herf=""><i class="material-icons">build</i>報修財產</a></li>
                    <li id="property_repair_log" class="property_repair_log tab center"><a herf=""><i class="material-icons">history</i>報修歷史紀錄</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div id="property_system_content" class="property property_system row">
        <div class="row">
            <input id="search_property" class="offset-s3 col s6" type="text" placeholder="財產名稱"/>
            <span id="search_property_btn" class="col s3 left-align"><a class="waves-effect waves-light btn blue darken-4"><i class="material-icons left">search</i>搜尋</a></span>
        </div>
        <ul class="collapsible popout" data-collapsible="accordion">
            {{#propertyData}}
                <li class="showContent propertyContent searched row hide">
                    <span class="collapsible-header s4" style="color:{{status.color}}">{{status.name}}<span class="s4 col" style="color:black">{{name}}</span></span>
                    <span class="collapsible-body col s12 left">{{describe}}</span>
                </li>
            {{/propertyData}}
        </ul>
    </div>

    <div id="property_loan_content" class="property property_loan row" style="display:none">
        <ul class="collapsible popout" data-collapsible="accordion">
            {{#loanData}}
            <li class="row">
                <span class="collapsible-header ">
                    <span class="s4 col">{{property_name}}</span>
                    <span class="s4 col">{{date_began_at}} - {{date_ended_at}}</span>
                    <span class="s4 col" style="color:{{status.color}}">{{status.name}}</span>
                </span>
                <span class="collapsible-body col s12 left">{{remark}}</span>
            </li>
            {{/loanData}}
        </ul>
    </div>

    <div id="property_repair_form" class="property property_repair row" style="display:none">
        <div class="row">
            <h3>報修財產：</h3>
        </div>

        <div class="row">
            <h5>報修類型：</h5>
            <p>
                <input name="repair_type" type="radio" id="repair_type_1" value="cleanup"/>
                <label for="repair_type_1">清潔</label>
            </p>
            <p>
                <input name="repair_type" type="radio" id="repair_type_2" value="maintain"/>
                <label for="repair_type_2">維修</label>
            </p>
        </div>

        <div class="row">
            <h5>申請地點：</h5>
            <div class="input-field">
                <input id="repair_title" type="text"/>
                <label for="repair_title">請填寫詳細地點</label>
            </div>
        </div>

        <div class="row">
            <h5>申請項目：</h5>
            <div class="input-field">
                <textarea id="repair_remark" class="materialize-textarea"></textarea>
                <label for="repair_remark">請填寫詳細地點</label>
            </div>
        </div>

        <div class="row">
            <span id="repair_property_btn" class="col s12 center"><a class="waves-effect waves-light btn blue darken-4"><i class="material-icons left">build</i>送出報修</a></span>
        </div>
    </div>

    <div id="property_repair_content" class="property property_repair_log row" style="display:none">
        <ul class="collapsible popout" data-collapsible="accordion">
            {{#repairData}}
            <li class="repair_content row">
                <span class="collapsible-header">
                    <span class="s4 col">{{title}}</span>
                    <span class="s4 col">{{created_at}}</span>
                    <span class="s4 col" style="color:{{status.color}}">{{status.name}}</span>
                </span>
                <div class="collapsible-body col s12 left">
                    <div>
                        <span class="col s3">{{type.name}}</span>
                        <span class="col s3 right">
                            <a class="repair_delete_btn waves-effect waves-light btn red"  data-repair_id="{{id}}">
                                <i class="material-icons left">delete</i>取消
                            </a>
                        </span>
                    </div>
                    <div>
                        <span>{{remark}}</span>
                    </div>
                </div>
            </li>
            {{/repairData}}
        </ul>
    </div>

    <div id="repair_property_modal" class="modal">
        <div class="modal-content">
            <h4></h4>
            <div class="input-field">
            </div>
        </div>
        <div class="modal-footer">
        </div>
    </div>
    <div class="lean-overlay" id="materialize-lean-overlay-30"></div>

    <div class="property property_system">
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
