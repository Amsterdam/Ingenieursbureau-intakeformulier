(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{122:function(e,t,r){e.exports=r(271)},127:function(e,t,r){},270:function(e,t,r){},271:function(e,t,r){"use strict";r.r(t);var i=r(0),n=r.n(i),o=r(113),a=r.n(o),s=(r(127),r(120)),c=r(114),l=r(115),p=r(119),d=r(116),m=r(121),u=r(117),_=r.n(u),g=r(77),j=r.n(g),b=r(118),f=r.n(b),y=r(26),k=(r(269),r(270),function(e){return console.log.bind(console,e)}),h=new Date,v=h.getDate(),w=h.getMonth()+1,O=h.getFullYear();v<10&&(v="0".concat(v)),w<10&&(w="0".concat(w)),h="".concat(O,"-").concat(w,"-").concat(v),console.log(h);var N={definitions:{person:{type:"object",properties:{first_name:{title:"Voornaam",type:"string"},last_name:{title:"Achternaam",type:"string"},email:{title:"E-mail",type:"string",format:"email"}}},order_code:{type:"object",properties:{business_unit:{title:"Bedrijfseenheid",type:"string"},main_account:{title:"Hoofdrekening",type:"string"},work_order:{title:"Werkorder",type:"string",format:"email"}}}},title:"Pre-opdrachtfase",type:"object",properties:{project_information:{title:"Opdracht",description:"",type:"object",required:["project_name"],properties:{project_name:{type:"string",title:"Naam opdracht / project"},date_intake:{title:"Datum intake",type:"string",format:"date",default:h},date_start:{title:"Startdatum project",type:"string",format:"date",default:h},date_end:{title:"Einddatum project (indicatie)",type:"string",format:"date",default:h},project_feature:{title:"Hoofdtype",type:"string",enum:["maintenance","improvement","renovation","new"],enumNames:["Instanthouding/Groot onderhoud","Verbeterprogramma's","Herinrichting","Nieuwe aanleg"]}},dependencies:{project_feature:{oneOf:[{properties:{project_feature:{enum:["maintenance"]},project_subfeature:{title:"Subtype",type:"string",enum:["Hoofdnet","Openbare verlichting","Kademuren","Groen","VRI/VIS/VM","Bruggen","Verharding woonbuurt","Civiele constructies woonbuurt","Integraal groot onderhoud woonbuurt"],enumNames:["Hoofdnet","Openbare verlichting","Kademuren","Groen","VRI/VIS/VM","Bruggen","Verharding woonbuurt","Civiele constructies woonbuurt","Integraal groot onderhoud woonbuurt"]}}},{properties:{project_feature:{enum:["improvement"]},project_subfeature:{title:"Subtype",type:"string",enum:["Elektrisch vervoer hubs","Autoluw","Fiets","Verkeersveiligheid","IAOV"],enumNames:["Elektrisch vervoer hubs","Autoluw","Fiets","Verkeersveiligheid","IAOV"]}}},{properties:{project_feature:{enum:["renovation"]},project_subfeature:{title:"Subtype",type:"string",enum:["Complexe/integrale herinrichting","Stationslocaties","Woonbuurt","Hoofdnet","Park, plein, speelplaats"],enumNames:["Complexe/integrale herinrichting","Stationslocaties","Woonbuurt","Hoofdnet","Park, plein, speelplaats"]}}},{properties:{project_feature:{enum:["new"]},project_subfeature:{title:"Subtype",type:"string",enum:["Parkeergebouwen","Hoofdnet","Civiele constructies","Zuidasdok","Sport","Advisering gebiedsontwikkeling","Ondergronds afval","HOV","Bouwrijp maken","Woningrijp maken"],enumNames:["Parkeergebouwen","Hoofdnet","Civiele constructies","Zuidasdok","Sport","Advisering gebiedsontwikkeling","Ondergronds afval","HOV","Bouwrijp maken","Woningrijp maken"]}}}]}}},client_information:{title:"Opdrachtgever",description:"",type:"object",required:["main_client"],properties:{organisation:{title:"Organisatie",type:"string",enum:["GenO","R&D","SD-C","SD-N","SD-NW","SD-O","SD-W","SD-Z","SD-ZO","V&OR-SB","V&OR-AOG","Other"],enumNames:["Grond en Ontwikkeling","Ruimte en Duurzaamheid","Stadsdeel Centrum","Stadsdeel Nieuw-West","Stadsdeel Noord","Stadsdeel Oost","Stadsdeel West","Stadsdeel Zuid","Stadsdeel Zuidoost","Verkeer en Openbare Ruimte - Stedelijk Beheer","Verkeer en Openbare Ruimte - Ambtelijk OpdrachtGever","Overig"]},booking_code:{title:"Boekingscombinatie AFS (indien reeds bekend)",$ref:"#/definitions/order_code"},board_client:{title:"Bestuurlijk",type:"object",properties:{first_name:{title:"Voornaam",type:"string"},last_name:{title:"Achternaam",type:"string"}}},main_client:{title:"Ambtelijk",$ref:"#/definitions/person"},delegated_client_question:{title:"Gedelegeerd Opdrachtgever",type:"string",enum:["Nee","Ja"],default:"Nee"}},dependencies:{delegated_client_question:{oneOf:[{properties:{delegated_client_question:{enum:["Nee"]}}},{properties:{delegated_client_question:{enum:["Ja"]},delegated_client:{title:"Gedelegeerd",$ref:"#/definitions/person"}}}]}}},contractor_information:{title:"Opdrachtnemer",description:"",type:"object",required:["projectmanager","account"],properties:{projectmanager:{title:"Opdrachtverantwoordelijke",$ref:"#/definitions/person"},section_projectmanager_question:{title:"Deelprojectleider",type:"string",enum:["Nee","Ja"],default:"Nee"},controller:{title:"Projectbeheerser",$ref:"#/definitions/person"},account:{title:"Accounthouder/teamleider",type:"string",default:"account_holder",enum:["account_holder","teamleader"],enumNames:["Accounthouder","Teamleider"]}},dependencies:{account:{oneOf:[{properties:{account:{enum:["account_holder"]},account_holder:{title:"Accounthouder",$ref:"#/definitions/person"}}},{properties:{account:{enum:["teamleader"]},teamleader:{title:"Teamleider",$ref:"#/definitions/person"}}}]},section_projectmanager_question:{oneOf:[{properties:{section_projectmanager_question:{enum:["Nee"]}}},{properties:{section_projectmanager_question:{enum:["Ja"]},section_projectmanager:{title:"Deelprojectleider",$ref:"#/definitions/person"}}}]}}},assignment_structure:{title:"Opdrachtstructuur Timetell (tijdschrijven)",description:"De uren moeten worden verantwoord op \xe9\xe9n of meerdere werkorders. Elk werkorder valt onder een projectnummer.",type:"object",properties:{project_number_available:{title:"Bestaand projectnummer",type:"string",enum:["Nee","Ja"],default:"Nee"},work_orders:{title:"Namen voor werkorder(s)",type:"array",items:{type:"object",properties:{work_order_prefix:{title:"Project",type:"string"},work_order_name:{title:"Werkordernaam",type:"string"}}}}},dependencies:{project_number_available:{oneOf:[{properties:{project_number_available:{enum:["Nee"]}}},{properties:{project_number_available:{enum:["Ja"]},existing_project_number:{title:"Hoofdprojectnummer",type:"number"}}}]}}},estimates:{title:"Indicatie projectkosten",type:"object",required:["estimate_costs_budget_hours"],properties:{estimate_total_costs:{title:"Indicatie totale integrale projectkosten",description:"",type:"string",enum:[0,5e5,15e5,5e6],enumNames:["0-500k","500k-1.500k","1500k-5000k",">5000k"]},estimate_costs_organisation:{title:"Indicatie totale inzet Ingenieursbureau",description:"Als onderdeel van totale integrale projectkosten",type:"string",enum:[0,1e4,5e4,25e4,1e6],enumNames:["0-10k","10-50k","50-250k","250-1000k",">1000k"]},estimate_costs_budget_hours:{title:"Kostenindicatie inzet Ingenieursbureau",description:'Van "pre-opdracht" tot definitieve opdrachtverstrekking',type:"number"},document_capacity_estimate:{type:"string",format:"data-url",title:"Capaciteitsraming"}},dependencies:{estimate_costs_organisation:{oneOf:[{properties:{estimate_costs_organisation:{enum:[1e4,5e4,25e4,1e6]},approved_by_client:{title:"Akkoord Opdrachtgever",type:"boolean"}}},{properties:{estimate_costs_organisation:{enum:[0]},approved_by_client_verbally:{title:"Mondeling akkoord Opdrachtgever",type:"boolean"}}}]},estimate_costs_budget_hours:{oneOf:[{properties:{estimate_costs_budget_hours:{minimum:0,maximum:1e4},approved_by_client_verbally:{title:"Mondeling akkoord Opdrachtgever",type:"boolean"}}},{properties:{estimate_costs_budget_hours:{minimum:10001},approved_by_client:{title:"Akkoord Opdrachtgever",type:"boolean"}}}]}}}}},S={title:"Opdrachtfase",type:"object",properties:{project_information:{title:"Opdrachtbeschrijving",description:"Benut bij intake en werk uit voor de definitieve opdracht. Indien projectplan opgesteld, uitwerking daar.",type:"object",required:["project_reason"],properties:{project_reason:{type:"string",title:"Aanleiding"},project_goal:{type:"string",title:"Doel"},project_result:{type:"string",title:"Resultaat"},project_definition:{type:"string",title:"Afbakening"}}},project_cost_recoveries:{title:"Dekking van kosten",description:"Indien projectplan opgesteld; zie daar voor details/onderbouwing.",type:"object",required:["available_budget_client"],properties:{available_budget_client:{type:"number",title:"Budget opdrachtgever"},cost_recoveries:{title:"Type dekkingsbronnen",type:"array",items:{type:"object",properties:{cost_recovery:{title:"Dekkingsbron",type:"string"}}}}}},project_expected_budget:{title:"Geraamde kosten",description:"Indien projectplan opgesteld; zie daar voor details/onderbouwing.",type:"object",required:["project_budget_contactor"],properties:{project_budget_contactor:{type:"number",title:"Kosten Ingenieursbureau"},project_budget_external_contactors:{type:"number",title:"Kosten inkoop werk van derden"}}},project_through_put_time:{title:"Doorlooptijd",type:"object",properties:{date_start:{title:"Van",type:"string",format:"date",default:h},date_end:{title:"Tot",type:"string",format:"date",default:h}}},project_milestones:{title:"Mijlpalen en producten",description:"Indien projectplan opgesteld; zie daar voor details/onderbouwing.",type:"object",properties:{milestones:{title:"Hoofdmijlpalen",type:"array",items:{type:"object",properties:{milestone:{title:"Mijlpaal",type:"string"}}}},products:{title:"Producten",type:"array",items:{type:"object",properties:{product:{title:"Product",type:"string"}}}},project_file:{title:"Projectdossier",type:"string",format:"data-url"}}},project_risks:{title:"Risico's",type:"object",properties:{financial_risks:{title:"Geld",type:"array",items:{type:"object",properties:{financial_risk:{title:"Financieel",type:"string"}}}},time_risks:{title:"Tijd",type:"array",items:{type:"object",properties:{time_risk:{title:"Tijd",type:"string"}}}},technical_risks:{title:"Technisch",type:"array",items:{type:"object",properties:{technical_risk:{title:"Technisch",type:"string"}}}},political_risks:{title:"Politiek/bestuurlijk",type:"array",items:{type:"object",properties:{technical_risk:{title:"Politiek/bestuurlijk",type:"string"}}}},social_risks:{title:"Maatschappelijk/omgeving",type:"array",items:{type:"object",properties:{social_risk:{title:"Maatschappelijk/omgeving",type:"string"}}}}}},project_context:{title:"Complexiteit",type:"object",properties:{project_strategy:{title:"Markt/contractstrategie",description:"Denk hierbij aan bijvoorbeeld EMVI (Gunnen op waarde)",type:"string"},needed_compentency:{title:"Gevraagde bijzondere competenties en kennis",type:"array",items:{type:"object",properties:{compentence:{title:"Competentie/kennis",type:"string"}}}}}},project_identification_numbers:{title:"Projectnummers",type:"object",properties:{project_id_mip:{title:"Meerjaren Informatie Planning (MIP)",type:"string"},project_id_cora:{title:"Coordinatie Openbare Ruimte Amsterdam (CORA)",type:"string"},project_id_grex:{title:"Grond Exploitatie (GREX)",type:"string"},project_id_digital_workplans:{title:"Digitale Werkplannen",type:"string"},project_plan_file:{title:"Projectplan",description:"Voeg toe bij capaciteitsraming > \u20ac 50.000, inclusief bijlagen",type:"array",items:{type:"object",properties:{document:{title:"Document",type:"string",format:"data-url"}}}}}}}},D={project_information:{project_reason:{"ui:widget":"textarea"},project_goal:{"ui:widget":"textarea"},project_result:{"ui:widget":"textarea"},project_definition:{"ui:widget":"textarea"}}},E={project_information:{date_start:{"ui:widget":"date",classNames:"col_left"},date_end:{"ui:widget":"date",classNames:"col_right"}},assignment_structure:{work_orders:{items:{classNames:"workorder",work_order_prefix:{"ui:readonly":!0,classNames:"col_left"},work_order_name:{classNames:"col_right"}}}},client_information:{booking_code:{business_unit:{classNames:"col_3"},main_account:{classNames:"col_3"},work_order:{classNames:"col_3"}},board_client:{first_name:{classNames:"col_left"},last_name:{classNames:"col_right"}},main_client:{first_name:{classNames:"col_left"},last_name:{classNames:"col_right"}},delegated_client:{first_name:{classNames:"col_left"},last_name:{classNames:"col_right"}}},contractor_information:{"ui:order":["projectmanager","*","section_projectmanager_question"],projectmanager:{first_name:{classNames:"col_left"},last_name:{classNames:"col_right"}},controller:{first_name:{classNames:"col_left"},last_name:{classNames:"col_right"}},account_holder:{first_name:{classNames:"col_left"},last_name:{classNames:"col_right"}},teamleader:{first_name:{classNames:"col_left"},last_name:{classNames:"col_right"}},section_projectmanager:{first_name:{classNames:"col_left"},last_name:{classNames:"col_right"}}}},V=function(e){function t(){var e,r;Object(c.a)(this,t);for(var i=arguments.length,n=new Array(i),o=0;o<i;o++)n[o]=arguments[o];return(r=Object(p.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(n)))).state={formData:{}},r.handleSubmit=function(e){r.setState({formData:e.formData,submitted:!0})},r.handleChange=function(e){var t=e.formData,i=t.assignment_structure.work_orders;if(i){var n=t.project_information.project_name,o=i.map(function(e){return Object(s.a)({},e,{work_order_prefix:n})});r.setState({formData:_()(t,{assignment_structure:{work_orders:{$set:o}}})})}else r.setState({formData:e.formData})},r}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.submitted,r=e.formData,i=t?n.a.createElement("div",null,n.a.createElement("h1",null,"Te versturen informatie:"),n.a.createElement(f.a,{src:r})):n.a.createElement("div",null,n.a.createElement(y.d,null,n.a.createElement(y.b,null,n.a.createElement(y.a,null,"Pre-opdracht"),n.a.createElement(y.a,null,"Opdracht")),n.a.createElement(y.c,null,n.a.createElement(j.a,{schema:N,uiSchema:E,formData:this.state.formData,onChange:this.handleChange,onSubmit:this.handleSubmit,onError:k("errors")})),n.a.createElement(y.c,null,n.a.createElement(j.a,{schema:S,uiSchema:D,formData:this.state.formData,onSubmit:this.handleSubmit,onError:k("errors")}))));return n.a.createElement("div",null,i)}}]),t}(i.Component);a.a.render(n.a.createElement(V,null),document.getElementById("root"))}},[[122,1,2]]]);
//# sourceMappingURL=main.39248366.chunk.js.map