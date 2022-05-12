import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "utils/axiosInstance";

import Container from "components/Container/Container";
import HeaderBanner from "components/HeaderBanner/HeaderBanner";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

import { monthToTextMap } from "utils/consts";

import "./CreatorDetails.scss";

const CreatorDetails = () => {

	const { username } = useParams();

	const [userNotFound, setUserNotFound] = useState(false);
	const [activeSocialTab, setActiveSocialTab] = useState("instagram");
	const [activeContentMediaTab, setActiveContentMediaTab] = useState("posts");

	const { data: creator, isLoading: isLoadingCreator, isError: isErrorCreator } = useQuery(
		["getCreator", username, activeSocialTab],
		async (_) => {

			try {

				const { data } = await axios.get(`/Creator/public/?username=${username}`);

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
			enabled: (!!username && activeSocialTab === "instagram"),
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

					console.log(contentData[i].content_form);

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

				return updatedData;

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
							activeContentMediaTab={activeContentMediaTab}
							onClickContentMedia={onClickContentMedia}
							activeSocialTab={activeSocialTab} 
							onClickSocialTab={onClickSocialTab} 
						/>
					</div>

					<Container>
						<div className="CreatorDetails--content">
							{
								activeSocialTab !== "instagram" || (isErrorCreator || isErrorContent) ?
								<p className="CreatorDetails--content__no-result">
									{
										(isErrorCreator || isErrorContent) ?
										"Something went wrong. Try refreshing the page." :
										"Sorry, no result found!"
									}
								</p> :
								<ProfileContent 
									isLoading={isLoadingContent}
									creatorContent={creatorContent}
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