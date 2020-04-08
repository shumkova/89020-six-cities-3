import React from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

const ICON = leaflet.icon({
  iconUrl: `/img/pin.svg`,
  iconSize: [30, 30],
});

const ICON_ACTIVE = leaflet.icon({
  iconUrl: `/img/pin-active.svg`,
  iconSize: [30, 30],
});

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
  }

  componentDidMount() {
    const mapRef = this._mapRef.current;

    const {places, cityCords, activeOffer, currentOffer} = this.props;

    this._map = leaflet.map(mapRef, {
      center: [cityCords.latitude, cityCords.longitude],
      zoom: cityCords.zoom,
      zoomControl: false,
      marker: true
    });

    this._map.setView([cityCords.latitude, cityCords.longitude], cityCords.zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);

    this._layerGroup = leaflet.layerGroup().addTo(this._map);

    this.drawPins(places, activeOffer, currentOffer);
  }

  componentDidUpdate() {
    const {places, cityCords, activeOffer, currentOffer} = this.props;

    this._map.setView([cityCords.latitude, cityCords.longitude], cityCords.zoom);

    this._layerGroup.clearLayers();

    this.drawPins(places, activeOffer, currentOffer);
  }

  componentWillUnmount() {
    this._map.remove();
  }

  drawPins(places, activeOffer, currentOffer) {

    if (places.length > 0) {
      places.map((place) => {
        leaflet
          .marker([place.location.latitude, place.location.longitude], {icon: ICON})
          .addTo(this._layerGroup);
      });
    }

    if (currentOffer) {
      leaflet
        .marker([currentOffer.location.latitude, currentOffer.location.longitude], {icon: ICON_ACTIVE})
        .addTo(this._layerGroup);
    }

    if (activeOffer) {
      leaflet
        .marker([activeOffer.location.latitude, activeOffer.location.longitude], {icon: ICON_ACTIVE})
        .addTo(this._layerGroup);
    }
  }

  render() {
    return (
      <div id="map" ref={this._mapRef} style={{height: `100%`}}></div>
    );
  }
}

Map.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    bedrooms: PropTypes.number.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    host: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    id: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
    adults: PropTypes.number.isRequired,
    preview: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })),
  cityCords: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
  }).isRequired,
  activeOffer: PropTypes.object,
  currentOffer: PropTypes.object,
};

export default Map;
