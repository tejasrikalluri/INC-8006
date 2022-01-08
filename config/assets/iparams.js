app.initialized().then(function (client) {
    window.client = client;
    var count = 2, link_config_count = 2, fieldsData = function (callback) {
        getTicketFileds(callback);
    }, typeCount = 2;
    $(".next_page").hide();
    $(document).on('click', '#authBtn', function () {
        $(this).text("Authenticating...");
        $(this).prop("disabled", true);
        ($("#apiKey").val().trim() === "") ?
            showErrorMsg("apiKey", "Please enter API Key") :
            removeAttrFn("apiKey");
        ($("#domain").val().trim() === "") ? showErrorMsg("domain", "Please enter Domain") : removeAttrFn("domain");
        if ($("#apiKey").val().trim() !== "" && $("#domain").val().trim() !== "") {
            fieldsData(function (resp) {
                appendTicketFieldsOptions(resp);
                appendTicketTypesOptions(resp);
                if (updateConfigs !== undefined) {
                    formGetConfigs(resp);
                    link_config_count = updateConfigs.URLConfigMap.at(-1).URLID + 1;
                }
            });
        } else buttonEnable();
    });
    $(document).on('change', 'select,fw-textarea,fw-input', function () {
        console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")
        $("#urlConfigErr").html("");
    });
    $(document).on('click', '#addParam,.addParam', function () {
        var str = `<div id="addParamBlock_${count}" class="col-sm-12 paramBlock addParamBlock ml12">
        <div class="col-sm-3">
            <fw-input class="prefix" id="prefix_${count}" label="Parameter prefix"></fw-input>
        </div>
        <div class="col-sm-5" id="select">
            <label class="ml3">Ticket field</label>
            <select class="form-control ticket_field ml3" id="t_fields_${count}"></select>
        </div>
        <div class="col-sm-4">
    <fw-icon name="circle-minus" size="14" class="mt36 param_del" color="red"></fw-icon>
</div>
    </div>`;
        $(this).closest("div.second").append(str);
        count++;
        fieldsData(function (resp) {
            appendTicketFieldsOptions(resp);
        });
        $("#urlConfigErr").html("");
    });
    $(document).on('click', '.param_del', function () {
        $(this).closest("div.paramBlock").remove();
        $("#urlConfigErr").html("");
        // count--;
    });
    $(document).on('click', '.delLinkConfig', function () {
        $(this).closest("div.urlConfig").remove();
        $("#urlConfigErr").html("");
        // link_config_count--;
    });
    $(document).on('click', '.delTypeConfig', function () {
        $(this).closest("div.ticketConfig").remove();
        $("#urlConfigErr").html("");
    });
    $(document).on('click', '#addTktConfig', function () {
        var html = `<div class="col-sm-12 ticketConfig" id="ticketConfig_${typeCount}">
        <div class="col-sm-3"><label class="">Type</label>
            <select class="form-control type" id="type_${typeCount}"></select>
        </div>
        <div class="col-sm-2"><label class="">Status</label>
            <select class="form-control status" id="status_${typeCount}"></select>
        </div>
        <div class="col-sm-3">
            <fw-textarea cols=37 rows=2 label="URL ID(s)" class="url_ids mt12" id="url_ids_${typeCount}" state="normal">
            </fw-textarea>
        </div>
        <div class="col-sm-1 ml10">
            <fw-icon name="delete" size="17" class="mt36 delTypeConfig" id=delTypeConfig_${link_config_count} color="red"></fw-icon>
        </div>
    </div>`;
        $("#addTicketConfig").append(html);
        fieldsData(function (resp) {
            appendTicketTypesOptions(resp);
        });
        typeCount++;
    });
    $(document).on('click', '#addLink', function () {
        console.log("OOOOOOOOOOOOOOOO")

        var html = `<div id=urlConfig_${link_config_count} class="urlConfig">
        <div id="first_${link_config_count}" class="col-sm-12">
            <div class="col-sm-3" id="linkIDBlock">
                <label class="block">URL ID:</label>
                <label class="col-sm-2 block linkID" id="linkID_${link_config_count}">${link_config_count}</label>
            </div>
            <div class="col-sm-5">
                <fw-input label="URL" class="urlLink" id="urlLink_${link_config_count}"></fw-input>
            </div>
            <div class="col-sm-4">
    <fw-icon name="delete" size="17" class="mt36 delLinkConfig" id=delLinkConfig_${link_config_count} color="red"></fw-icon>
            </div>
        </div>
        <div id="second_${link_config_count}" class="second">
            <div id="addParamBlock_${link_config_count}" class="col-sm-12 addParamBlock ml12">
                <div class="col-sm-3">
                    <fw-input class="prefix" id="prefix_${link_config_count}" label="Parameter prefix"></fw-input>
                </div>
                <div class="col-sm-5" id="select">
                    <label class="ml3">Ticket field</label>
                    <select class="form-control ticket_field ml3" id="ticket_field_${link_config_count}"></select>
                </div>
                <div class="col-sm-4">
                    <a class="mt36 addParam" id="">+Add URL parameter</a>
                </div>
            </div>
        </div>
        <hr />
    </div>`;
        $("#addUrlConfig").append(html);
        fieldsData(function (resp) {
            appendTicketFieldsOptions(resp);
        });
        link_config_count++;
    });
    $(document).on('fwChange', '#domain,#apiKey', function () {
        removeAttrFn("domain");
        removeAttrFn("apiKey");
        $(".error_div").html("");
        buttonEnable();
    });
});
function appendUrlConfigUiGet(id, i, resp) {
    console.log("PPPPPPPPPPPPPPPPPP")
    var html = `<div id=urlConfig_${id} class="urlConfig">
    <div id="first_${id}" class="col-sm-12">
        <div class="col-sm-3" id="linkIDBlock">
            <label class="block">URL ID:</label>
            <label class="col-sm-2 block linkID" id="linkID_${id}">${i.URLID}</label>
        </div>
        <div class="col-sm-5">
            <fw-input label="URL" class="urlLink" id="urlLink_${id}" value="${i.URL}"></fw-input>
        </div>
        <div class="col-sm-4">
<fw-icon name="delete" size="17" class="mt36 delLinkConfig" id=delLinkConfig_${id} color="red"></fw-icon>
        </div>
    </div>
    <div id="second_${id}" class="second">
        <div id="addParamBlock_${id}" class="col-sm-12 addParamBlock ml12">
            <div class="col-sm-3">
                <fw-input class="prefix" id="prefix_${id}" label="Parameter prefix" value="${i.params[0]}"></fw-input>
            </div>
            <div class="col-sm-5" id="select">
                <label class="ml3">Ticket field</label>
                <select class="form-control ticket_field ml3" id="ticket_field_${id}"></select>
            </div>
            <div class="col-sm-4">
                <a class="mt36 addParam" id="">+Add URL parameter</a>
            </div>
        </div>
    </div>
    <hr />
</div>`;
    $("#addUrlConfig").append(html);
    appendParamsUi(i, resp, $(`#second_${id}`));
    setInterval(() => {
        $(`#ticket_field_${id}`).val(i.fields[0]).change();
    }, 1000);
}
function appendParamsUi(i, resp, ele) {
    var paramLen = i.params.length;
    for (var j = 1; j < paramLen; j++) {
        var fakeId = (Math.random() * 10000).toFixed(0);
        appendParamsUIGet(fakeId, i, resp, ele, j);
    }
}
function appendParamsUIGet(id, i, resp, ele, j) {
    var str = `<div id="addParamBlock_${id}" class="col-sm-12 paramBlock addParamBlock ml12">
    <div class="col-sm-3">
        <fw-input class="prefix" id="prefix_${id}" label="Parameter prefix" value="${i.params[j]}"></fw-input>
    </div>
    <div class="col-sm-5" id="select">
        <label class="ml3">Ticket field</label>
        <select class="form-control ticket_field ml3" id="ticket_field_${id}"></select>
    </div>
    <div class="col-sm-4">
<fw-icon name="circle-minus" size="14" class="mt36 param_del" color="red"></fw-icon>
</div>
</div>`;
    $(ele).append(str);
    appendTicketFieldsOptions(resp);
    $(`#ticket_field_${id}`).val(i.fields[j]);
}

