import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: this.props.lat, lng: this.props.lng },
      zoom: 12,
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

    return (
      <Map center={currentLocation} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />

        <Marker position={currentLocation}>
          <Popup>
            Lokasimu sekarang
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default MapView;