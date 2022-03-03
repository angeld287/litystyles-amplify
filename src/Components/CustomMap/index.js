import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { GOOGLE_MAPS_API_URL } from '../../utils/Constants'

const OwnGoogleMap = withScriptjs(withGoogleMap(({ isMarkerShown }) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
        {isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    </GoogleMap>
))

const CustomMap = () => <OwnGoogleMap
    isMarkerShown
    googleMapURL={GOOGLE_MAPS_API_URL}
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
/>


export default CustomMap;