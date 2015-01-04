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
    styles: "point"
  }, {
    opacity: 0.6,
    singleTile: true,
  });


// Heat map + point map
var matrix1 = new OpenLayers.Layer.WMS("WMS",
  // Uncomment below to use your local server
  // "http://localhost:8080/geoserver/wms",
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
  
  
  var matrix2 = new OpenLayers.Layer.WMS("WMS",
  // Uncomment below to use your local server
  // "http://localhost:8080/geoserver/wms",
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

// Start with map of startWord
matrix1.mergeNewParams({viewparams: "word:"+startWord});
matrix2.mergeNewParams({viewparams: "word:"+startWord});

// Map with projection into (required when mixing base map with WMS)
olMap = new OpenLayers.Map({
  projection: "EPSG:900913",
  units: "m",
  layers: [wmsLayer,osmLayer],
  center: [-4429687.0, -396947.0],
  zoom: 4
});


//////////////////
var addMatrix1Layer = function() {


if(mapPanel.map.layers.indexOf(matrix1) == -1) {
            mapPanel.map.addLayer(matrix1);

            }else{
            mapPanel.map.removeLayer(matrix1);

    }
    };
    
var addMatrix2Layer = function() {

        if(mapPanel.map.layers.indexOf(matrix2) == -1) {
            mapPanel.map.addLayer(matrix2);

            }else{
            mapPanel.map.removeLayer(matrix2);

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
        matrix1.mergeNewParams({viewparams: "word:"+field.getValue()});
        matrix2.mergeNewParams({viewparams: "word:"+field.getValue()});
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
    {text: 'matrix 1', handler: addMatrix1Layer},
    {text: 'matrix 2', handler: addMatrix2Layer}
    
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

