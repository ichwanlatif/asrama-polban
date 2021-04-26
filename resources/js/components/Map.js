import React, {Component} from 'react';
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet';
import './map.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: props.latitude,
      long: props.longitude
    };
  }

  render() {
    const { lat, long } = this.state;
    return (
      <div>
        <MapContainer center={[lat, long]} zoom={13} id="mapid">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[lat, long]}>
            <Popup>
              I am Here dude
            </Popup>
          </Marker>
        </MapContainer>
      </div >
    );
  }
}

export default Map;
