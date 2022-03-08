import React, { useState } from 'react';
import { GoogleMap, Marker, StandaloneSearchBox } from '@react-google-maps/api';

const mapContainerStyle = {
    height: "400px",
    width: "auto"
}

const center = {
    lat: 38.685,
    lng: -115.234
};

const CustomMap = () => {

    const [searchBox, setSearchBox] = useState(null);
    const [position, setPosition] = useState(null);

    const onLoad = ref => {
        setSearchBox(ref);
    }

    const onLoadMarker = ref => {
        console.log(ref);
    }

    const onPlacesChanged = () => {
        var places = searchBox.getPlaces()
        console.log(places[0]);

        console.log(places[0].geometry.location.lat())
        console.log(places[0].geometry.location.lng())

        setPosition({
            lat: places[0].geometry.location.lat(),
            lng: places[0].geometry.location.lng()
        });
    };

    return (<GoogleMap
        id="searchbox"
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={position}
    >
        <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={
                onPlacesChanged
            }
        >
            <input
                type="text"
                placeholder="Cambiar de Ubicacion"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-120px"
                }}
            />
        </StandaloneSearchBox>
        <Marker
            onLoad={onLoadMarker}
            position={position}
        />
    </GoogleMap>);
}


export default CustomMap;