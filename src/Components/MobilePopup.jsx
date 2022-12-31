import React from "react";
import "./MobilePopup.css";

const MobilePopup = ({ coin, onClose }) => {
	const dollars = new Intl.NumberFormat("en-US");
	const currency = new Intl.NumberFormat();

	return (
		<>
			<div className='overlay'></div>
			<div className='PopupContainer'>
				<div className='PopupHeader'>
					<div className='coinName'>
						<img src={coin.image} className='coinImage'></img>
						<div>{coin.name}</div>
						<span className='coinSymbol'>{coin.symbol.toUpperCase()}</span>
					</div>
					<div className='PopupClose' onClick={onClose}>
						X
					</div>
				</div>
				<div className='PopupRow'>
					<div className='PopupPrice'>
						<div className='PopupHeading'>PRICE</div>
						<div>${dollars.format(coin.current_price)}</div>
					</div>
					<div className='Popup24H'>
						<div className='PopupHeading'>24H</div>
						<div
							style={{
								color: `${
									Math.sign(coin.price_change_percentage_24h.toFixed(2)) >= 0
										? "Green"
										: "Red"
								}`,
							}}>
							{coin.price_change_percentage_24h.toFixed(2)}%
						</div>
					</div>
					<div className='Popup7D'>
						<div className='PopupHeading'>7D</div>
						<div
							style={{
								color: `${
									Math.sign(
										coin.price_change_percentage_7d_in_currency.toFixed(2)
									) >= 0
										? "Green"
										: "Red"
								}`,
							}}>
							{coin.price_change_percentage_7d_in_currency.toFixed(2)}%
						</div>
					</div>
				</div>
				<div className='PopupMarketcap'>
					<div className='PopupHeading'>MARKET CAP</div>
					<div>${dollars.format(coin.market_cap)}</div>
				</div>
				<div className='PopupVolume'>
					<div className='PopupHeading'>VOLUME(24H)</div>
					<div>${dollars.format(coin.total_volume)}</div>
				</div>
				<div className='PopupSupply'>
					<div className='PopupHeading'>CIRCULATING SUPPLY</div>
					<div>
						{currency.format(coin.circulating_supply)}
						<span className='coinSymbol'>{coin.symbol.toUpperCase()}</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default MobilePopup;
