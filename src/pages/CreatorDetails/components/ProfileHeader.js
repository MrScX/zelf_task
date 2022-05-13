import React, { memo } from "react";
import { Form, Formik } from "formik";

import SearchBar from "components/SearchBar/SearchBar";
import RoundButton from "components/RoundButton/RoundButton";

import InstaIcon from "assets/svg_icons/InstaIcon";
import DotIcon from "assets/svg_icons/DotIcon";
import ReelsIcon from "assets/svg_icons/ReelsIcon";
import PostsIcon from "assets/svg_icons/PostsIcon";
import Placeholder from "components/Placeholder/Placeholder";

import { formatFollower } from "utils/utils";

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
						{instaFollowers} Followers
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
					({ instaCount ? instaCount : "---" })
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
					<ReelsIcon active={activeMedia === "reels"} />
					Reels
				</RoundButton>
			</div>
		</div>
	);
});

const ProfileHeader = (props) => {

	const { 
		isLoading,
		creator,
		instaMediaCount,
		activeSocialTab, 
		onClickSocialTab, 
		activeContentMediaTab, 
		onClickContentMedia,
		handleContentSearch
	} = props;

	return (
		<div className="ProfileHeader">
			<div className="ProfileHeader--main">
				<div className="ProfileHeader--main__avatar">
					{
						isLoading ?
						<Placeholder image /> :
						<img 
							onError={(e) => e.target.src = "https://d33wubrfki0l68.cloudfront.net/static/media/1ce1faa35ad7a04d395bf250c21248d2aa4d24f9/pp.2fff3a92bb5afbe374c0.jpeg" }
							alt="user avatar" 
							src={creator.connected_accounts.instagram.profile_picture_url} 
						/>
					}
				</div>

				<div className="ProfileHeader--main__title">
					<div className="ProfileHeader--main__title--container">
						{
							isLoading ?
							<Placeholder title width={250} /> :
							<h1>{creator.connected_accounts.instagram.username}</h1>
						}
						{
							isLoading ?
							<Placeholder paragraph /> :
							<p>
								{
									creator.connected_accounts.instagram.text ?
									creator.connected_accounts.instagram.text : 
									"Content Creator"
								}
							</p>
						}
					</div>
					
					{
						isLoading ?
						<Placeholder paragraph /> :
						<SocialIconsMeta 
							instaFollowers={
								creator.connected_accounts.instagram.followers ? 
								formatFollower(creator.connected_accounts.instagram.followers) : 
								"---"
							}
						/>		
					}
				</div>
			</div>

			<div className="ProfileHeader--search">
				<Formik
					initialValues={{ search: "" }}
					onSubmit={handleContentSearch}
				>
					{fr => (
						<Form>
							<SearchBar 
								raised
								size="large" 
								placeholder="Search photo, video content from Layla" 
								name="search"
								onChange={fr.handleChange}
								onBlur={fr.handleBlur}
								loading={fr.isSubmitting}
							/>
						</Form>
					)}
				</Formik>
			</div>

			<div className="ProfileHeader--social-tabs">
				<SocialTabs 
					instaCount={instaMediaCount} 
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