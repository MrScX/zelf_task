import React, { memo, useEffect, useState } from "react";
import LazyLoad from "react-lazyload";

import Button from "components/Button/Button";
import ContentMessage from "./ContentMessage";
import Placeholder from "components/Placeholder/Placeholder";

import PlayIcon from "assets/svg_icons/PlayIcon";
import HeartIcon from "assets/svg_icons/HeartIcon";
import SendIcon from "assets/svg_icons/SendIcon";
import AddBagIcon from "assets/svg_icons/AddBagIcon";
import HeartOutlineIcon from "assets/svg_icons/HeartOutlineIcon";
import InstaIcon from "assets/svg_icons/InstaIcon";
import BubbleIcon from "assets/svg_icons/BubbleIcon";
import LoadingIcon from "assets/svg_icons/LoadingIcon";

const DateContentBlock = memo((props) => {

	const { date, contents } = props;

	return (
		<div className="DateContentBlock">
			<p className="DateContentBlock--date">
				{date} <span>({contents.length})</span>
			</p>
			<div className="DateContentBlock--grid">
				{
					contents.map(content => (
						<div key={content.uuid} className="DateContentBlock--grid__item">
							<LazyLoad
								once
								height={280}
								debounce={200}
								offset={[-100, 0]}
								placeholder={
									<Placeholder 
										height="280px"
										width="100%"
									/>
								}
							>
								<img 
									onError={(e) => e.target.src = "https://assets.hypescout.co/admin-uploads/default-placeholder.png"} 
									src={content.content_form === "VIDEO" ? content.thumbnail_url : content.media_urls[0]} 
									alt="instagram media"
								/>
							</LazyLoad>
							{
								content.content_form === "VIDEO" &&
								<div className="DateContentBlock--grid__item--play-icon">
									<PlayIcon />
								</div>
							}
							<div className="DateContentBlock--grid__item--overlay">
								<div className="DateContentBlock--grid__item--overlay__top">
									<div>
										<InstaIcon fill="#fff" />
									</div>
									<div className="DateContentBlock--grid__item--overlay__top--meta">
										<div className="DateContentBlock--grid__item--overlay__top--meta__item">
											<HeartIcon />
											<span>
												{content.likes ? content.likes : "---"}
											</span>
										</div>
										<div className="DateContentBlock--grid__item--overlay__top--meta__item">
											<BubbleIcon />
											<span>
												{content.comments ? content.comments : "---"}
											</span>
										</div>
										<div className="DateContentBlock--grid__item--overlay__top--meta__item">
											<SendIcon />
											<span>
												0
											</span>
										</div>
									</div>
								</div>
								<div className="DateContentBlock--grid__item--overlay__bottom">
									<Button icon onClick={() => console.log("Cursor")}>
										<HeartOutlineIcon />
									</Button>
									<Button icon onClick={() => console.log("Cursor")}>
										<AddBagIcon />
									</Button>
									<Button onClick={() => console.log("Cursor")}>
										Buy License
									</Button>
								</div>
							</div>
						</div>
					))
				}
			</div>
		</div>
	);
});

const ProfileContent = (props) => {

	const { isLoading, creatorContent } = props;

	const [isContentEmpty, setIsContentEmpty] = useState(false);

	useEffect(() => {

		if (creatorContent) {

			let isEmpty = true;
			const keys = Object.keys(creatorContent);
			
			if (keys.length === 0) {
				isEmpty = true;
			} else {
	
				for (let i = 0; i < keys.length; i++) {
	
					const contents = creatorContent[keys[i]];
	
					if (contents.length !== 0) {
						isEmpty = false;
						break;
					}
				}
			}
			
			setIsContentEmpty(isEmpty);
		}

	}, [creatorContent]);

	return (
		<div className="ProfileContent">
			{
				isLoading ?
				<div className="ProfileContent--loader">
					<LoadingIcon />
					<p>
						Loading more content
					</p>
				</div> :
				isContentEmpty ?
					<ContentMessage 
						message="Sorry, no content found!"
					/> :
				creatorContent &&
				Object.keys(creatorContent).map(key => (
					<DateContentBlock 
						key={key}
						date={key}
						contents={creatorContent[key]}
					/>
				))
			}
		</div>
	);
}

export default ProfileContent;