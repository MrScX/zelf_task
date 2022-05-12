import React from "react";

import "./HeaderBanner.scss";

const HeaderBanner = (props) => {

	return (
		<div className="HeaderBanner">
			<p>{props.children}</p>
		</div>
	);
}

export default HeaderBanner;