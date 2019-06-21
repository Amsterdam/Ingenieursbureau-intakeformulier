
import React, { Component } from 'react';

// import update from 'react-addons-update';
import update from 'immutability-helper';
import Form from "react-jsonschema-form";
import ReactJson from 'react-json-view';
//import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
 

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

const pre_project_schema = {
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
    },   
    order_code: {
      type: "object",
      properties: {
        business_unit: {
          title: "Bedrijfseenheid",
          type: "string"},
        main_account: {
          title: "Hoofdrekening",
          type: "string"},
        work_order: {
          title: "Werkorder", 
          type: "string",
          format: "email"
        }
      }
    }
  },
  title: "Pre-opdrachtfase",
  type: "object",
  properties: {
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
          title: "Boekingscombinatie AFS",
          $ref: "#/definitions/order_code"
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
              type: "string"}
          }
        },
        main_client: {
          title: "Ambtelijk",
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
    project_information: {
      title: "Opdracht",
      description: "",
      type: "object",
      required: [
        "project_name"
      ],
      properties: {
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
        },
        project_feature: {
          title: "Hoofdtype",
          type: "string",
          enum: [
            "maintenance",
            "improvement",
            "renovation",
            "new"
          ],
          enumNames: [
            "Instandhouding/Groot onderhoud",
            "Verbeterprogramma's",
            "Herinrichting",
            "Nieuwe aanleg"
          ]
        },
      },
      dependencies: {
        project_feature: {
          oneOf: [
            {
              properties: {
                project_feature: {
                  enum: [
                    "maintenance"
                  ]
                },
                project_subfeature: {
                  title: "Subtype",
                  type: "string",
                  enum: [
                    "Hoofdnet",
                    "Openbare verlichting",
                    "Kademuren",
                    "Groen",
                    "VRI/VIS/VM",
                    "Bruggen",
                    "Verharding woonbuurt",
                    "Civiele constructies woonbuurt",
                    "Integraal groot onderhoud woonbuurt"
                  ],
                  enumNames: [
                    "Hoofdnet",
                    "Openbare verlichting",
                    "Kademuren",
                    "Groen",
                    "VRI/VIS/VM",
                    "Bruggen",
                    "Verharding woonbuurt",
                    "Civiele constructies woonbuurt",
                    "Integraal groot onderhoud woonbuurt"
                  ]
                }
              }
            },
            {
              properties: {
                project_feature: {
                  enum: [
                    "improvement"
                  ]
                },
                project_subfeature: {
                  title: "Subtype",
                  type: "string",
                  enum: [
                    "Elektrisch vervoer hubs",
                    "Autoluw",
                    "Fiets",
                    "Verkeersveiligheid",
                    "IAOV"
                  ],
                  enumNames: [
                    "Elektrisch vervoer hubs",
                    "Autoluw",
                    "Fiets",
                    "Verkeersveiligheid",
                    "IAOV"
                  ]
                }
              }
            },
            {
              properties: {
                project_feature: {
                  enum: [
                    "renovation"
                  ]
                },
                project_subfeature: {
                  title: "Subtype",
                  type: "string",
                  enum: [
                    "Complexe/integrale herinrichting",
                    "Stationslocaties",
                    "Woonbuurt",
                    "Hoofdnet",
                    "Park, plein, speelplaats"
                  ],
                  enumNames: [
                    "Complexe/integrale herinrichting",
                    "Stationslocaties",
                    "Woonbuurt",
                    "Hoofdnet",
                    "Park, plein, speelplaats"
                  ]
                }
              }
            },
            {
              properties: {
                project_feature: {
                  enum: [
                    "new"
                  ]
                },
                project_subfeature: {
                  title: "Subtype",
                  type: "string",
                  enum: [
                    "Parkeergebouwen",
                    "Hoofdnet",
                    "Civiele constructies",
                    "Zuidasdok",
                    "Sport",
                    "Advisering gebiedsontwikkeling",
                    "Ondergronds afval",
                    "HOV",
                    "Bouwrijp maken",
                    "Woningrijp maken"
                  ],
                  enumNames: [
                    "Parkeergebouwen",
                    "Hoofdnet",
                    "Civiele constructies",
                    "Zuidasdok",
                    "Sport",
                    "Advisering gebiedsontwikkeling",
                    "Ondergronds afval",
                    "HOV",
                    "Bouwrijp maken",
                    "Woningrijp maken"
                  ]
                }
              }
            }
          ]
        }
      }
    },
    contractor_information: {
      title: "Opdrachtverantwoordelijke",
      description: "",
      type: "object",
      required: [
        "projectmanager",
        "account"
      ],
      properties: {
        projectmanager: {
          title: "Projectleider",
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
          title: "Bestaand projectnummer",
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
              work_order_prefix: {
                title: "Project",
                type: "string"
              },
              work_order_name: {
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
                  title: "Hoofdprojectnummer",
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
            0, 
            10000, 
            50000, 
            250000, 
            1000000
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
      }
    },
    project_approval: {
      title: "Akkoord pre-opdracht",
      description: "Mondeling tot 10.000 anders schriftelijk",
      type: "object",
      properties: {
        date_approval_preproject: {
          title: "Datum akkoord",
          type: "string",
          format: "date",
          default: today
        },
        approved_preproject_comments: {
          title: "Opmerking",
          type: "string"
        },
        approved_preproject_client: {
          title: "Akkoord Opdrachtgever",
          type: "boolean"
        },
        document_approval_client: {
          type: "string",
          format: "data-url",
          title: "E-mail bevestiging akkoord"
        },
      },
      dependencies: {
        estimate_costs_budget_hours: {
          oneOf: [
              {
              properties: {
                estimatesestimate_costs_budget_hours: {
                  minimum: 0,
                  maximum: 10000
                },
                approved_by_client: {
                  title: "Mondeling akkoord Opdrachtgever"
                }
              }
            },
            {
              properties: {
                estimate_costs_budget_hours: {
                  minimum: 10001
                },
                approved_by_client: {
                  title: "Schriftelijk akkoord Opdrachtgever"
                }
              }
            },
          ]
        }
      }
    }
  }
}

