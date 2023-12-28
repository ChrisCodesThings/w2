// w2.gmap:

// ll( lat, lng) - shorthand, returns LatLng for lat, lng
// llb( south, west, north, east) - shorthand, returns LatLngBounds for south, west, north, east

// getShapeBounds( shape) - return LatLngBounds containing shape

// shapeContains( shape, coords) - returns true/false if shape contains coords
// shape - Google Polygon, Rectangle or Circle object
// coords - Google LatLng literal like { lat: 12.345 lng: 67.8910 }

// polyContains - as above but only with Polygon
// rectContains - as above but only with Rectangle
// circleContains - as above but only with Circle

window[window['__wheel2_locator']].gmap.load(new class {
	ll(lat, lng) { return new google.maps.LatLng(lat, lng); }
	llb(s, w, n, e) { return new google.maps.LatLngBounds({ south: s, west: w, north: n, east: e }); }

	getShapeBounds(shape) {
		// Circle and rectangle have their own getBounds function
		if (shape instanceof google.maps.Circle || shape instanceof google.maps.Rectangle) {
			return shape.getBounds();
		}


		if (!shape instanceof google.maps.Polygon) {
			return;
		}

		// ... but polygon doesn't
		const bounds = new google.maps.LatLngBounds();
		const path = shape.getPath();

		for (let p = 0; p < path.getLength(); p++) {
			bounds.extend({ lat: path.getAt(p).lat(), lng: path.getAt(p).lng() });
		}

		return bounds;
	}

	shapeContains(shape, coords) {
		if (coords instanceof google.maps.Marker) {
			coords = coords.getPosition();
		}

		if (shape instanceof google.maps.Polygon) {
			return this.polyContains(shape, coords);
		}

		if (shape instanceof google.maps.Rectangle) {
			return this.rectContains(shape, coords);
		}

		if (shape instanceof google.maps.Circle) {
			return this.circleContains(shape, coords);
		}

		return;
	}

	polyContains(poly, coords) { return google.maps.geometry.poly.containsLocation(coords, poly); }
	rectContains(rect, coords) { return rect.getBounds().contains(coords); }

	circleContains(circle, coords) {
		return google.maps.geometry.spherical.computeDistanceBetween(circle.getCenter(), coords) <= circle.getRadius();
	}
});

// Todo:
// llb from ne/sw corners
// add text labels to objects
