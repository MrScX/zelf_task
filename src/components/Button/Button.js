import React from "react";

import "./Button.scss";

const Button = (props) => {

	const classes = ["Button"];
	const componentProps = ["primary", "text"];
	const Composition = props.as;
	const propsCopy = {...props};

	if (propsCopy.primary) {
		classes.push("Button--primary");
	} else if (propsCopy.text) {
		classes.push("Button--text");
	}

	// Remove Component Props For Composition
	for (let i = 0; i < componentProps.length; i++) {
		delete propsCopy[componentProps[i]];
	}

	return (
		<div className={classes.join(" ")}>
			{
				Composition ?
				<Composition {...propsCopy}>
					{props.children}
				</Composition> :
				<button>
					{props.children}
				</button>
			}
		</div>
	);
}

export default Button;