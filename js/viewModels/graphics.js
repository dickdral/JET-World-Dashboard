define(['ojs/ojcore', 'knockout','ojs/ojknockout', 'ojs/ojtable', 'ojs/ojarraytabledatasource'],
  function(oj, ko) {

      function mainContentViewModel() {
        var self = this;

        self.countries = ko.observableArray([ {"country_name":"Afghanistan","flag":"","country_id":100,"ranking":100,"land_area":652860,"population":31627500,"pop_density":48,"pop_growth":29.6,"population_distribution":"46% 51%","agriculture":58.1,"crop":12.1,"bio_crop":2.1,"forest":2.1,"remaining":39.8,"land_distribution":"46%","energy_use_per_inh":null,"co2_emission_per_inh":null,"oil_price":1.28,"cars":664177.5,"road_death":632550,"road_length":42150,"doctors_per_inh":6325.5,"hosp_bed_per_inh":12651,"inf_mort":2719965,"avg_lifespan":61,"class":""} ]);
        
        var url = "http://www.speech2form.com/ords/adc/tabledata/";
        $.ajax(url
                   ,{ success: function(data) { self.countries = JSON.parse(data); 
                                                console.log('No of countries='+self.countries.length);
                                              } 
                    }); 
        self.datasource = new oj.ArrayTableDataSource(self.countries, {idAttribute: 'country_name'});
    }

    return new mainContentViewModel();
});
