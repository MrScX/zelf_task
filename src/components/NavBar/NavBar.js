import React from "react";
import { Link } from "react-router-dom";

import Button from "components/Button/Button";
import Container from "components/Container/Container";
import SearchBar from "components/SearchBar/SearchBar";

import Logo from "assets/svg_icons/Logo";

import "./NavBar.scss";

const NavBar = (props) => {

	return (
		<div className="NavBar--root">
			<Container>
				<nav className="NavBar">
					<div className="NavBar--left">
						<div className="NavBar--left__logo">
							<Link to="/">
								<Logo />
							</Link>
						</div>
						<div className="NavBar--left__search">
							<SearchBar placeholder="Search photo, video, creator etc." background="#F9FAFA" />
						</div>
					</div>
					<div className="NavBar--right">
						<div className="NavBar--right__links">
							<div className="NavBar--right__links--item">
								<Link to="#">
									Explore
								</Link>
							</div>
							<div className="NavBar--right__links--item">
								<Link to="#">
									License
								</Link>
							</div>
							<div className="NavBar--right__links--item">
								<Link to="#">
									Pricing
								</Link>
							</div>
						</div>

						<div className="NavBar--right__buttons">
							<div className="NavBar--right__buttons--item">
								<Button text as={Link} to="/sign-in">
									Sign In
								</Button>
							</div>
							<div className="NavBar--right__buttons--item">
								<Button primary as={Link} to="/sign-up">
									Join
								</Button>
							</div>
						</div>
					</div>
				</nav>
			</Container>
		</div>
	);
}

export default NavBar;