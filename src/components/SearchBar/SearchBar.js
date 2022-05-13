import React from "react";

import SearchIcon from "assets/svg_icons/SearchIcon";
import LoaderIcon from "assets/svg_icons/LoaderIcon";

import "./SearchBar.scss";

const SearchBar = (props) => {

	const { placeholder, background, raised, size, name, loading, onChange, onBlur } = props;

	const sizes = {
		medium: "12px 16px",
		large: "16px 24px",
	};

	return (
		<div className="SearchBar">
			<input 
				autoComplete="off"
				style={{ 
					background: background ? background : "#fff",
					padding: size ? sizes[size] : sizes.medium,
					boxShadow: raised ? "0px 20px 100px rgba(0, 0, 0, 0.05)" : "none"
				}} 
				placeholder={placeholder} 
				name={name}
				onChange={onChange}
				onBlur={onBlur ? onBlur : null}
			/>
			<div className="SearchBar--icon">
				{
					loading ?
					<LoaderIcon /> :
					<SearchIcon />
				}
			</div>
		</div>
	);
}

export default SearchBar;