import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function Navbar() {
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<Link className='navbar-brand' to='/'>
				KoinX
			</Link>
			<button
				className='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarNav'
				aria-controls='navbarNav'
				aria-expanded='false'
				aria-label='Toggle navigation'>
				<span className='navbar-toggler-icon'></span>
			</button>
			<div className='collapse navbar-collapse' id='navbarNav'>
				<ul className='navbar-nav mr-auto'>
					<li className='nav-item active'>
						<Link className='nav-link' to='/'>
							Home
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/about'>
							About
						</Link>
					</li>
				</ul>
				<form className='form-inline my-2 my-lg-0'>
					<input
						className='form-control mr-sm-2'
						type='search'
						placeholder='Search'
						aria-label='Search'
					/>
					<button
						className='btn btn-outline-success my-2 my-sm-0'
						type='submit'>
						Search
					</button>
				</form>
			</div>
		</nav>
	);
}

export default Navbar;
