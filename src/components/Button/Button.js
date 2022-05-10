import React from "react";

import "./Button.scss";

const Button = (props) => {

	const classes = ["Button"];

	if (props.primary) {
		classes.push("Button--primary");
	} else if (props.text) {
		classes.push("Button--text");
	}

	return (
		<div className={classes.join(" ")}>
			<button>{props.children}</button>
		</div>
	);
}

export default Button;