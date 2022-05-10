import React from "react";

import NavBar from "components/NavBar/NavBar";

const Layout = (props) => {

	return (
		<div className="Layout">
			<div className="Layout--navbar">
				<NavBar />
			</div>

			<main className="Layout--body">
				{props.children}
			</main>
		</div>
	);
}

export default Layout;