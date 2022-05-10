import React from "react";

import "./Container.scss";

const Container = (props) => {

	return (
		<div className="Container">
			{props.children}
		</div>
	);
}

export default Container;