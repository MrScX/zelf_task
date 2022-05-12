import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "utils/axiosInstance";

import Container from "components/Container/Container";
import HeaderBanner from "components/HeaderBanner/HeaderBanner";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

import "./CreatorDetails.scss";

const CreatorDetails = () => {

	const { username } = useParams();

	const { data: creator, isLoadingCreator, isErrorCreator } = useQuery(
		["getCreator", username],
		async (_) => {

			try {

				const { data } = await axios.get();

				return data;

			} catch (err) {
				throw new Error(err);
			}
		},
		{
			retry: false,
			refetchOnWindowFocus: false,
		}
	);

	const { data: creatorContent, isLoadingContent, isErrorContent } = useQuery(
		["getCreatorContent", creator],
		async (_) => {

			try {

				const { data } = await axios.get();

				return data;

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

	return (
		<div className="CreatorDetails">
			<HeaderBanner>
				Easily license organic content from creators on all major platforms.
			</HeaderBanner>

			<Container>
				<div className="CreatorDetails--header">
					<ProfileHeader />
				</div>
				
				<div className="CreatorDetails--content">
					<ProfileContent />
				</div>
			</Container>
		</div>
	);
}

export default CreatorDetails;