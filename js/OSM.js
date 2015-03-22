
map = new OpenLayers.Map("mapdiv");
map.addLayer(new OpenLayers.Layer.OSM());

epsg4326 = new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection
projectTo = map.getProjectionObject(); //The map projection (Spherical Mercator)

var lonLat = new OpenLayers.LonLat('' + pollingPlace["" + setting.head + "1"]["http://www.w3.org/2003/01/geo/wgs84_pos#long"][0]["value"],
			'' + pollingPlace["" + setting.head + "1"]["http://www.w3.org/2003/01/geo/wgs84_pos#lat"][0]["value"]).transform(epsg4326, projectTo);

var zoom = 10.5;
map.setCenter(lonLat, zoom);

var vectorLayer = new OpenLayers.Layer.Vector("Overlay");

// Define markers as "features" of the vector layer:
	function createStar(num){
		
	    console.log(pollingPlace[""+ setting.head +num]["http://www.w3.org/2003/01/geo/wgs84_pos#long"][0]["value"]);

		var feature = new OpenLayers.Feature.Vector(
			new OpenLayers.Geometry.Point('' + pollingPlace["" + setting.head + num]["http://www.w3.org/2003/01/geo/wgs84_pos#long"][0]["value"],
			'' + pollingPlace["" + setting.head + num]["http://www.w3.org/2003/01/geo/wgs84_pos#lat"][0]["value"]).transform(epsg4326, projectTo),
      		{ description: '' + pollingPlace["" + setting.head + num][""+setting.Name][0]["value"] + '<BR>' + pollingPlace["" + setting.head+num][""+setting.Address][0]["value"] },
        	{ externalGraphic: 'https://dl.dropboxusercontent.com/u/11256045/star48.png', graphicHeight: 25, graphicWidth: 21, graphicXOffset: -12, graphicYOffset: -25 }
    	);
		vectorLayer.addFeatures(feature);
		map.addLayer(vectorLayer);
		
	}/*
	function createStar() {

	    var feature = new OpenLayers.Feature.Vector(
			new OpenLayers.Geometry.Point('139.6751008',
			'35.529237').transform(epsg4326, projectTo),
      		{
      		    description:'asddf < BR >asdfg'
      		},
        	{ externalGraphic: 'https://dl.dropboxusercontent.com/u/11256045/star48.png', graphicHeight: 25, graphicWidth: 21, graphicXOffset: -12, graphicYOffset: -25 }
    	);
	    vectorLayer.addFeatures(feature);
	    map.addLayer(vectorLayer);

	}*/
	
//Add a selector control to the vectorLayer with popup functions
var controls = {
    selector: new OpenLayers.Control.SelectFeature(vectorLayer, { onSelect: createPopup, onUnselect: destroyPopup })
};
function createPopup(feature) {
    feature.popup = new OpenLayers.Popup.FramedCloud("pop",
        feature.geometry.getBounds().getCenterLonLat(),
        null,
        '<div class="markerContent">' + feature.attributes.description + '</div>',
        null,
        true,
        function () { controls['selector'].unselectAll(); }
    );
    //feature.popup.closeOnMove = true;
    map.addPopup(feature.popup);
}

function destroyPopup(feature) {
    feature.popup.destroy();
    feature.popup = null;
}
map.addControl(controls['selector']);
controls['selector'].activate();