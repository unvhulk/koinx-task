import { useEffect, useState } from "react";
import Pagination from "react-paginate";
import "bootstrap/dist/css/bootstrap.css";
import MobilePopup from "../MobilePopup/MobilePopup.jsx";
import Star from "../../assets/star.png";
import triangleDown from "../../assets/triangle-down.png";
import triangleUp from "../../assets/triangle-up.png";
import downArrow from "../../assets/down-arrow.png";
import { Loader } from "../Loader/Loader.jsx";
import axios from "axios";
import "./CoinList.css";

function CoinList() {
	const [coins, setCoins] = useState([]);
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h%2C7d`
			)
			.then((res) => {
				setCoins(res.data);
				setLoading(false);
			});
	}, [page, perPage]);

	const dollars = new Intl.NumberFormat("en-US");
	const currency = new Intl.NumberFormat();

	const [popup, setPopup] = useState(false);
	const [currentCoin, setCurrentCoin] = useState({});

	const handlePopup = (event, coin) => {
		if (event.view.innerWidth <= 425) {
			setCurrentCoin(coin);
			setPopup(true);
		}
	};

	const handlePerPage = (event) => {
		setPerPage(event.target.innerText);
	};

	const onPageChange = (event) => {
		if (event.selected >= 0) {
			setPage(event.selected + 1);
		} else if (event.target.innerText === "Next") {
			setPage(page + 1);
		} else if (page <= 1) {
			setPage(1);
		} else {
			setPage(page - 1);
		}
	};
	return (
		<div className='coinList'>
			<div className='coinList-container'>
				<div className='coinList-header'>
					<div className='coinList-heading'>
						Top 100 Cryptocurrencies by Market Cap
					</div>
					<div className='dropdown'>
						<div className='dropdownHeader'>show rows</div>
						<div className='dropbtn'>
							{perPage} <img src={downArrow} />
						</div>
						<div class='dropdown-content'>
							<a onClick={handlePerPage}>10</a>
							<a onClick={handlePerPage}>20</a>
							<a onClick={handlePerPage}>30</a>
							<a onClick={handlePerPage}>40</a>
							<a onClick={handlePerPage}>50</a>
							<a onClick={handlePerPage}>60</a>
							<a onClick={handlePerPage}>70</a>
							<a onClick={handlePerPage}>80</a>
							<a onClick={handlePerPage}>90</a>
							<a onClick={handlePerPage}>100</a>
						</div>
					</div>
				</div>
				{loading ? (
					<Loader />
				) : (
					<>
						{popup && (
							<MobilePopup coin={currentCoin} onClose={() => setPopup(false)} />
						)}
						<div className='container mt-5'>
							<table className='table '>
								<thead>
									<tr>
										<th scope='col'></th>
										<th scope='col'>#</th>
										<th scope='col'>Name</th>
										<th scope='col'>Price</th>
										<th scope='col'>24h</th>
										<th scope='col'>7D</th>
										<th scope='col'>Marker Cap</th>
										<th scope='col'>Volume(24h)</th>
										<th scope='col'>Circulating Supply</th>
									</tr>
								</thead>
								<tbody>
									{coins.map((coin, index) => (
										<tr key={coin.id} onClick={() => handlePopup(event, coin)}>
											<th scope='row'>
												<img src={Star} alt='Fav' />
											</th>
											<th scope='row' className='index'>
												{(page - 1) * 10 + index + 1}
											</th>
											<td>
												<div className='coinName'>
													<img src={coin.image} className='coinImage'></img>
													<div>{coin.name}</div>
													<span className='coinSymbol'>
														{coin.symbol.toUpperCase()}
													</span>
												</div>
											</td>
											<td>${dollars.format(coin.current_price)}</td>
											<td
												style={{
													color: `${
														Math.sign(
															coin.price_change_percentage_24h.toFixed(2)
														) >= 0
															? "rgb(22,199,132)"
															: "rgb(234,56,66)"
													}`,
												}}>
												<div className='RowPercent'>
													<img
														src={`${
															Math.sign(
																coin.price_change_percentage_24h.toFixed(2)
															) >= 0
																? triangleUp
																: triangleDown
														}`}
														className='triangleIcon'
													/>
													{Math.abs(
														coin.price_change_percentage_24h.toFixed(2)
													)}
													%
												</div>
											</td>
											<td
												style={{
													color: `${
														Math.sign(
															coin.price_change_percentage_7d_in_currency.toFixed(
																2
															)
														) >= 0
															? "rgb(22,199,132)"
															: "rgb(234,56,66)"
													}`,
												}}>
												<div className='RowPercent'>
													<img
														src={`${
															Math.sign(
																coin.price_change_percentage_7d_in_currency.toFixed(
																	2
																)
															) >= 0
																? triangleUp
																: triangleDown
														}`}
														className='triangleIcon'
													/>
													{Math.abs(
														coin.price_change_percentage_7d_in_currency.toFixed(
															2
														)
													)}
													%
												</div>
											</td>
											<td>${dollars.format(coin.market_cap)}</td>
											<td>${dollars.format(coin.total_volume)}</td>
											<td>
												{currency.format(coin.circulating_supply)}
												<span className='coinSymbol'>
													{coin.symbol.toUpperCase()}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</>
				)}
			</div>

			<Pagination
				previousLabel={<span onClick={onPageChange}>{"<"}</span>}
				nextLabel={<span onClick={onPageChange}>{">"}</span>}
				onPageChange={onPageChange}
				pageRangeDisplayed={3}
				marginPagesDisplayed={2}
				pageCount={10}
				pageClassName='page-item'
				pageLinkClassName='page-link'
				previousClassName='page-item'
				previousLinkClassName='page-link'
				nextClassName='page-item'
				nextLinkClassName='page-link'
				breakLabel='...'
				breakClassName='page-item'
				breakLinkClassName='page-link'
				containerClassName='pagination pagination-container'
				activeClassName='active'
				renderOnZeroPageCount={null}
			/>
		</div>
	);
}

export default CoinList;
