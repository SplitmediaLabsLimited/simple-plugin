(function(){
  'use strict';
  var xjs = require('xjs');
  var Item = xjs.Source;
  var myItem;
  var _cnf;
  var tempConfig = {};
  var initializePlugin = function(config){

    //Apply config on Load
    myItem.loadConfig().then(function(config) {
      debugger;
      updateData(config, true);
    });

    //Apply config on Save
    xjs.SourcePluginWindow.getInstance().on('save-config', function(config) {
      updateHTML(config);
      updateData(config);
    });

    updateData(config,true);
  };

  var updateHTML = function(config,isInitial) {
    console.log({config,isInitial});
  };

  //Merge config to tempConfig
  var updateData = function(config,isInitial) {
    
    for (var i in tempConfig){
      config[i] = tempConfig[i];
    }

    if (config.datatext === undefined) {
      config.datatext = "default value";
    } else {
      $("#myText").html(config.datatext);
    }
    myItem.saveConfig(config);
  };


  xjs.ready()
  .then(Item.getCurrentSource)
  .then(function(item) {
    myItem = item;
    return item.loadConfig();
  })
  .then(function(config){
    _cnf = config;
    updateData(config, true);
    return myItem.setName('Sample Plugin');
  })
  .then(function(item){
    initializePlugin(_cnf);
  });
})();