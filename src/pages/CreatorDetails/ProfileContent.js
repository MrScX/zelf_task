import React, { memo } from "react";

import Button from "components/Button/Button";

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
						<div className="DateContentBlock--grid__item">
							<img src={content.content_form === "VIDEO" ? content.thumbnail_url : content.media_urls[0]} />
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