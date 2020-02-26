import React from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

const ZOOM = 12;

const ICON = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
  }

  componentDidMount() {
    const mapRef = this._mapRef.current;

    const {coordinates, cityCords} = this.props;

    this._map = leaflet.map(mapRef, {
      center: cityCords,
      zoom: ZOOM,
      zoomControl: false,
      marker: true
    });


    this._map.setView(cityCords, ZOOM);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);

    this._layerGroup = leaflet.layerGroup().addTo(this._map);

    coordinates.map((coordinate) => {
      leaflet
        .marker(coordinate, {icon: ICON})
        .addTo(this._layerGroup);
    });
  }

  componentDidUpdate() {
    const {coordinates} = this.props;

    this._layerGroup.clearLayers();

    coordinates.map((coordinate) => {
      leaflet
        .marker(coordinate, {icon: ICON})
        .addTo(this._layerGroup);
    });
  }

  componentWillUnmount() {
    this._map.remove();
  }

  render() {
    return (
      <div id="map" ref={this._mapRef} style={{height: `100%`}}></div>
    );
  }
}

Map.propTypes = {
  coordinates: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  ).isRequired,
  cityCords: PropTypes.arrayOf(PropTypes.number.isRequired),
};

export default Map;
