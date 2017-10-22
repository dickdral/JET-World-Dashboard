/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/* 
 * Your viewModel code goes here
 */

define(['ojs/ojcore', 'knockout','ojs/ojselectcombobox'],
  function(oj, ko) {
   /**
    * The view model for the main content view template.  Please note that since
    * this example uses ojModule binding, you do not need to call ko.applyBindings
    * like the JET Cookbook examples.  ojModule handles applying bindings for its
    * associated view.
    */
    function mainContentViewModel() {
        var self = this;
        self.texts = [{"text":"text1"},{"text":"text2"}];
    }

    return new mainContentViewModel();
});

