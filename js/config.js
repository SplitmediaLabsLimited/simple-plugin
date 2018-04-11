(function () {
  'use strict';

  document.onselectstart = function (event) {
    var nodeName = event.target.nodeName;
    if (nodeName === "INPUT" || nodeName === "TEXTAREA" || nodeName === "XUI-INPUT" || nodeName === "XUI-SLIDER") {
      return true;
    }
    else {
      return false;
    }
  };
  document.onkeydown = function (event) {
    if ((event.target || event.srcElement).nodeName !== 'INPUT' &&
      (event.target || event.srcElement).nodeName !== 'TEXTAREA' &&
      (event.target || event.srcElement).nodeName !== 'XUI-SLIDER' &&
      (event.target || event.srcElement).nodeName !== 'XUI-INPUT' &&
      (event.target || event.srcElement).nodeName !== 'XUI-COLORPICKER' &&
      (event.target || event.srcElement).contentEditable !== true) {
      if (event.keyCode == 8)
        return false;
    }
  };
  document.oncontextmenu = function () { return false; };

  var xjs = require('xjs'),
    Item = xjs.Source,
    SourcePropsWindow = xjs.SourcePropsWindow;

  var currentSource;
  var temp = true;
  var inpuText = document.getElementById('dataText');
  var submitButton = document.getElementById('submitData');
  var elements = {
    datatext: document.getElementById('dataText')
  };

  var updateElements = function (config) {
    //inpuText.value = "test text";
    var inputValue = inpuText.value;
    if (config.datatext === undefined) {
      config.datatext = "default value";
      inpuText.$.input.value = config.datatext;
    } else {
      inpuText.$.input.value = config.datatext;
    }
  };

  var updateConfig = function (item) {
    var inpuTextValue = inpuText.$.input.value;
    var config = {
      datatext: inpuTextValue
    };
    updateElements(config);
    item.requestSaveConfig(config);
  };

  xjs.ready().then(function () {
    var configWindow = SourcePropsWindow.getInstance();
    configWindow.useTabbedWindow({
      customTabs: ['Sample Plugin'],
      tabOrder: ['Sample Plugin', 'Color', 'Layout', 'Transition']
    });
    return Item.getCurrentSource();
  }).then(function (myItem) {
    currentSource = myItem;
    
    submitButton.addEventListener('click',function(e){
      myItem.requestSaveConfig({ datatext: inpuText.$.input.value});
      updateConfig(currentSource);
    });

    
    return currentSource.loadConfig();
  }).then(function (config) {
    // load last saved configuration
    // initialize to Show if no configuration set yet
    var cfg = {
      datatext: config.datatext === undefined ? "default value" : config.datatext
    };
    updateElements(config);
    // initialize event listeners
    for (var i in elements) {
      elements[i].addEventListener('change', function () {
        updateConfig(currentSource);
      });
    }
  });
})();