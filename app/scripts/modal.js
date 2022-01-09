$(document).ready(function () {
    app.initialized().then(getClient).catch(handleErr);
});

function getClient(_client) {
    window.mpdalClient = _client;
    var getContext = mpdalClient.instance.context();
    getContext.then(showContext).catch(handleErr);
    var getIparams = mpdalClient.iparams.get();
    getIparams.then(showIparams).catch(handleErr);
    var ticketData;
    function showContext(payload) {
        console.log(payload.data);
        ticketData = payload.data;
    }
    function showIparams(payload) {
        // console.log(payload.ticketConfig);
        // console.log("Type=> ", ticketData.type)
        // console.log("Status=> ", ticketData.status)
        if (ticketData.type !== null) {
            var matchFlag = false;
            $.each(payload.ticketConfig, function (key, value) {
                // console.log("itype=> ", value.type, "istatus=>", value.status);
                if (value.type === ticketData.type && value.status === ticketData.status) {
                    console.log("matched type and status=> ", value.type, value.status)
                    displayFormUrls(payload, ticketData, value.url_ids);
                    matchFlag = true;
                }
            });
            if (!matchFlag)
                $("#errorDisplay").html("No URLs configured for current Ticket Type & Status");
        } else {
            $("#errorDisplay").html("No Type configured for the current ticket");
        }

    }
    function displayFormUrls(payload, ticketData, url_ids) {
        console.log("Dddddddddddddddddddddddddd")
        // console.log(payload)
        console.log(url_ids)
        var html = ``;
        $.each(payload.URLConfigMap, function (key, value) {
            $.each(url_ids.split(","), function (key1, value1) {
                if (key + 1 == value1) {
                    console.log(value)
                    formDefaultFields(ticketData, value, html);
                }
            });
        });

    }
}
function formDefaultFields(ticketData, value, html) {
    var paramUrl = '';
    console.log(value.fields.join("&"))
    console.log(ticketData["group_id"])
    $.each(value.params, function (key1, value1) {
        $.each(value.fields, function (key2, value2) {
            if (key1 == key2) {
                if (key2 === value.fields.length - 1) {
                    if (value2 === "ticket_type") {
                        console.log(ticketData["type"])
                        paramUrl += value1 + "=" + ticketData["type"];
                    } else if (value2 === "group") {
                        paramUrl += value1 + "=" + ticketData["group_id"];
                    } else if (value2 === "agent") {
                        console.log("***********************")
                        paramUrl += value1 + "=" + ticketData["responder_id"];

                    } else if (value2 === "internal_group") {
                        paramUrl += value1 + "=" + ticketData["internal_group_id"];

                    } else if (value2 === "requester") {
                        paramUrl += value1 + "=" + ticketData["requester_id"];

                    } else if (value2 === "internal_agent") {
                        paramUrl += value1 + "=" + ticketData["internal_agent_id"];

                    } else if (value2 === "product") {
                        paramUrl += value1 + "=" + ticketData["product_id"];

                    }
                    else if (value2 === "company") {
                        paramUrl += value1 + "=" + ticketData["company_id"];

                    } else if (ticketData[value2] === undefined) {
                        console.log(ticketData.customFields[value2])
                        paramUrl += value1 + "=" + ticketData.customFields[value2];

                    } else {
                        console.log(ticketData[value2])
                        paramUrl += value1 + "=" + ticketData[value2];
                    }
                } else {
                    if (value2 === "ticket_type") {
                        console.log(ticketData["type"] + "&")
                        paramUrl += value1 + "=" + ticketData["type"] + "&";
                    } else if (value2 === "group") {
                        paramUrl += value1 + "=" + ticketData["group_id"] + "&";
                    } else if (value2 === "agent") {
                        paramUrl += value1 + "=" + ticketData["responder_id"] + "&";

                    } else if (value2 === "internal_group") {
                        paramUrl += value1 + "=" + ticketData["internal_group_id"] + "&";

                    } else if (value2 === "requester") {
                        paramUrl += value1 + "=" + ticketData["requester_id"] + "&";

                    } else if (value2 === "internal_agent") {
                        paramUrl += value1 + "=" + ticketData["internal_agent_id"] + "&";

                    } else if (value2 === "product") {
                        paramUrl += value1 + "=" + ticketData["product_id"] + "&";

                    } else if (value2 === "company") {
                        paramUrl += value1 + "=" + ticketData["company_id"] + "&";

                    } else if (ticketData[value2] === undefined) {
                        paramUrl += value1 + "=" + ticketData.customFields[value2] + "&";
                    } else {
                        paramUrl += value1 + "=" + ticketData[value2] + "&";

                    }
                }
            }

        });

    });
    formUrl = value.URL + '?' + 'fd=' + ticketData.id + "&" + paramUrl
    html += `<li> <a href='${formUrl}' target='_blank' rel='noreferrer'>${formUrl}</a></li>`
    $('ul').append(html);
}

function handleErr(err) {
    $("#errorDisplay").html(err);
}