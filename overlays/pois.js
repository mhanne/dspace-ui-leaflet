var PoisOverlay = Backbone.View.extend({

  initialize: function() {
    if(!this.layer) { this.layer = new L.LayerGroup(); }
    this.collection.overlay = this;
    this.markers = [];
    this.reset([]);
  },
  add: function(poi) {
    if(!poi.tags) return;
    var icon = new L.Icon({
      iconUrl: this.getIcon(poi.tags),
      iconSize: [16, 16],
      iconAnchor: [8, 0]
    });
    var marker = new L.Marker([poi.lat, poi.lon], { icon: icon });

    html = "<h3>" + poi.tags.name + "</h3><table>";
    html += "<tr><th>Position</th><td>" + poi.lat + ", " + poi.lon + "</td></tr>"
    for(i in poi.tags) {
      html += "<tr><th>" + i + "</th><td>" + poi.tags[i] + "</td></tr>";
    }
    html += "</table>"

    marker.bindPopup(new L.Popup({closeButton: false}).setContent(html));
    this.layer.addLayer(marker);

    this.markers.push(marker);
  },
  scaleMarkers: function() {
  },
  reset: function(collection) {
    this.collection = collection;
    for(i in this.markers) {
      this.layer.removeLayer(this.markers[i]);
    }
    for(i in this.collection){
      this.add(this.collection[i]);
    }
  },
  getIcon: function(poi) {
    url = 'http://svn.openstreetmap.org/applications/rendering/mapnik/symbols/';
    if(poi.amenity == "hospital") {
      return url + 'hospital.png';
    } else if(poi.amenity == "bar") {
      return url + 'bar.png';
    } else if(poi.highway == "bus_stop") {
      return url + 'bus_stop.png';
    } else {
      return '/assets/images/markers/focus.png';
    }
  }


});

module.exports = PoisOverlay;