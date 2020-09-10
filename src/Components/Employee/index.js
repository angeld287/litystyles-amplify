import React from 'react';


const Employee = (props) => {

	return (
		<div>
            <h1>Employee: {props.state.email}</h1>
        </div>
	);
};

export default Employee;