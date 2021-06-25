import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import '../../../assets/leaflet/map.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

//Setting marker icon
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: this.props.lat, lng: this.props.lng },
      zoom: 18,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
        this.setState({
          currentLocation: { lat: this.props.lat, lng: this.props.lng },
      })
    }
  }

  render() {
    const { currentLocation, zoom } = this.state;
    const fillBlueOptions = { fillColor: 'blue' };

    return (
      <Map center={currentLocation} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />

        <Marker position={currentLocation}>
          <Popup>
            Lokasi presensi
          </Popup>
        </Marker>
        <Circle center={[-6.87202462684,107.57093365]} pathOptions={fillBlueOptions} radius={50}>
          <Popup>Radius Asrama Polban</Popup>
        </Circle>
      </Map>
    );
  }
}

export default MapView;