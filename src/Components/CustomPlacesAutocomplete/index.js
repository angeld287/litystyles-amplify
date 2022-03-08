import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import PropTypes from 'prop-types'

const CustomPlacesAutocomplete = ({ setValue }) => (
    <div>
        <p>Seleccione la ubicacion</p>
        <GooglePlacesAutocomplete
            selectProps={{
                onChange: setValue,
            }}
        />
    </div>
);

CustomPlacesAutocomplete.propTypes = {
    setValue: PropTypes.func,
}

CustomPlacesAutocomplete.defaultProps = {
    setValue: () => { },
}


export default CustomPlacesAutocomplete;