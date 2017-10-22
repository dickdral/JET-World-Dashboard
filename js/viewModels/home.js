define(['ojs/ojcore', 'knockout','ojs/ojknockout','ojs/ojselectcombobox',
    'ojs/ojsunburst', 'ojs/ojtable', 'ojs/ojarraytabledatasource',
    'ojs/ojthematicmap',
    'basemaps/ojthematicmap-world-countries',
    'basemaps/ojthematicmap-africa-countries',
    'basemaps/ojthematicmap-asia-countries',
    'basemaps/ojthematicmap-europe-countries',
    'basemaps/ojthematicmap-australia-countries',
    'basemaps/ojthematicmap-northAmerica-countries',
    'basemaps/ojthematicmap-southAmerica-countries'
],
  function(oj, ko) {

      function mainContentViewModel() {
        var self = this;
        self.val = null;
        
        // initialise
        build_code_to_index();
          
        self.country_id = ko.observableArray(["1"]);
        window.country_id = self.country_id;

        self.areatype   = ko.computed( function() 
                    { return ( is_country(self.country_id()) ? 'country' : 'region' ); }
                );
        self.countries  = get_country_list();
        self.set_to_world = function() {
            self.country_id(["1"]);
        }        

        self.subject    = ko.observable('population');
        
        // define value for infocards, dependent on country_id and subject
        self.infocards  = ko.computed(function() { 
                return ( get_infocards( self.country_id(), self.subject() ) );
            }, self);

        var handler     = new oj.ColorAttributeGroupHandler();

        // define observables for sunburst chart
        self.nodevalues           = ko.observableArray();
        self.legendsections       = ko.observableArray([{"text":" ","color":"1"}]);
        self.sunburst_text1       = ko.observable('');
        self.sunburst_text2       = ko.observable('');
        self.sunburstSelectedNode = ko.observable('');

        // define source for sunburst chart data ( only for regions )
        ko.computed( function() {
               if ( self.country_id() < 100 )
               { 
                   var nodes = get_hierarchy( self.country_id(), self.subject() );
                   self.nodevalues([nodes]);
               }
            }, self);

        // define action on click
        ko.computed(function() { 
            if ( self.sunburstSelectedNode() )
            {
                self.country_id (country_id_from_name(self.sunburstSelectedNode()).toString() );
                self.sunburstSelectedNode('');
            }
        }, self);        

        self.country_table          = ko.observableArray();
        self.country_table_columns  = ko.observableArray();
        self.datasource = new oj.ArrayTableDataSource(self.country_table, {idAttribute: 'country_name'});
        ko.computed( function() {    
               var country_id_num = parseInt(self.country_id());
               console.log("country_id_num="+country_id_num);
         
               if ( country_id_num >= 100 )
               { 
                   console.log('fill table');
                   self.country_table ( get_country_table( self.country_id(), self.subject() ) );
                   self.country_table_columns ( get_country_table_columns( self.subject() ) );
               }
            }, self);

          self.tableOptionChange =  function(event, data) 
        {
            console.log('selectionListener',data);
            if (data['option'] == 'currentRow' && data['value'] != null )
            {
                var eventTxt = "Triggered ojoptionchange event for selection: \n";
                var country_name = data['value']['rowKey'];
                console.log("country_name",country_name);
                var country_id = country_id_from_name(country_name);
                self.country_id( country_id.toString() );
            }
        }


        self.map_name = ko.observable('world');

          ko.computed( function()
                {
                   self.map_name ( get_map_name_for_country(self.country_id()) );
                   console.log('map=',self.map_name() );
                }
                , self);
                
        self.layers = ko.observableArray( [{layer: 'countries',
                                            labelDisplay: 'off',
                                            areaDataLayer: {id: 'adl1',
                                                           selectionMode: 'single',
                                                           areas: get_map_data(self.country_id(),
                                                           self.subject()) }}]);
                                    
        self.mapOptionChange =  function(event, ui) 
        {
            console.log(event, ui)
            if (ui['option'] == 'selection' ) 
            {
                if(ui['value']['adl1'])
                {
                    var country_id = ui['value']['adl1'][0];
                    self.country_id( country_id.toString() );
                }
            }
         };

        ko.computed( function() {
                   self.layers ( [{layer: 'countries',  labelDisplay: 'off',
                      areaDataLayer: {id: 'adl1', selectionMode: 'single', selection: self.country_id(),areas: get_map_data(self.country_id(), self.subject()) }}] 
                      );
               }, self);

        function is_country(country_id)
        {
            return( country_id >= 100 );
        }
        function country_id_from_name(country_name)
        {
            var country_object = self.countries.find( function(element) { return ( element.label==country_name) } );
            country_id = country_object.value;
            var country_list = [];
            country_list.push(country_id);
 
            return country_list;
        }

        self.compress_table = function ()
        {
            var country_code = get_code_from_country_id ( self.country_id() );
            console.log('compress_table, country_code='+country_code);
            compress_table( country_code );    
        }
                  
        function alert_country_id()
        {
            alert('clicked');
        }
        
        self.set_country_id = function ( country_id )
        {
            self.country_id(country_id.toString);
        }
          
    }
    
  $(document).ready
  (
     function()
     {
        // $('#table').on('ojsort', sortListener);
     }
  );

    return new mainContentViewModel();
});
