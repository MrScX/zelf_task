import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "utils/axiosInstance";

import Container from "components/Container/Container";
import HeaderBanner from "components/HeaderBanner/HeaderBanner";
import ContentMessage from "./components/ContentMessage";
import ProfileHeader from "./components/ProfileHeader";
import ProfileContent from "./components/ProfileContent";

import { monthToTextMap } from "utils/consts";

import "./CreatorDetails.scss";

const CreatorDetails = () => {

	const { username } = useParams();

	const [userNotFound, setUserNotFound] = useState(false);
	const [displayableContent, setDisplayableContent] = useState(null);
	const [activeSocialTab, setActiveSocialTab] = useState("instagram");
	const [activeContentMediaTab, setActiveContentMediaTab] = useState("posts");

	const { data: creator, isLoading: isLoadingCreator, isError: isErrorCreator } = useQuery(
		["getCreator", username],
		async (_) => {

			try {

				const { data } = await axios.get(`/Creator/public/?username=${username}`);

				setActiveSocialTab("instagram");
				
				return data;

			} catch (err) {

				if (
					err.response && 
					(
						err.response.status === 404 || 
						err.response.status === 500
					)
				) {
					setUserNotFound(true);
				}

				throw new Error(err);
			}
		},
		{
			enabled: !!username,
			retry: false,
			refetchOnWindowFocus: false,
		}
	);

	const { data: creatorContent, isLoading: isLoadingContent, isError: isErrorContent } = useQuery(
		["getCreatorContent", creator],
		async (_) => {

			try {

				const { data } = await axios.get(`/Instagram/${creator.connected_accounts.instagram.uuid}/contents/`);

				const updatedData = {};
				const contentData = data.data;

				for (let i = 0; i < contentData.length; i++) {

					const date = new Date(contentData[i].timestamp);
					const postedMonth = date.getMonth();
					const postedYear = date.getFullYear();

					const key = `${monthToTextMap[postedMonth]}, ${postedYear}`;
					
					if (updatedData.hasOwnProperty(key)) {
						updatedData[key].push(contentData[i]);
					} else {
						updatedData[key] = [contentData[i]];
					}
				}

				return {
					count: contentData.length,
					content: updatedData,
				};

			} catch (err) {
				throw new Error(err);
			}
		},
		{
			enabled: !!creator,
			retry: false,
			refetchOnWindowFocus: false,
		}
	);

	useEffect(() => {

		if (creatorContent) {

			let filteredContents = {...creatorContent.content};

			if (activeContentMediaTab === "reels") {

				const keys = Object.keys(filteredContents);

				for (let i = 0; i < keys.length; i++) {

					const key = keys[i];
					const contents = filteredContents[key];

					const reels = contents.filter(content => content.content_form === "VIDEO");
					filteredContents[key] = reels;
				}
			}

			setDisplayableContent(filteredContents);
		}

	}, [creatorContent, activeContentMediaTab]);

	const handleContentSearch = (values, fr) => {

		const searchKey = values.search.toLowerCase();

		let filteredContents = { ...creatorContent.content };

		const keys = Object.keys(filteredContents);

		for (let i = 0; i < keys.length; i++) {

			const key = keys[i];
			const contents = filteredContents[key];

			const content = contents.filter(content => content.text.toLowerCase().includes(searchKey));

			console.log(content);

			if (content.length === 0) {
				delete filteredContents[key];
			} else {
				filteredContents[key] = content;
			}
		}

		fr.setSubmitting(false);
		setDisplayableContent(filteredContents);
	}

	const onClickSocialTab = (socialTab) => {
		setActiveSocialTab(socialTab);
	}

	const onClickContentMedia = (mediaTab) => {
		setActiveContentMediaTab(mediaTab);
	}

	return (
		<div className="CreatorDetails">
			<HeaderBanner>
				Easily license organic content from creators on all major platforms.
			</HeaderBanner>

			{
				userNotFound ?
				<p className="CreatorDetails--404">
					User not found.
				</p> :
				<Fragment>
					<div className="CreatorDetails--header">
						<ProfileHeader 
							isLoading={isLoadingCreator}
							creator={creator}
							instaMediaCount={creatorContent && creatorContent.count}
							activeContentMediaTab={activeContentMediaTab}
							onClickContentMedia={onClickContentMedia}
							activeSocialTab={activeSocialTab} 
							onClickSocialTab={onClickSocialTab} 
							handleContentSearch={handleContentSearch}
						/>
					</div>

					<Container>
						<div className="CreatorDetails--content">
							{
								activeSocialTab !== "instagram" || (isErrorCreator || isErrorContent) ?
								<ContentMessage 
									message={
										(isErrorCreator || isErrorContent) ?
										"Something went wrong. Try refreshing the page." :
										"Sorry, no result found!"
									}
								/> :
								<ProfileContent 
									isLoading={isLoadingContent}
									creatorContent={displayableContent}
								/>
							}
						</div>
					</Container>
				</Fragment>
			}
		</div>
	);
}

export default CreatorDetails;