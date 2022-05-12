import React from "react";

import SearchBar from "components/SearchBar/SearchBar";

import "./Welcome.scss";

const Welcome = () => {

	return (
		<div className="Welcome">
			<div className="Welcome--search">
				<SearchBar placeholder="Search for a creator" />
			</div>
			<p>
				Search Above to Get Started!
			</p>
		</div>
	);
}

export default Welcome;