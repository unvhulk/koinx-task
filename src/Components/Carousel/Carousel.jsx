import React from "react";
import { v4 as uuid } from "uuid";
import "./Carousel.css";

const Carousel = () => {
	const cardData = [
		{
			id: uuid(),
			logo: "https://t4.ftcdn.net/jpg/04/99/47/15/360_F_499471589_VmiG326taETG3vQ8Z41rtr0JlNt3E4jO.jpg",
			title: "Take a quiz!",
			description: "Learn and earn $CKB",
		},
		{
			id: uuid(),
			logo: "https://www.patriotsoftware.com/wp-content/uploads/2022/01/what-is-blockchain-1.jpg",
			title: "Portfolio 🔥",
			description: "Track your trades in one place, not all over the place",
		},
		{
			id: uuid(),
			logo: "https://hbr.org/resources/images/article_assets/2016/11/nov16-17-499178960.jpg",
			title: "Portfolio",
			description: "Track your trades in one place, not all over the place",
		},
	];
	return (
		<>
			{cardData.map((card) => {
				return (
					<div className='cardContainer' id={card.id}>
						<div className='logo'>
							<img src={card.logo} />
						</div>
						<div className='content'>
							<div className='title'>{card.title}</div>
							<div className='description'>{card.description}</div>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default Carousel;
