import React, { Component } from 'react';
import MapAPI from '../utils/MapAPI';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
// import filterByClass from './filter';
import SearchbyCategory from './SearchbyName';

// Source 1: https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2
// Source 2: https://www.digitalocean.com/community/tutorials/how-to-integrate-the-google-maps-api-into-react-applications
// npm documentation: https://www.npmjs.com/package/google-maps-react


class GoogleMapDisplay extends Component {

    // The constructor is a method that’s automatically called during the creation of an object from a class. 
    // It can handle your initial setup stuff like defaulting some properties of the object, or sanity checking the arguments that were passed in. 
    // Simply put, the constructor aids in constructing things.
    // Source: https://www.digitalocean.com/community/tutorials/react-constructors-with-react-components
    constructor(props) {
        super(props);
        this.state = {
            places: [{}],

            filteredPlaces: [{}],

            showingInfoWindow: false, // Hides or the shows the infoWindow

            activeMarker: {}, // Shows the active marker upon click

            selectedPlace: {}, // Shows the infoWindow to the selected place upon a marker

            // function to handle a search by category
            searchbyName: event => {
                console.log(event.target.value);
                const filter = event.target.value;
                const filteredCategories = this.state.places.filter(item => {
                // merge data together, then see if user input is anywhere inside
                let values = Object.values(item)
                    .join("")
                    .toLowerCase();
                return values.indexOf(filter.toLowerCase()) !== -1;
                });
                this.setState({ filteredPlaces: filteredCategories });
          },
        }  
    };


    // Mount API Map data and push it to the state:
    componentDidMount() {
        MapAPI.getPlaces()
            .then(places => {
                this.setState({ places: places.data })
                // console.log(this.state.places);
                this.setState({filteredPlaces: places.data})
            })
            .catch(err => console.error(err));
    };


    // Function to loop through the state named "places" and create markers.
    displayMarkers = () => {
        return this.state.filteredPlaces.map((filteredPlaces, index) => {
            return <Marker
                key={index}
                id={index}
                title={filteredPlaces.title}
                position={{ lat: filteredPlaces.lat, lng: filteredPlaces.lng }}
                name={filteredPlaces.title}
                address={filteredPlaces.address}
                text={filteredPlaces.contentString}
                onClick={this.onMarkerClick}
                icon= {{
                  url: filteredPlaces.icon,
                  anchor: new this.props.google.maps.Point(20,20),
                  scaledSize: new this.props.google.maps.Size(20,20)
                }}
            />
        })
    };


    // Event handler for when the map and marker are clicked.
    onMarkerClick = (props, marker, e) => {
        console.log("marker clicked");
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    };


    // Event handler for closing the inforWindow once the user clicks on the close button on the info window.
    onClose = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    // Function used to render data onto the web page. Uses JSX
    render() {
        return (
            <>
                <SearchbyCategory 
                    searchbyName={this.state.searchbyName}
                />
               
                <Map
                    google={this.props.google}
                    zoom={8}
                    styles={mapStyles}
                    initialCenter={{ lat: 27.6648, lng: -81.5158 }}
                >
                    {this.displayMarkers()}
                    <InfoWindow 
                        marker={this.state.activeMarker} 
                        visible={this.state.showingInfoWindow} 
                        onClose={this.onClose}>
                            <h1>{this.state.selectedPlace.name}</h1>
                            <h4>{this.state.selectedPlace.address}</h4>
                            <p>{this.state.selectedPlace.text}</p>
                    </InfoWindow>
                </Map>
               
            </>
        );
    }

}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyC3hzTZI75vAi2NaV6zk_9Df1-pe-WAEm8'
})(GoogleMapDisplay)

// Styles the Google Map
 
  const mapStyles = [
      {
          width: '100%',
          height: '100%'
      },
      {
          elementType: 'geometry',
          stylers: [
              {
                  color: '#242f3e'
              }
          ]
      },
      {
          elementType: 'labels.text.fill',
          stylers: [
              {
                  color: '#746855'
              }
          ]
      },
      {
          elementType: 'labels.text.stroke',
          stylers: [
              {
                  color: '#242f3e'
              }
          ]
      },
      {
          featureType: 'administrative.land_parcel',
          elementType: 'labels',
          stylers: [
              {
                  visibility: 'off'
              }
          ]
      },
      {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [
              {
                  color: '#d59563'
              }
          ]
      },
      {
          featureType: 'poi',
          elementType: 'labels.text',
          stylers: [
              {
                  visibility: 'off'
              }
          ]
      },
      {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [
              {
                  color: '#d59563'
              }
          ]
      },
      {
          featureType: 'poi.business',
          stylers: [
              {
                  visibility: 'off'
              }
          ]
      },
      {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
              {
                  color: '#263c3f'
              }
          ]
      },
      {
          featureType: 'poi.park',
          elementType: 'labels.text',
          stylers: [
              {
                  visibility: 'off'
              }
          ]
      },
      {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [
              {
                  color: '#6b9a76'
              }
          ]
      },
      {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [
              {
                  color: '#38414e'
              }
          ]
      },
      {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [
              {
                  color: '#212a37'
              }
          ]
      },
      {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [
              {
                  color: '#9ca5b3'
              }
          ]
      },
      {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [
              {
                  color: '#746855'
              }
          ]
      },
      {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
              {
                  color: '#1f2835'
              }
          ]
      },
      {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [
              {
                  color: '#f3d19c'
              }
          ]
      },
      {
          featureType: 'road.local',
          elementType: 'labels',
          stylers: [
              {
                  visibility: 'off'
              }
          ]
      },
      {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [
              {
                  color: '#2f3948'
              }
          ]
      },
      {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [
              {
                  color: '#d59563'
              }
          ]
      },
      {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
              {
                  color: '#17263c'
              }
          ]
      },
      {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [
              {
                  color: '#515c6d'
              }
          ]
      },
      {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [
              {
                  color: '#17263c'
              }
          ]
      }
  ]



  

