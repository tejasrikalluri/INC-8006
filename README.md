## Freshdesk App Project

Congratulations on creating your App Project! Feel free to replace this text with your project description.

### App features
o	to configure the link(s) and link name(s) and associated ticket ‘Type’ and ‘Status’
o	more than one link can be configured for every ‘Type’ and ‘Status’ combination
o	to select the required ticket field(s) and populate selected field value in the associated link as URL parameters
Example: https://www.canterbury.gov.uk/forms/12345?fd={{ticket id}}&ref={{form reference}}
o	Link(s) should be prefixed with ‘http’ or ‘https’


3) The app should also include the option to fetch ticket field values and populate them in the link as URL parameters as seen in the examples below. This functionality should be available for normal tickets as well as service tasks
https://forms.canterbury.gov.uk/xfp/form/804?fd={{ticket id}}&ref={{form reference}}
https://forms.canterbury.gov.uk/jadu/xforms2/internal?formID=804&userFormID=-1&fd={{ticket id}}&ref={{form reference}}
https://www.canterbury.gov.uk/forms/12345?fd={{ticket id}}&ref={{form reference}}
https://www.canterbury.gov.uk/forms/internal/12345?fd={{ticket id}}&ref={{form reference}}
https://apps.canterbury.gov.uk/booking?fd={{ticket id}}&ref={{form reference}}&cal={{some kind of ID}}&ts={{timeslot}}&type={{appointment type}}

Configure URL Number, Name and Parameters:
Number (numeric field)                 Name (text box) (provide Add button to add more Name & Parameter combinations
Parameter prefix (text box) , ticket field (dropdown with list of available ticket fields)

Number:                             Name:       


Parameter prefix:          Ticket Field:            




Configure ticket Type, Status and associated URL numbers (separated by comma):
Type (dropdown)	     Status (dropdown)          URL Numbers (multiline text box)
-	Provide Add (+) button to configure multiple Type and Status

Note: URL names should be prefixed with http or https



### Project folder structure explained

    .
    ├── README.md                  This file.
    ├── config                     Installation parameter configs.
    │   ├── iparams.json           Installation parameter config in English language.
    │   └── iparam_test_data.json  Installation parameter data for local testing.
    └── manifest.json              Project manifest.
    └── server                     Business logic for remote request and event handlers.
        ├── lib
        │   └── handle-response.js
        ├── server.js
        └── test_data
            ├── onAppInstall.json
            ├── onAppUninstall.json
            ├── onContactCreate.json
            ├── onContactUpdate.json
            ├── onConversationCreate.json
            ├── onExternalEvent.json
            ├── onTicketCreate.json
            └── onTicketUpdate.json
