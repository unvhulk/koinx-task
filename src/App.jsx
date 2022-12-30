import { useEffect, useState } from "react";
import "./App.css";
import CoinList from "./Components/CoinList";
import axios from "axios";
import Carousel from "./Components/Carousel";

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
				<div className='heading'>Crypto Tracker</div>
				<div className='icons'>Search</div>
			</header>
			<main className='main'>
				<div className='carousel'>
					<div className='back'>
						<img src='' alt='' />
					</div>
					<div className='cards'>
						<Carousel />
					</div>
					<div className='forward'></div>
				</div>
				<div className='coinList'>
					<CoinList
						coins={coins}
						onPageChange={handlePageClick}
						pageCount={page}
					/>
				</div>
			</main>
		</div>
	);
}

export default App;
