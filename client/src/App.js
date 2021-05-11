import './App.css';
import {GoogleMap, useLoadScript, InfoWindow, Marker} from '@react-google-maps/api';
import firebase from './firebaseConfig';
import dotenv from "dotenv";
import { useDocumentData } from 'react-firebase-hooks/firestore'
import React from 'react';
dotenv.config();

const firestore = firebase.firestore();

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh"
}


const options = {
  styles: [
    {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "hue": "#ff0000"
            }
        ]
    }
  ],
  disableDefaultUI: true,
  zoomControl: true
}

const currentDate = new Date();

let lati;
let longi;

// class App extends React.Component
// {
//   state = {
//     currentLat: -31.329078676945485,
//     currentLng: -54.10525241226574,
//   }

//   componentDidMount()
//   {
//     const {isLoaded, loadError} = useLoadScript({
//       googeMapsApiKey: process.env.GOOGLE_API_KEY,
//       libraries
//     });
//   }

  

//   render()
//   {
      

//     if(loadError) return "Error loading maps";
//     if(!isLoaded) return "Loading maps";

//     return (
//       <div className="App">
//        <GoogleMap mapContainerStyle={mapContainerStyle}
//        zoom={14}
//        center={{lat: this.state.currentLat, lng: this.state.currentLng}}
//        options={options}
//        >
  
//       <Marker
//        key={0}
//        position={{lat: this.state.currentLat, lng: this.state.currentLng}} 
//       ></Marker>
  
//        </GoogleMap>
//       </div>
//     );
//   }
// }

function App() {
  const [snapshot, loading, error] = useDocumentData(
    //`bus_0/positions_${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`
    firebase.firestore().doc(`bus_0/positions_10_5_2021`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

    

  const {isLoaded, loadError} = useLoadScript({
    googeMapsApiKey: process.env.GOOGLE_API_KEY,
    libraries
  });

  if(error) return "Error fetching data";
  if(loading) return "Fetching data";

  console.log(snapshot.positions[0].lat)
  const currentPos = {
    lat: Number(snapshot.positions[0].position.lat),
    lng: Number(snapshot.positions[0].position.lng)
  };

  if(loadError) return "Error loading maps";
  if(!isLoaded) return "Loading maps";

  return (
    <div className="App">
     <GoogleMap mapContainerStyle={mapContainerStyle}
     zoom={18}
     center={currentPos}
     options={options}
     >

    <Marker
     key={0}
     position={currentPos} 
    ></Marker>

     </GoogleMap>
    </div>
  );
}

export default App;
