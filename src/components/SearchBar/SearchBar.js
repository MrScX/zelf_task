import React from "react";

import SearchIcon from "assets/svg_icons/SearchIcon";

import "./SearchBar.scss";

const SearchBar = (props) => {

	const { placeholder, background, raised, size } = props;

	const sizes = {
		medium: "12px 16px",
		large: "16px 24px",
	};

	return (
		<div className="SearchBar">
			<input 
				style={{ 
					background: background ? background : "#fff",
					padding: size ? sizes[size] : sizes.medium,
					boxShadow: raised ? "0px 20px 100px rgba(0, 0, 0, 0.05)" : "none"
				}} 
				placeholder={placeholder} 
			/>
			<div className="SearchBar--icon">
				<SearchIcon />
			</div>
		</div>
	);
}

export default SearchBar;