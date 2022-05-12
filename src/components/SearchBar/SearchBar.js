import React from "react";

import SearchIcon from "assets/svg_icons/SearchIcon";

import "./SearchBar.scss";

const SearchBar = (props) => {

	const sizes = {
		medium: "12px 16px",
		large: "16px 24px",
	};

	return (
		<div className="SearchBar">
			<input 
				style={{ 
					background: props.background ? props.background : "#fff",
					padding: props.size ? sizes[props.size] : sizes.medium
				}} 
				placeholder={props.placeholder} 
			/>
			<div className="SearchBar--icon">
				<SearchIcon />
			</div>
		</div>
	);
}

export default SearchBar;