import React, { memo } from "react";

import SearchBar from "components/SearchBar/SearchBar";
import RoundButton from "components/RoundButton/RoundButton";

import InstaIcon from "assets/svg_icons/InstaIcon";
import DotIcon from "assets/svg_icons/DotIcon";
import PlayIcon from "assets/svg_icons/PlayIcon";
import PostsIcon from "assets/svg_icons/PostsIcon";

const SocialIconsMeta = memo((props) => {

	const { instaFollowers } = props;

	return (
		<div className="SocialIconsMeta">
			<div className="SocialIconsMeta--item">
				<div className="SocialIconsMeta--item__icon">
					<InstaIcon />
					
					<p>
						{instaFollowers}
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

	const { instaCount, active, onClickSocialTab } = props;

	return (
		<div className="SocialTabs">
			<div className="SocialTabs--item" onClick={() => onClickSocialTab("instagram")}>
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

			<div className="SocialTabs--item" onClick={() => onClickSocialTab("tiktok")}>
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

			<div className="SocialTabs--item" onClick={() => onClickSocialTab("pinterest")}>
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

			<div className="SocialTabs--item" onClick={() => onClickSocialTab("youtube")}>
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

const ContentMediaTabs = memo((props) => {

	const { activeMedia, onClickContentMedia } = props;

	return (
		<div className="ContentMediaTabs">
			<div>
				<RoundButton 
					icon 
					active={activeMedia === "posts"}
					onClick={() => { onClickContentMedia("posts") }}
				>
					<PostsIcon active={activeMedia === "posts"} />
					Posts
				</RoundButton>
			</div>

			<div>
				<RoundButton 
					icon 
					active={activeMedia === "reels"} 
					onClick={() => { onClickContentMedia("reels") }}
				>
					<PlayIcon active={activeMedia === "reels"} />
					Reels
				</RoundButton>
			</div>
		</div>
	);
});

const ProfileHeader = (props) => {

	const { 
		activeSocialTab, 
		onClickSocialTab, 
		activeContentMediaTab, 
		onClickContentMedia 
	} = props;

	return (
		<div className="ProfileHeader">
			<div className="ProfileHeader--main">
				<div className="ProfileHeader--main__avatar">
					<img 
						alt="user avatar" 
						src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
					/>
				</div>

				<div className="ProfileHeader--main__title">
					<div className="ProfileHeader--main__title--container">
						<h1>Layla Gennaro</h1>
						<p>
							American Fashion and Beauty Blogger
						</p>
					</div>

					<SocialIconsMeta 
						instaFollowers="31.2k" 
					/>
				</div>
			</div>

			<div className="ProfileHeader--search">
				<SearchBar 
					size="large" 
					placeholder="Search photo, video content from Layla" 
				/>
			</div>

			<div className="ProfileHeader--social-tabs">
				<SocialTabs 
					instaCount={123} 
					active={activeSocialTab} 
					onClickSocialTab={onClickSocialTab} 
				/>
			</div>

			<div className="ProfileHeader--content-tabs">
				<ContentMediaTabs 
					activeMedia={activeContentMediaTab} 
					onClickContentMedia={onClickContentMedia} 
				/>
			</div>
		</div>
	);
}

export default ProfileHeader;