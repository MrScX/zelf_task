import React from "react";

import "./RoundButton.scss";

const RoundButton = (props) => {

	const { active, icon, children, onClick } = props;

	const classes = ["RoundButton"];

	if (active) {
		classes.push("active");
	}

	if (icon) {
		classes.push("icon");
	}

	return (
		<button className={classes.join(" ")} onClick={onClick}>
			{children}
		</button>
	);
}

export default RoundButton;