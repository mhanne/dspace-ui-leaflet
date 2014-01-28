var Map = Backbone.View.extend({
  initialize: function(){
    this.config = this.options.config;
    this.frame = new L.Map(this.config.elementId, {
      center: this.config.center,
      zoom: this.config.zoom,
      attributionControl: false,
      zoomControl: false
    });

    var zoomControl = new L.Control.Zoom({ position: 'topright' }).addTo(this.frame);

    basemaps = {}
    for(i in this.config.basemaps) {
      config = this.config.basemaps[i];
      basemaps[config.name] = new L.TileLayer(config.template, { maxZoom : config.maxZoom });
      if(i == 0) { basemaps[config.name].addTo(this.frame); }
    }

    this.frame.poisControl = new L.Control.Layers(basemaps, undefined, { collapsed: true, position: 'topleft' }).addTo(this.frame);
  }
});

module.exports = Map;