function appendTicketTypesOptions(resp) {
    var select = `<option disabled="disabled" selected>--Select--</option>`;
    var select1 = `<option disabled="disabled" selected>--Select--</option>`;
    $.each(resp, function (k, v) {
        if (v.name === "status") {
            $.each(v.choices, function (k1, v1) {
                select1 +=
                    `<option value="${k1}">${v1[0]}</option>")`;
            });
        }
        if (v.name === "ticket_type") {
            $.each(v.choices, function (k1, v1) {
                select +=
                    `<option value="${v1}">${v1}</option>")`;
            });
        }

    });
    select = `${select}</select>`;
    select1 = `${select1}</select>`;
    $(".type").each(function () {
        var length = $(this).children('option').length;
        if (length === 0) {
            $(this).html(select);
        }
    });
    $(".status").each(function () {
        var length = $(this).children('option').length;
        if (length === 0) {
            $(this).html(select1);
        }
    });
}
function appendTicketFieldsOptions(resp) {
    var select = `<option disabled="disabled" selected>--Select--</option>`;
    $.each(resp, function (k, v) {
        select +=
            `<option value="${v.name}">${v.label}</option>")`;
    });
    select = `${select}</select>`;
    $(".ticket_field").each(function () {
        var length = $(this).children('option').length;
        if (length === 0)
            $(this).html(select);
    });

}
function removeAttrFn(id) {
    $("#" + id).removeAttr("state-text");
    $("#" + id).removeAttr("state");
}
function showErrorMsg(id, text) {
    $("#" + id).attr("state-text", text);
    $("#" + id).attr("state", "error");
}
function getTicketFileds(callback) {
    var domain = $("#domain").val();
    var api_key = $("#apiKey").val();
    var headers = { "Authorization": "Basic " + btoa(api_key) };
    var options = { headers: headers };
    var url = `https://${domain}/api/v2/ticket_fields`;
    client.request.get(url, options).then(function (data) {
        $("#authBtn").text("Authenticated");
        $(".authentication").hide();
        $(".next_page").show();
        try {
            resp = JSON.parse(data.response);

            callback(resp);
        } catch (error) {
            console.log(error)
            callback(null);
        }
    }, function (error) {
        console.log(error)
        handleError(error);
        callback(null);
    });
}
function formGetConfigs(resp) {
    var urlConfigLength = updateConfigs.URLConfigMap.length;
    if (urlConfigLength > 1) {
        for (var i = 1; i <= urlConfigLength - 1; i++) {
            var fakeId = (Math.random() * 10000).toFixed(0);
            appendUrlConfigUiGet(fakeId, updateConfigs.URLConfigMap[i], resp);
        }
    }
    $("#urlLink").val(updateConfigs.URLConfigMap[0].URL);
    $("#prefix").val(updateConfigs.URLConfigMap[0].params[0]);
    $("#ticket_field").val(updateConfigs.URLConfigMap[0].fields[0]).change();
    if (updateConfigs.URLConfigMap[0].params.length > 1) {
        appendParamsUi(updateConfigs.URLConfigMap[0], resp, $(`#second`));
    }
    appendTicketConfigUiGet(resp);
}
function appendTicketConfigUiGet(resp) {
    var TicketConfigLength = updateConfigs.ticketConfig.length;
    if (TicketConfigLength > 1) {
        for (var i = 1; i <= TicketConfigLength - 1; i++) {
            var fakeId = (Math.random() * 10000).toFixed(0);
            appendTicketUi(fakeId, updateConfigs.ticketConfig[i], resp);
        }
    }
    $("#type").val(updateConfigs.ticketConfig[0].type);
    $("#status").val(updateConfigs.ticketConfig[0].status);
    $("#url_ids").val(updateConfigs.ticketConfig[0].url_ids);
}
function appendTicketUi(fakeId, i, resp) {
    console.log(i)
    var html = `<div class="col-sm-12 ticketConfig" id="ticketConfig_${fakeId}">
    <div class="col-sm-3"><label class="">Type</label>
        <select class="form-control type" id="type_${fakeId}"></select>
    </div>
    <div class="col-sm-2"><label class="">Status</label>
        <select class="form-control status" id="status_${fakeId}"></select>
    </div>
    <div class="col-sm-3">
        <fw-textarea cols=37 rows=2 label="URL ID(s)" class="url_ids mt12" id="url_ids_${fakeId}" value="${i.url_ids}" state="normal">
        </fw-textarea>
    </div>
    <div class="col-sm-1 ml10">
        <fw-icon name="delete" size="17" class="mt36 delTypeConfig" id=delTypeConfig_${fakeId} color="red"></fw-icon>
    </div>
</div>`;
    $("#addTicketConfig").append(html);
    appendTicketTypesOptions(resp);
    $(`#status_${fakeId}`).val(i.status);
    $(`#type_${fakeId}`).val(i.type);
}
function buttonEnable() {
    $("#authBtn").text("Authenticate");
    $("#authBtn").prop("disabled", false);
}
function handleError(error) {
    $('.error_div').show();
    buttonEnable();
    if (error.status === 400) {
        $('.error_div').html("Invalid Input entered, please verify the fields and try again.");
    } else if (error.status === 401 || error.status === 403) {
        $('.error_div').html("Invalid Credentials were given or Subscription to the service expired.");
    } else if (error.status === 404) {
        $('.error_div').html("Invalid Domain entered, please check the field and try again");
    } else if (error.status === 500) {
        $('.error_div').html("Unexpected error occurred, please try after sometime.");
    } else if (error.status === 502) {
        $('.error_div').html("Error in establishing a connection.");
    } else if (error.status === 504) {
        $('.error_div').html("Timeout error while processing the request.");
    } else {
        $('.error_div').html("Unexpected Error");
    }
}