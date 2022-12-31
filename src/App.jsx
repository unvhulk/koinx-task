import "./App.css";
import CoinList from "./Components/CoinList/CoinList";
import Carousel from "./Components/Carousel/Carousel";
import back from "./assets/back.png";
import forward from "./assets/forward.png";
import search from "./assets/search.png";
import menu from "./assets/menu.png";
import cSymbol from "./assets/c.png";

function App() {
	return (
		<div className='App'>
			<header className='header'>
				<div className='heading'>
					<img src={cSymbol} alt='Crypto' />
					<div>Crypto Tracker</div>
				</div>
				<div className='icons'>
					<img src={search} alt='Search' />
					<img src={menu} alt='Menu' />
				</div>
			</header>
			<main className='main'>
				<div className='carousel'>
					<div className='buttons back'>
						<img src={back} alt='Back' />
					</div>
					<div className='cards'>
						<Carousel />
					</div>
					<div className='buttons forward'>
						<img src={forward} alt='Next' />
					</div>
				</div>
				<CoinList />
			</main>
		</div>
	);
}

export default App;
