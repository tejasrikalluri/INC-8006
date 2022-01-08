var lodash = require("lodash");
exports = {
  fetchTicketFields: function (args) {
    var headers = { "Authorization": "Basic <%= encode(iparam.api_key) %>" };
    var options = { headers: headers };
    var url = "https://<%= iparam.domain %>/api/v2/tickets/" + args.id;
    $request.get(url, options).then(function (data) {
      try {
        var resp = JSON.parse(data.response), customFields = {};
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        console.log(resp.custom_fields)
        for (let j = 0; j < resp.custom_fields.length; j++) {
          // customFields.push(resp[i]);
        }
        for (const property in resp.custom_fields) {
          console.log(`${property}: ${resp.custom_fields[property]}`);
          // resp["customized_custom_fields"][lodash.unescape(property)] = resp.custom_fields[property];
          let contactFieldVal = lodash.unescape(property);
          console.log("IIIIIIIIIIIIII")
          console.log(contactFieldVal)
          if (contactFieldVal !== null && contactFieldVal !== undefined && contactFieldVal !== "") {
            customFields[contactFieldVal] = resp.custom_fields[property];
          } else {
            customFields = "N/A";
          }
        }
        console.log(customFields)
        resp["customFields"] = customFields;
        // customFields = customFields.filter(function (el) {
        //   return lodash.unescape(el.name);
        // });
        // var obj = {
        //   defaultFields: defaultFields, customFields: customFields
        // }
        renderData(null, {
          finalResult: resp
        });
      } catch (error) {
        console.log(error)
      }
    }, function () {
      renderData(null, {
        finalResult: null
      });
    });
  }
};