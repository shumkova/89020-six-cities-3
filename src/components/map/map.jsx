import React from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {connect} from "react-redux";
import {getOfferById} from "../../reducer/data/selectors";
import {getActiveOffer, getCurrentOffer} from "../../reducer/app/selectors";

// const ZOOM = 12;

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

    const coordinates = places.map((place) => place.location);

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

    this.drawPins(coordinates, activeOffer, currentOffer);
  }

  componentDidUpdate() {
    const {places, cityCords, activeOffer, currentOffer} = this.props;


    const coordinates = places.map((place) => place.location);

    this._map.setView([cityCords.latitude, cityCords.longitude], cityCords.zoom);

    this._layerGroup.clearLayers();

    this.drawPins(coordinates, activeOffer, currentOffer);
  }

  componentWillUnmount() {
    this._map.remove();
  }

  drawPins(coordinates, activeOffer, currentOffer) {

    coordinates.map((coordinate) => {
      leaflet
        .marker([coordinate.latitude, coordinate.longitude], {icon: ICON})
        .addTo(this._layerGroup);
    });

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

    // if (activeOffer && currentOffer) {
    //   leaflet
    //     .marker([activeOffer.location.latitude, activeOffer.location.longitude], {icon: ICON_ACTIVE})
    //     .addTo(this._layerGroup);
    //
    //   leaflet
    //     .marker([currentOffer.location.latitude, currentOffer.location.longitude], {icon: ICON})
    //     .addTo(this._layerGroup);
    // }
  }

  render() {
    return (
      <div id="map" ref={this._mapRef} style={{height: `100%`}}></div>
    );
  }
}

Map.propTypes = {
  places: PropTypes.arrayOf(
      PropTypes.object.isRequired
  ).isRequired,
  cityCords: PropTypes.object.isRequired,
  activeOffer: PropTypes.object,
  currentOffer: PropTypes.object,
};

const mapStateToProps = (state) => ({
  activeOffer: getOfferById(state, getActiveOffer(state)),
  currentOffer: getOfferById(state, getCurrentOffer(state)),
});

export {Map};

export default connect(mapStateToProps)(Map);
