import { useEffect, useState } from "react";
import "./App.css";
import CoinList from "./Components/CoinList";
import axios from "axios";
import Carousel from "./Components/Carousel";
import back from "./assets/back.png";
import forward from "./assets/forward.png";
import search from "./assets/search.png";
import menu from "./assets/menu.png";
import cSymbol from "./assets/c.png";

function App() {
	const [coins, setCoins] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		axios
			.get(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h%2C7d`
			)
			.then((res) => {
				setCoins(res.data);
			});
	}, [page]);

	function handlePageClick(event) {
		if (event.selected >= 0) {
			setPage(event.selected + 1);
		} else if (event.target.innerText === "Next") {
			setPage(page + 1);
		} else if (page <= 1) {
			setPage(1);
		} else {
			setPage(page - 1);
		}
	}

	return (
		<div className='App'>
			<header className='header'>
				<div className='heading'>
					<img src={cSymbol} alt='' />
					<div>Crypto Tracker</div>
				</div>
				<div className='icons'>
					<img src={search} alt='' />
					<img src={menu} alt='' />
				</div>
			</header>
			<main className='main'>
				<div className='carousel'>
					<div className='buttons back'>
						<img src={back} alt='' />
					</div>
					<div className='cards'>
						<Carousel />
					</div>
					<div className='buttons forward'>
						<img src={forward} alt='' />
					</div>
				</div>
				<div className='coinList'>
					{!coins ? (
						<div>LOADING.....</div>
					) : (
						<CoinList
							coins={coins}
							onPageChange={handlePageClick}
							pageCount={page}
						/>
					)}
				</div>
			</main>
		</div>
	);
}

export default App;
