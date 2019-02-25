import React, { Component } from 'react';

import Form from "react-jsonschema-form";
  
// import logo from './logo.svg';
import './App.css';

const log = (type) => console.log.bind(console, type);
  
let today = new Date();
let dd = today.getDate();

let mm = today.getMonth()+1; 
const yyyy = today.getFullYear();
if(dd<10) 
{
    dd=`0${dd}`;
} 

if(mm<10) 
{
    mm=`0${mm}`;
} 
today = `${yyyy}-${mm}-${dd}`;
console.log(today);


const schema = {
  "title": "Verkrijgen Project- en werkordernummers",
  "type": "object",
  "properties": {
    "project_information": {
      "title": "Opdracht",
      "description": "",
      "type": "object",
      "required": [
        "project_name"
      ],
      "properties": {
        "project_feature": {
          "title": "Kenmerk opdracht IB",
          "type": "string",
          "enum": [
            "BGO",
            "HER",
            "GON",
            "ADO",
            "Other"
          ],
          "enumNames": [
            "Beheer en Groot Onderhoud",
            "Herinrichting",
            "Gebiedsontwikkeling en Nieuwbouw",
            "Advies en Onderzoek",
            "Overig"
          ]
        },
        "project_name": {
          "type": "string",
          "title": "Naam"
        },
        "date_intake": {
          "title": "Datum intake",
          "type": "string",
          "format": "date",
          "default": today
        }
      }
    },
    "client_information": {
      "title": "Opdrachtgever",
      "description": "",
      "type": "object",
      "required": [
        "main_client"
      ],
      "properties": {
        "organisation": {
          "title": "Opdrachtgevende organisatie",
          "type": "string",
          "enum": [
            "SD",
            "V&OR",
            "GenO",
            "Other"
          ],
          "enumNames": [
            "Stadsdelen",
            "Verkeer en Openbare Ruimte",
            "Grond en Ontwikkeling",
            "Overig"
          ]
        },
        "board_client": {
          "title": "Bestuurlijk",
          "type": "string"
        },
        "main_client": {
          "title": "Ambtelijk",
          "type": "string"
        },
        "sub_client": {
          "title": "Gedelegeerd",
          "type": "string"
        }
      }
    },
    "contractor_information": {
      "title": "Opdrachtnemer",
      "description": "",
      "type": "object",
      "required": [
        "projectmanager"
      ],
      "properties": {
        "projectmanager": {
          "title": "Naam Opdrachtverantwoordelijke IB",
          "type": "string"
        },
        "projectmanager_email": {
          "title": "E-mail Opdrachtverantwoordelijke IB",
          "type": "string",
          "format": "email"
        },
        "sub_projectleider": {
          "title": "Naam Deelprojectleider IB",
          "type": "string"
        },
        "sub_projectleider_email": {
          "title": "E-mail Deelprojectleider IB",
          "type": "string",
          "format": "email"
        },
        "controller": {
          "title": "Naam Projectbeheerser IB",
          "type": "string"
        },
        "controller_email": {
          "title": "E-mail Projectbeheerser IB",
          "type": "string",
          "format": "email"
        },
        "account_holder": {
          "title": "Naam Verantwoordelijk accounthouder en/of teamleider IB",
          "type": "string"
        },
        "account_holder_email": {
          "title": "E-mail Verantwoordelijk accounthouder en/of teamleider IB",
          "type": "string",
          "format": "email"
        }
      }
    },
    "assignment_structure": {
      "title": "Opdrachtstructuur",
      "description": "namen van te verkrijgen TT-nummers",
      "type": "object",
      "properties": {
        "work_orders": {
          "title": "Namen voor werkorder(s) (n keer)",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "work_order": {
                "title": "Werkordernaam",
                "type": "string"
              }
            }
          }
        },
        "project_number_available": {
          "title": "Bestaand projectnummer beschikbaar?",
          "type": "string",
          "enum": [
            "Nee",
            "Ja"
          ],
          "default": "Nee"
        }
      },
      "dependencies": {
        "project_number_available": {
          "oneOf": [
            {
              "properties": {
                "project_number_available": {
                  "enum": [
                    "Nee"
                  ]
                }
              }
            },
            {
              "properties": {
                "project_number_available": {
                  "enum": [
                    "Ja"
                  ]
                },
                "existing_project_number": {
                  "title": "Wat is het hoofdprojectnummer?",
                  "type": "number"
                }
              }
            }
          ]
        }
      }
    },
    "estimates": {
      "title": "Indicatie capaciteit",
      "type": "object",
      "properties": {
        "estimate_costs_budget_hours": {
          "title": "Voorlopig budget uren IB (bedrag)",
          "type": "number"
        },
        "estimate_total_costs": {
          "title": "Indicatiebedrag totale kosten gehele opdracht (niet alleen uren IB)",
          "description": "Handtekening vereist >10.000",
          "type": "number"
        }
      },
      "dependencies": {
        "estimate_total_costs": {
          "oneOf": [
              {
              "properties": {
                "estimate_total_costs": {
                  "maximum": 10000
                },
                "approved_by_client_verbally": {
                  "title": "Mondeling akkoord Opdrachtgever",
                  "type": "boolean"
                }
              }
            },
            {
              "properties": {
                "estimate_total_costs": {
                  "minimum": 10001
                },
                "approved_by_client": {
                  "title": "Akkoord Opdrachtgever",
                  "type": "boolean"
                }
              }
            }
          ]
        }
      }
    }
  }
}


const formData = {
   "project_name": "Projectnaam",
   "date_intake": today
};

class App extends Component {  

  render() {
    return(
      <Form schema={schema}
        formData={formData}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")} />
    )
  }
}

export default App;