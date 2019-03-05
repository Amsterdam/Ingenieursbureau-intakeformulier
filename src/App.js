
import React, { Component } from 'react';

import Form from "react-jsonschema-form";
  
// import logo from './logo.svg';
import './App.css';

const log = (type) => console.log.bind(console, type);
  
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; 
const yyyy = today.getFullYear();

// Add preleading zeros in dates
if (dd < 10) {
    dd = `0${dd}`;
} 

if (mm < 10) {
    mm=`0${mm}`;
} 

today = `${yyyy}-${mm}-${dd}`;

console.log(today);

var pre_project_name = {$ref: "#pre_opdrachtfase/project_information/project_name"}

const schema = {
  "definitions": {
    "person": {
      "type": "object",
      "properties": {
        "first_name": {
          "title": "Voornaam",
          "type": "string"},
        "last_name": {
          "title": "Achternaam",
          "type": "string"},
        "email": {
          "title": "E-mail", 
          "type": "string",
          "format": "email"
        }
      }
    }
  },
  "title": "Pre-opdrachtfase",
  "id": "pre_project_phase",
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
          "title": "Type",
          "type": "string",
          "enum": [
            "ADO",
            "BGO",
            "HER",
            "GON",
            "Other"
          ],
          "enumNames": [
            "Advies en Onderzoek",
            "Beheer en Groot Onderhoud",
            "Herinrichting",
            "Gebiedsontwikkeling en Nieuwbouw",
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
          "title": "Organisatie",
          "type": "string",
          "enum": [
            "GenO",
            "R&D",
            "SD-C",
            "SD-N",
            "SD-NW",
            "SD-O",
            "SD-W",
            "SD-Z",
            "SD-ZO",
            "V&OR-SB",
            "V&OR-AOG",
            "Other"
          ],
          "enumNames": [
            "Grond en Ontwikkeling",
            "Ruimte en Duurzaamheid",
            "Stadsdeel Centrum",
            "Stadsdeel Nieuw-West",
            "Stadsdeel Noord",
            "Stadsdeel Oost",
            "Stadsdeel West",
            "Stadsdeel Zuid",
            "Stadsdeel Zuidoost",
            "Verkeer en Openbare Ruimte - Stedelijk beheer",
            "Verkeer en Openbare Ruimte - Ambtelijk OpdrachtGever",
            "Overig"
          ]
        },
        "board_client": {
          "title": "Bestuurlijk",
          "$ref": "#/definitions/person"
        },
        "main_client": {
          "title": "Ambtelijk",
          "$ref": "#/definitions/person"
        },
        "sub_client": {
          "title": "Gedelegeerd",
          "$ref": "#/definitions/person"
        }
      }
    },
    "contractor_information": {
      "title": "Opdrachtnemer",
      "description": "",
      "type": "object",
      "required": [
        "projectmanager",
        "account"
      ],
      "properties": {
        "projectmanager": {
          "title": "Opdrachtverantwoordelijke",
          "$ref": "#/definitions/person"
        },
        "sub_projectleider": {
          "title": "Deelprojectleider",
          "$ref": "#/definitions/person"
        },
        "controller": {
          "title": "Projectbeheerser",
          "$ref": "#/definitions/person"
        },
        "account": {
            "title": "Accounthouder/teamleider",
            "type": "string",
            "default": "account_holder",
            "enum": [
              "account_holder",
              "teamleader"
            ],
            "enumNames": [
              "Accounthouder",
              "Teamleider"
            ]
        }
      },
      "dependencies": {
        "account": {
          "oneOf": [
            {
              "properties": {
                "account": {
                  "enum": [
                    "account_holder"
                  ]
                },
                "account_holder": {
                  "title": "Accounthouder",
                  "$ref": "#/definitions/person"
                }
              }
            },
            {
              "properties": {
                "account": {
                  "enum": [
                    "teamleader"
                  ]
                },
                "teamleader": {
                  "title": "Teamleider",
                  "$ref": "#/definitions/person"
                }
              }
            }
          ]
        }
      }
    },
    "assignment_structure": {
      "title": "Opdrachtstructuur",
      "description": "Namen voor boekingsnummers te verkrijgen uit Timetell.",
      "type": "object",
      "properties": {
        "project_number_available": {
          "title": "Bestaand projectnummer beschikbaar?",
          "type": "string",
          "enum": [
            "Nee",
            "Ja"
          ],
          "default": "Nee"
        },
        "work_orders": {
          "title": "Namen voor werkorder(s)",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "work_order": {
                "title": "Werkordernaam",
                "type": "string",
                "default": pre_project_name.value
              }
            }
          }
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
          "title": "Indicatie totale inzet IB (als onderdeel van totale kosten opdracht)",
          "description":"",
          "type": "string",
          "enum": [
            "0-10k", 
            "10-50k", 
            "50-250k", 
            "250-1000k", 
            ">1000k"
          ],
        "enumNames": [
          "0-10k", 
          "10-50k", 
          "50-250k", 
          "250-1000k", 
          ">1000k"
          ]
        },
      },
      "dependencies": {
        "estimate_total_costs": {
          "oneOf": [
            {
              "properties": {
                "estimate_total_costs": {
                  "enum": [
                    "10-50k", 
                    "50-250k", 
                    "250-1000k", 
                    ">1000k"
                  ]
                },
                "approved_by_client": {
                  "title": "Akkoord Opdrachtgever",
                  "type": "boolean"
                }
              }
            },
            {
              "properties": {
                "estimate_total_costs": {
                  "enum": [
                    "0-10k"
                  ]
                },
                "approved_by_client_verbally": {
                  "title": "Mondeling akkoord Opdrachtgever",
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

//const uiSchema = {
//  "ui:order": [
//    "firstName",
//    "lastName",
//    "*",
//    "password"
//  ]
//}

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