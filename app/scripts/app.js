document.onreadystatechange = function () {
  if (document.readyState === 'interactive') renderApp();

  function renderApp() {
    var onInit = app.initialized();

    onInit.then(getClient).catch(handleErr);

    function getClient(_client) {
      window.client = _client;
      client.events.on('app.activated', onAppActivate);
    }
  }
};

function onAppActivate() {
  var getTicket = client.data.get('ticket');
  getTicket.then(showTicket).catch(handleErr);

  function showTicket(payload) {
    viewATicket(payload.ticket.id);
  }
}
function viewATicket(id) {
  let options = {
    id: id
  };
  client.request.invoke("fetchTicketFields", options).then(function (data) {
    var requiredData = data.response.finalResult;
    if (requiredData !== null) {
      console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOO")
      client.interface.trigger("showModal", {
        title: "Form URL(s)",
        template: "scripts/modal.html",
        data: requiredData
      });
    }
  }, function (error) {
    console.log(error);
  });
  // var headers = { "Authorization": "Basic <%= encode(iparam.api_key) %>" };
  // var options = { headers: headers };
  // var url = "https://<%= iparam.domain %>/api/v2/tickets/" + id;
  // client.request.get(url, options).then(function (data) {
  //   try {
  //     var resp = JSON.parse(data.response);
  //     client.interface.trigger("showModal", {
  //       title: "Form URL(s)",
  //       template: "scripts/modal.html",
  //       data: resp
  //     });
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, function (error) {
  //   console.log(error);
  // });
}
function handleErr(err) {
  console.error(`Error occured. Details:`, err);
}
