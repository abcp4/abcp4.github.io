// Use this word on startup
var startWord = "SAO LUIS";

// Base map
var osmLayer = new OpenLayers.Layer.OSM();

//layer das escolas
var wmsLayer = new OpenLayers.Layer.WMS("WMS",
  // Uncomment below to use your local server
  // "http://localhost:8080/geoserver/wms",
  "http://geoserver-navi1921.rhcloud.com/awesome/wms",
  {
    format: "image/png8",
    transparent: true,
    layers: "awesome:geoescolas",
    styles: "point_label"
  }, {
    opacity: 0.6,
    singleTile: true,
  });


// Heat map + point map
var matrix10 = new OpenLayers.Layer.WMS("WMS",
  "http://geoserver-navi1921.rhcloud.com/awesome/wms",
  {
    format: "image/png8",
    transparent: true,
    layers: "awesome:matrix_geoescolas",
    styles: "heatmap_distance"
  }, {
    opacity: 0.6,
    singleTile: true,
  });
  
  
  var matrix20 = new OpenLayers.Layer.WMS("WMS",
  "http://geoserver-navi1921.rhcloud.com/awesome/wms",
  {
    format: "image/png8",
    transparent: true,
    layers: "awesome:matrix_geoescolas2",
    styles: "heatmap_distance"
  }, {
    opacity: 0.6,
    singleTile: true,
  });
  
   var matrix11 = new OpenLayers.Layer.WMS("WMS","http://geoserver-navi1921.rhcloud.com/awesome/wms", {
                format: "image/png8",
                transparent: true,
                layers: "awesome:matrix_geoescolas",
                styles: "heatmap"
                 },{
                opacity: 0.6,
                singleTile: true,
  });
  
  

    var matrix21 = new OpenLayers.Layer.WMS("WMS","http://geoserver-navi1921.rhcloud.com/awesome/wms", {
                format: "image/png8",
                transparent: true,
                layers: "awesome:matrix_geoescolas2",
                styles: "heatmap"
                 },{
                opacity: 0.6,
                singleTile: true,
  });
  
  var matrix12 = new OpenLayers.Layer.WMS("WMS","http://geoserver-navi1921.rhcloud.com/awesome/wms", {
                format: "image/png8",
                transparent: true,
                layers: "awesome:matrix_geoescolas",
                styles: "point"
                 },{
                opacity: 0.6,
                singleTile: true,
  });

// Start with map of startWord
matrix10.mergeNewParams({viewparams: "word:"+startWord});
matrix20.mergeNewParams({viewparams: "word:"+startWord});
matrix11.mergeNewParams({viewparams: "word:"+startWord});
matrix21.mergeNewParams({viewparams: "word:"+startWord});
//matrix12.mergeNewParams({viewparams: "word:"+startWord});

// Map with projection into (required when mixing base map with WMS)
olMap = new OpenLayers.Map({
  projection: "EPSG:900913",
  units: "m",
  layers: [wmsLayer,osmLayer],
  center: [-4429687.0, -396947.0],
  zoom: 4
});


//////////////////
var addMatrix10Layer = function(){

  if(mapPanel.map.layers.indexOf(matrix10) == -1) {
            mapPanel.map.addLayer(matrix10);

            }else{
            mapPanel.map.removeLayer(matrix10);

    }
    
    
  
  };

var addMatrix11Layer = function() {


if(mapPanel.map.layers.indexOf(matrix11) == -1) {
            mapPanel.map.addLayer(matrix11);

            }else{
            mapPanel.map.removeLayer(matrix11);

    }
    };
    
    
 var addMatrix20Layer = function(){
if(mapPanel.map.layers.indexOf(matrix20) == -1) {
            mapPanel.map.addLayer(matrix20);

            }else{
            mapPanel.map.removeLayer(matrix20);

    }
  
  };
  
  
var addMatrix21Layer = function() {
      if(mapPanel.map.layers.indexOf(matrix21) == -1) {
            mapPanel.map.addLayer(matrix21);

            }else{
            mapPanel.map.removeLayer(matrix21);

    }
            
    };
    
    var addMatrix12Layer = function() {
      if(mapPanel.map.layers.indexOf(matrix12) == -1) {
            mapPanel.map.addLayer(matrix12);

            }else{
            mapPanel.map.removeLayer(matrix12);

    }
            
    };
    
  
  
/////////////////

// Take in user input, fire an event when complete
var textField = new Ext.form.TextField({
  value: startWord,
  listeners: {
    specialkey: function(field, e) {
      // Only update the word map when user hits 'enter'
      if (e.getKey() == e.ENTER) {
        wmsLayer.mergeNewParams({viewparams: "word:"+field.getValue()});
        matrix10.mergeNewParams({viewparams: "word:"+field.getValue()});
        matrix20.mergeNewParams({viewparams: "word:"+field.getValue()});
        matrix11.mergeNewParams({viewparams: "word:"+field.getValue()});
        matrix21.mergeNewParams({viewparams: "word:"+field.getValue()});
       // matrix12.mergeNewParams({viewparams: "word:"+field.getValue()});
      }
    }
  }
});

// Map panel, with text field embedded in top toolbar
var mapPanel = new GeoExt.MapPanel({
  title: "OpenGeo Geoescolas Heat Map",
tbar: [ ["Enter a word to map:", textField],
     new Ext.Toolbar({
    items: [
    {text: 'matrix 1 por distancia', handler: addMatrix10Layer},
    {text: 'matrix 2 por distancia', handler: addMatrix20Layer},
    {text: 'matrix 1 por media', handler: addMatrix11Layer},
    {text: 'matrix 2 por media', handler: addMatrix21Layer}
    ]
})],
  map: olMap
});

// Viewport wraps map panel in full-screen handler
var viewPort = new Ext.Viewport({
  layout: "fit",
  items: [mapPanel]
});

// Start the app!
Ext.onReady(function () {
  viewPort.show();
});

