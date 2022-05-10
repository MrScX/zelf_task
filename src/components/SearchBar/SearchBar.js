import React from "react";

import SearchIcon from "assets/svg_icons/SearchIcon";

import "./SearchBar.scss";

const SearchBar = (props) => {
	return (
		<div className="SearchBar">
			<input placeholder={props.placeholder} />
			<div className="SearchBar--icon">
				<SearchIcon />
			</div>
		</div>
	);
}

export default SearchBar;