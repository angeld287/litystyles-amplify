import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: 'auto',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const position = {
    lat: 37.772,
    lng: -122.214
}

const onLoad = marker => {
    console.log('marker: ', marker)
}

const CustomMap = () => <GoogleMap
    mapContainerStyle={containerStyle}
    center={center}
    zoom={10}
>
    <Marker
        onLoad={onLoad}
        position={position}
    />
</GoogleMap>


export default CustomMap;