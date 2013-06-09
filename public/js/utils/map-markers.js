define(['leaflet'],
	function(Leaflet) {
		
		var LeafIcon = L.Icon.extend({
			options: {
			    //shadowUrl: 'leaf-shadow.png',
			    iconSize:     [25, 41],
			    shadowSize:   [25, 41],
			    iconAnchor:   [12, 41],
			    shadowAnchor: [4, 62],
			    popupAnchor:  [0, 0]
    		}
		});

		var icons = {
			user: new LeafIcon({iconUrl: 'img/markers/marker-icon-red.png'}),
			place: new LeafIcon({iconUrl: 'img/markers/1up.png'})
		};

		return icons;
	}
);