const project_schema = {
  title: "Opdrachtfase",
  type: "object",
  properties: {
    project_cost_recoveries: {
      title: "Dekking van kosten",
      description: "Indien projectplan opgesteld; zie daar voor details/onderbouwing.",
      type: "object",
      required: [
        "available_budget_client"
      ],
      properties: {
        available_budget_client: {
          type: "number",
          title: "Budget opdrachtgever"
        },
        cost_recoveries: {
          title: "Type dekkingsbronnen",
          type: "array",
          items: {
            type: "object",
            properties: {
              cost_recovery: {
                title: "Dekkingsbron",
                type: "string"
              }
            }
          }
        }
      }
    },
    programme_identification_numbers: {
      title: "Programma identificatienummers",
      type: "object",
      properties: {
        project_id_mip: {
          title: "Meerjaren Investeringsprogramma (MIP)",
          description: "https://maps.amsterdam.nl/mip/",
          type: "string"
        },
        project_id_grex: {
          title: "Grondexploitatie (GREX)",
          type: "string"
        }
      }
    },
    project_identification_numbers: {
      title: "Project identificatienummers",
      type: "object",
      properties: {
        project_id_cora: {
          title: "Coordinatie Openbare Ruimte Amsterdam (CORA)",
          description: "https://cora.ivv.amsterdam.nl/cora",
          type: "string"
        },
        project_id_digital_workplans: {
          title: "Digitale Werkplannen",
          description: "https://statistiek.data.amsterdam.nl/#/site/Amsterdam/views/Kaartprojecten/kaartprojecten",
          type: "string"
        }
      }
    },
    project_information: {
      title: "Opdrachtbeschrijving",
      description: "Benut bij intake en werk uit voor de definitieve opdracht. Indien projectplan opgesteld, uitwerking daar.",
      type: "object",
      required: [
        "project_reason"
      ],
      properties: {
        project_reason: {
          type: "string",
          title: "Aanleiding"
        },
        project_goal: {
          type: "string",
          title: "Doel"
        },
        project_result: {
          type: "string",
          title: "Resultaat"
        },
        project_definition: {
          type: "string",
          title: "Afbakening"
        }
      }
    },
    project_expected_budget: {
      title: "Geraamde kosten",
      description: "Indien projectplan opgesteld; zie daar voor details/onderbouwing. Deze raming vervangt de (eventuele) eerdere afgegeven indicatie",
      type: "object",
      required: [
        "project_budget_contactor"
      ],
      properties: {
        project_budget_total: {
          type: "number",
          description: "SSK investeringskostenraming",
          title: "Totale integrale projectkosten"
        },
        project_budget_contactor: {
          type: "number",
          description: "Opdrachtbudget",
          title: "Kosten Ingenieursbureau"
        },
        project_budget_external_contactors: {
          type: "number",
          title: "Kosten inkoop werk van derden"
        }
      }
    },
    project_through_put_time: {
      title: "Doorlooptijd",
      type: "object",
      properties: {
        date_start: {
          title: "Van",
          type: "string",
          format: "date",
          default: today
        },
        date_end: {
          title: "Tot",
          type: "string",
          format: "date",
          default: today
        }
      }
    },
    project_milestones: {
      title: "Mijlpalen en producten",
      description: "Indien projectplan opgesteld; zie daar voor details/onderbouwing.",
      type: "object",
      properties: {
        milestones: {
          title: "Hoofdmijlpalen",
          type: "array",
          items: {
            type: "object",
            properties: {
              milestone: {
                title: "Mijlpaal",
                type: "string"
              }
            }
          }
        },
        products: {
          title: "Producten",
          type: "array",
          items: {
            type: "object",
            properties: {
              product: {
                title: "Product",
                type: "string"
              }
            }
          }
        },
        project_file: {
          title:  "Projectdossier",
          type: "string",
          format: "data-url"
        }
      }
    },
    project_risks: {
      title: "Risico's",
      description: "Indien projectplan wordt gemaakt, alleen kort samenvatten.",
      type: "object",
      properties: {
        financial_risks: {
          title: "Geld",
          type: "array",
          items: {
            type: "object",
            properties: {
              financial_risk: {
                title: "Financieel",
                type: "string"
              }
            }
          }
        },
        time_risks: {
          title: "Tijd",
          type: "array",
          items: {
            type: "object",
            properties: {
              time_risk: {
                title: "Tijd",
                type: "string"
              }
            }
          }
        },
        technical_risks: {
          title: "Technisch",
          type: "array",
          items: {
            type: "object",
            properties: {
              technical_risk: {
                title: "Technisch",
                type: "string"
              }
            }
          }
        },  
        political_risks: {
          title: "Politiek/bestuurlijk",
          type: "array",
          items: {
            type: "object",
            properties: {
              technical_risk: {
                title: "Politiek/bestuurlijk",
                type: "string"
              }
            }
          }
        },
        social_risks: {
          title: "Maatschappelijk/omgeving",
          type: "array",
          items: {
            type: "object",
            properties: {
              social_risk: {
                title: "Maatschappelijk/omgeving",
                type: "string"
              }
            }
          }
        }
      }
    },
    project_context: {
      title: "Complexiteit",
      type: "object",
      properties: {
        project_strategy: {
          title: "Markt/contractstrategie",
          description: "Denk hierbij aan bijvoorbeeld EMVI (Gunnen op waarde)",
          type: "string"
        },
        needed_compentency: {
          title: "Gevraagde bijzondere competenties en kennis",
          type: "array",
          items: {
            type: "object",
            properties: {
              compentence: {
                title: "Competentie/kennis",
                type: "string"
              }
            }
          }
        }
      }
    },
    project_plan: {
      title: "Bijlagen",
      type: "object",
      properties: {
        project_plan_files: {
          title: "Documentie",
          description: "Voeg projectplan toe (bij uren > € 50.000 verplicht), inclusief capaciteitsraming en overige bijlagen",
          type: "array",
          items: {
            type: "object",
            properties: {
              document: {
                title: "Document",
                type: "string",
                format: "data-url"
              }
            }
          } 
        }
      }
    },
    project_approval: {
      title: "Akkoord opdracht",
      description: "",
      type: "object",
      properties: {
        date_approval_project: {
          title: "Datum akkoord",
          type: "string",
          format: "date",
          default: today
        },
        document_approval_note: {
          type: "string",
          title: "Opmerking"
        },
        approved_by_client: {
          title: "Akkoord Opdrachtgever",
          type: "boolean"
        },
        document_approval_client: {
          type: "string",
          format: "data-url",
          title: "E-mail bevestiging akkoord"
        }
      }
    }
  }
}

