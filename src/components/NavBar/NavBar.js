import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";

import axios from "utils/axiosInstance";

import Button from "components/Button/Button";
import Container from "components/Container/Container";
import SearchBar from "components/SearchBar/SearchBar";

import Logo from "assets/svg_icons/Logo";

import "./NavBar.scss";

const NavBar = () => {

	const history = useHistory();

	const handleUserSearch = async (values) => {

		try {

			const { data } = await axios.get(`/Creator/public/?username=${values.search}`);

			if (data) {
				history.push(`/${data.username}`);
			}
			
		} catch (err) {
			console.log(err);
		}
	}

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
							<Formik
								initialValues={{ search: "" }}
								onSubmit={handleUserSearch}
							>
								{fr => (
									<Form>
										<SearchBar 
											placeholder="Search for a creator" 
											background="#F9FAFA" 
											name="search"
											onChange={fr.handleChange}
											onBlur={fr.handleBlur}
											loading={fr.isSubmitting}
										/>
									</Form>
								)}
							</Formik>
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