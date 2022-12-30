import { Link } from "react-router-dom";

function MobilePopup({ show, onClose }) {
	return (
		<div className={`mobile-popup ${show ? "show" : ""}`}>
			<div className='mobile-popup-overlay' onClick={onClose}></div>
			<div className='mobile-popup-content'>
				<h3>Menu</h3>
				<ul>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='/about'>About</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default MobilePopup;