const project_uiSchema = {
  "project_information": {
    "project_reason": {
      "ui:widget": "textarea"
    },
    "project_goal": {
      "ui:widget": "textarea"
    },
    "project_result": {
      "ui:widget": "textarea"
    },
    "project_definition": {
      "ui:widget": "textarea"
    }
  }
}

const pre_project_uiSchema = {
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
  assignment_structure: {
    work_orders: {
      items: {
        classNames: "workorder",
        work_order_prefix: {
          "ui:readonly": true,
          classNames: "col_left"
        },
        work_order_name: {
          classNames: "col_right"
        }
      }
    }
  },
  client_information: {
    booking_code: {
      business_unit:{
        classNames: "col_3"
      },
      main_account:{
        classNames: "col_3"
      },
      work_order:{
        classNames: "col_3"
      }
    },
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
  },
};


class App extends Component {

  state = { formData: {} }

  handleSubmit = data => {
    this.setState({ formData: data.formData, submitted: true })
  }

  handleChange = data => {  
    const formData = data.formData
    // 1. Make a shallow copy of the items
    let items = formData.assignment_structure.work_orders
    // Fix undefined error
    if (items) {
      // copy object, prevent mutations
      const project_name = formData.project_information.project_name;
      const newItems = items.map(work_order => {
        return {
          ...work_order,
          work_order_prefix : project_name
        }
      });
      this.setState({formData: update(formData, {assignment_structure: {work_orders : {$set: newItems}}})});
    } else {
      this.setState({ formData: data.formData })
    }
  }
  render () {
    const { submitted, formData } = this.state;

    const content = submitted
    ? (<div>
        <h1>Te versturen informatie:</h1> 
        <ReactJson src={formData} />
      </div>)
    : (<div>
        <Tabs>
          <TabList>
            <Tab>Pre-opdracht</Tab>
            <Tab>Opdracht</Tab>
          </TabList>
          <TabPanel>
            <Form 
              schema={pre_project_schema}
              uiSchema={pre_project_uiSchema}
              formData={this.state.formData}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              onError={log("errors")} />
          </TabPanel>
          <TabPanel>
            <Form 
              schema={project_schema}
              uiSchema={project_uiSchema}
              formData={this.state.formData}
              onSubmit={this.handleSubmit}
              onError={log("errors")} />
          </TabPanel>
        </Tabs>
      </div>
      )
    return(
      <div>{content}</div>
    )
  }
}
export default App;