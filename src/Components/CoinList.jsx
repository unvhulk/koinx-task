import Pagination from "react-paginate";
import "bootstrap/dist/css/bootstrap.css";

function CoinList({ coins, onPageChange, pageCount }) {
	const dollars = new Intl.NumberFormat("en-US");
	const currency = new Intl.NumberFormat();

	return (
		<div className='coinList-container'>
			<div className='coinList-header'>
				Top 100 Cryptocurrencies by Market Cap
			</div>
			<div className='container mt-5'>
				<table className='table '>
					<thead>
						<tr>
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
							<tr key={coin.id}>
								<th scope='row'>{(pageCount - 1) * 10 + index + 1}</th>
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
											Math.sign(coin.price_change_percentage_24h.toFixed(2)) >=
											0
												? "Green"
												: "Red"
										}`,
									}}>
									{coin.price_change_percentage_24h.toFixed(2)}%
								</td>
								<td
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
		</div>
	);
}

export default CoinList;
