import React, {Component} from 'react';
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet';
import './map.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      long: 0
    };
    this.getLocation = this.getLocation.bind(this);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });
      });
    }
    else {
      alert('Sorry, Your browser not support');
    }
  }

  render() {
    this.getLocation();
    const { lat, long } = this.state;
    console.log(lat, long)
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