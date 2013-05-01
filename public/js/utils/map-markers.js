define(['leaflet'],
	function(Leaflet) {
		
		var LeafIcon = L.Icon.extend({
			options: {
			    //shadowUrl: 'leaf-shadow.png',
			    iconSize:     [50, 50],
			    shadowSize:   [50, 64],
			    iconAnchor:   [0, 0],
			    shadowAnchor: [4, 62],
			    popupAnchor:  [-3, -76]
    		}
		});

		var icons = {
			user: new LeafIcon({iconUrl: 'img/markers/1up.png'})
		};

		return icons;
	}
);