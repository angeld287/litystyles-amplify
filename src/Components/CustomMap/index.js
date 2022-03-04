import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_URL } from '../../utils/Constants'

const containerStyle = {
    width: 'auto',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const CustomMap = () => <LoadScript
    googleMapsApiKey={GOOGLE_MAPS_API_URL}>
    <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
    >
        { /* Child components, such as markers, info windows, etc. */}
        <></>
    </GoogleMap>
</LoadScript>


export default CustomMap;