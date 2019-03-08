
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

const schema = {
  definitions: {
    person: {
      type: "object",
      properties: {
        first_name: {
          title: "Voornaam",
          type: "string"},
        last_name: {
          title: "Achternaam",
          type: "string"},
        email: {
          title: "E-mail", 
          type: "string",
          format: "email"
        }
      }
    }
  },
  title: "Pre-opdrachtfase",
  type: "object",
  properties: {
    project_information: {
      title: "Opdracht",
      description: "",
      type: "object",
      required: [
        "project_name"
      ],
      properties: {
        project_feature: {
          title: "Hoofdtype",
          type: "string",
          enum: [
            "ADO",
            "BGO",
            "HER",
            "GON"
          ],
          enumNames: [
            "Advies en Onderzoek",
            "Beheer en Groot Onderhoud",
            "Herinrichting",
            "Gebiedsontwikkeling en Nieuwbouw"
          ]
        },
        project_name: {
          type: "string",
          title: "Naam opdracht / project"
        },
        date_intake: {
          title: "Datum intake",
          type: "string",
          format: "date",
          default: today
        },
        date_start: {
          title: "Startdatum project",
          type: "string",
          format: "date",
          default: today
        },
        date_end: {
          title: "Einddatum project (indicatie)",
          type: "string",
          format: "date",
          default: today
        }
      }
    },
    client_information: {
      title: "Opdrachtgever",
      description: "",
      type: "object",
      required: [
        "main_client"
      ],
      properties: {
        organisation: {
          title: "Organisatie",
          type: "string",
          enum: [
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
          enumNames: [
            "Grond en Ontwikkeling",
            "Ruimte en Duurzaamheid",
            "Stadsdeel Centrum",
            "Stadsdeel Nieuw-West",
            "Stadsdeel Noord",
            "Stadsdeel Oost",
            "Stadsdeel West",
            "Stadsdeel Zuid",
            "Stadsdeel Zuidoost",
            "Verkeer en Openbare Ruimte - Stedelijk Beheer",
            "Verkeer en Openbare Ruimte - Ambtelijk OpdrachtGever",
            "Overig"
          ]
        },
        booking_code: {
          title: "Boekingscombinatie AFS (indien reeds bekend)",
          type: "string"
        },
        board_client: {
          title: "Bestuurlijk",
          type: "object",
          properties: {
            first_name: {
              title: "Voornaam",
              type: "string"},
            last_name: {
              title: "Achternaam",
              type: "string"},
          }
        },
        main_client: {
          title: "Opdrachtgeverschap",
          $ref: "#/definitions/person"
        },
        delegated_client_question: {
          title: "Gedelegeerd Opdrachtgever",
          type: "string",
          enum: [
            "Nee",
            "Ja"
          ],
          default: "Nee"
        }
      },
      dependencies: {
        delegated_client_question: {
          oneOf: [
            {
              properties: {
                delegated_client_question: {
                  enum: [
                    "Nee"
                  ]
                }
              }
            },
            {
              properties: {
                delegated_client_question: {
                  enum: [
                    "Ja"
                  ]
                },
                delegated_client: {
                  title: "Gedelegeerd",
                  $ref: "#/definitions/person"
                }
              }
            }
          ]
        }
      }
    },
    contractor_information: {
      title: "Opdrachtnemer",
      description: "",
      type: "object",
      required: [
        "projectmanager",
        "account"
      ],
      properties: {
        projectmanager: {
          title: "Opdrachtverantwoordelijke",
          $ref: "#/definitions/person"
        },
        section_projectmanager_question: {
          title: "Deelprojectleider",
          type: "string",
          enum: [
            "Nee",
            "Ja"
          ],
          default: "Nee"
        },
        controller: {
          title: "Projectbeheerser",
          $ref: "#/definitions/person"
        },
        account: {
            title: "Accounthouder/teamleider",
            type: "string",
            default: "account_holder",
            enum: [
              "account_holder",
              "teamleader"
            ],
            enumNames: [
              "Accounthouder",
              "Teamleider"
            ]
        }
      },
      dependencies: {
        account: {
          oneOf: [
            {
              properties: {
                account: {
                  enum: [
                    "account_holder"
                  ]
                },
                account_holder: {
                  title: "Accounthouder",
                  $ref: "#/definitions/person"
                }
              }
            },
            {
              properties: {
                account: {
                  enum: [
                    "teamleader"
                  ]
                },
                teamleader: {
                  title: "Teamleider",
                  $ref: "#/definitions/person"
                }
              }
            }
          ]
        },
        section_projectmanager_question: {
          oneOf: [
            {
              properties: {
                section_projectmanager_question: {
                  enum: [
                    "Nee"
                  ]
                }
              }
            },
            {
              properties: {
                section_projectmanager_question: {
                  enum: [
                    "Ja"
                  ]
                },
                section_projectmanager: {
                  title: "Deelprojectleider",
                  $ref: "#/definitions/person"
                }
              }
            }
          ]
        }
      }
    },
    assignment_structure: {
      title: "Opdrachtstructuur Timetell (tijdschrijven)",
      description: "De uren moeten worden verantwoord op één of meerdere werkorders. Elk werkorder valt onder een projectnummer.",
      type: "object",
      properties: {
        project_number_available: {
          title: "Bestaand projectnummer beschikbaar?",
          type: "string",
          enum: [
            "Nee",
            "Ja"
          ],
          default: "Nee"
        },
        work_orders: {
          title: "Namen voor werkorder(s)",
          type: "array",
          items: {
            type: "object",
            properties: {
              work_order: {
                title: "Werkordernaam",
                type: "string"
              }
            }
          }
        }
      },
      dependencies: {
        project_number_available: {
          oneOf: [
            {
              properties: {
                project_number_available: {
                  enum: [
                    "Nee"
                  ]
                }
              }
            },
            {
              properties: {
                project_number_available: {
                  enum: [
                    "Ja"
                  ]
                },
                existing_project_number: {
                  title: "Wat is het hoofdprojectnummer?",
                  type: "number"
                }
              }
            }
          ]
        }
      }
    },
    estimates: {
      title: "Indicatie projectkosten",
      type: "object",
      required: ["estimate_costs_budget_hours"],
      properties: {
        estimate_total_costs: {
          title: "Indicatie totale integrale projectkosten",
          description:"",
          type: "string",
          enum: [
                  0,
             500000, 
            1500000, 
            5000000
          ],
        enumNames: [
          "0-500k", 
          "500k-1.500k", 
          "1500k-5000k", 
          ">5000k"
          ]
        },
        estimate_costs_organisation: {
          title: "Indicatie totale inzet Ingenieursbureau",
          description: "Als onderdeel van totale integrale projectkosten",
          type: "string",
          enum: [
            "0-10k", 
            "10-50k", 
            "50-250k", 
            "250-1000k", 
            ">1000k"
          ],
        enumNames: [
          "0-10k", 
          "10-50k", 
          "50-250k", 
          "250-1000k", 
          ">1000k"
          ]
        },
        estimate_costs_budget_hours: {
          title: "Kostenindicatie inzet Ingenieursbureau",
          description: "Van \"pre-opdracht\" tot definitieve opdrachtverstrekking",
          type: "number"
        },
        document_capacity_estimate: {
          type: "string",
          format: "data-url",
          title: "Capaciteitsraming"
        }
      },
      dependencies: {
        estimate_costs_organisation: {
          oneOf: [
            {
              properties: {
                estimate_costs_organisation: {
                  enum: [
                    "10-50k", 
                    "50-250k", 
                    "250-1000k", 
                    ">1000k"
                  ]
                },
                approved_by_client: {
                  title: "Akkoord Opdrachtgever",
                  type: "boolean"
                }
              }
            },
            {
              properties: {
                estimate_costs_organisation: {
                  enum: [
                    "0-10k"
                  ]
                },
                approved_by_client_verbally: {
                  title: "Mondeling akkoord Opdrachtgever",
                  type: "boolean"
                }
              }
            }
          ]
        },
        estimate_costs_budget_hours: {
            oneOf: [
                {
                properties: {
                  estimate_costs_budget_hours: {
                    maximum: 10000
                  },
                  approved_by_client_verbally: {
                    title: "Mondeling akkoord Opdrachtgever",
                    type: "boolean"
                  }
                }
              },
              {
                properties: {
                  estimate_costs_budget_hours: {
                    minimum: 10001
                  },
                  approved_by_client: {
                    title: "Akkoord Opdrachtgever",
                    type: "boolean"
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
  project_information: {
    project_name: "",
    date_intake: today
  }
};

const uiSchema = {
  project_information: {
    date_start: {
      "ui:widget": "date",
      classNames: "col_left"
    },
    date_end: {
      "ui:widget": "date",
      classNames: "col_right"
    }
  },
  client_information: {
    board_client: {
      first_name: {
        classNames: "col_left"
      },
      last_name: {
        classNames: "col_right"
      }
    },
    main_client: {
      first_name: {
        classNames: "col_left"
      },
      last_name: {
        classNames: "col_right"
      }
    },
    delegated_client: {
      first_name: {
        classNames: "col_left"
      },
      last_name: {
        classNames: "col_right"
      }
    }
  },
  contractor_information: {
    "ui:order":[
          "projectmanager",
          "*",
          "section_projectmanager_question"
        ]
    ,
    projectmanager: {
      first_name: {
        classNames: "col_left"
      },
      last_name: {
        classNames: "col_right"
      }
    },
    controller: {
      first_name: {
        classNames: "col_left"
      },
      last_name: {
        classNames: "col_right"
      }
    },
    account_holder: {
      first_name: {
        classNames: "col_left"
      },
      last_name: {
        classNames: "col_right"
      }
    },
    teamleader: {                 
      first_name: {
        classNames: "col_left"
      },
      last_name: {
        classNames: "col_right"
      }
    },
    section_projectmanager: {            
      first_name: {
        classNames: "col_left"
      },
      last_name: {
        classNames: "col_right"
      }
    }
  }
};

class App extends Component {   
  const test = this.state.formData;
  console.log(test)
  render() {
    return(
      <Form schema={schema}
        formData={formData}
        uiSchema={uiSchema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")} />
    )
  }
}


export default App;