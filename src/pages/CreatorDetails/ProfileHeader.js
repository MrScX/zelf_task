import React, { memo } from "react";

import SearchBar from "components/SearchBar/SearchBar";

import InstaIcon from "assets/svg_icons/InstaIcon";
import DotIcon from "assets/svg_icons/DotIcon";

const SocialIconsMeta = memo((props) => {

	const { instaFollowers } = props;

	return (
		<div className="SocialIconsMeta">
			<div className="SocialIconsMeta--item">
				<div className="SocialIconsMeta--item__icon">
					<InstaIcon />
					<p>
						31.2k
					</p>
				</div>
				<div className="SocialIconsMeta--item__icon__full">
					<InstaIcon />
					<div className="SocialIconsMeta--item__icon__full--link">
						<a href="https://instagram.com/layla.gen">
							layla.gen
						</a>
					</div>
					<div className="SocialIconsMeta--item__icon__full--divider">
						<DotIcon />
					</div>
					<p>
						31.2k Followers
					</p>
				</div>
			</div>
		</div>
	);
});

const SocialTabs = memo((props) => {

	const { instaCount, active, onClick } = props;

	return (
		<div className="SocialTabs">
			<div className="SocialTabs--item" onClick={onClick}>
				<p className={active === "instagram" ? "active" : ""}>
					Instagram
				</p>
				<span>
					({ instaCount })
				</span>
				<div className="SocialTabs--item__divider">
					|
				</div>
			</div>

			<div className="SocialTabs--item" onClick={onClick}>
				<p className={active === "tiktok" ? "active" : ""}>
					TikTok
				</p>
				<span>
					(---)
				</span>
				<div className="SocialTabs--item__divider">
					|
				</div>
			</div>

			<div className="SocialTabs--item" onClick={onClick}>
				<p className={active === "pinterest" ? "active" : ""}>
					Pinterest
				</p>
				<span>
					(---)
				</span>
				<div className="SocialTabs--item__divider">
					|
				</div>
			</div>

			<div className="SocialTabs--item" onClick={onClick}>
				<p className={active === "youtube" ? "active" : ""}>
					YouTube
				</p>
				<span>
					(---)
				</span>
			</div>
		</div>
	);
});

const ContentMediaTabs = memo(() => {

	return (
		<div className="ContentMediaTabs">

		</div>
	);
});

const ProfileHeader = () => {

	return (
		<div className="ProfileHeader">
			<div className="ProfileHeader--main">
				<div className="ProfileHeader--main__avatar">
					<img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="user avatar" />
				</div>
				<div className="ProfileHeader--main__title">
					<div className="ProfileHeader--main__title--container">
						<h1>Layla Gennaro</h1>
						<p>
							American Fashion and Beauty Blogger
						</p>
					</div>
					<SocialIconsMeta />
				</div>
			</div>
			<div className="ProfileHeader--search">
				<SearchBar size="large" placeholder="Search photo, video content from Layla" />
			</div>
			<div className="ProfileHeader--social-tabs">
				<SocialTabs instaCount={123} active="instagram" onClick={() => console.log("bla bla")} />
			</div>
		</div>
	);
}

export default ProfileHeader;