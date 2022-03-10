import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import PropTypes from 'prop-types'

const mapContainerStyle = {
    height: "400px",
    width: "auto"
}

const CustomMap = ({ location, onLocationChanged }) => {
    const [searchBox, setSearchBox] = useState(null);

    const onLoad = (ref) => {
        setSearchBox(ref);
    }

    const onPlacesChanged = useCallback(() => {
        onLocationChanged(searchBox.getPlaces());
    }, [onLocationChanged, searchBox]);

    return (<GoogleMap
        id="searchbox"
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={location}
    >
        <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
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
        <Marker position={location} />
    </GoogleMap>);
}

CustomMap.propTypes = {
    location: PropTypes.object,
    onLocationChanged: PropTypes.func,
}

CustomMap.defaultProps = {
    location: { lat: 18.4657614, lng: -69.936461 },
    onLocationChanged: () => { }
}


export default CustomMap;