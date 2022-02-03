import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
	const [products, setProducts] = useState([]);

	function getProducts() {
		axios
			.get('/api/products')
			.then((res) => {
				setProducts(res.data);
			})
			.catch((err) => {
				console.log(`Error:${err}`);
			});
	}

	let array = products.map((product, index) => {
		return (
			<div className="product-homepage" key={index}>
				<img className="product-image-feature" src={product.product_image} alt="product-pic" />
				<p className="product-name-feature">{product.product_name}</p>
			</div>
		);
	});

	let previewArr = [];
	for (let i = 0; i < 4; i++) {
		previewArr.push(array[i]);
	}

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div className="Home-container-main">
			<div className="escape-container">
				<div className="escape-text">Escape...</div>
				<div className="escape-2nd-text">
					<span>into amazing tech sales!!!</span>
				</div>
			</div>

			<div className="preview-image-container">
				<img
					src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/clans/958135/d4cb66f4d75b0b751877b380db2df096bd461741.jpg"
					className="preview-pic2"
					alt="pic1"
				></img>
				<img
					src="https://cdn.pocket-lint.com/r/s/1200x/assets/images/158992-gadgets-news-save-big-on-portable-power-stations-with-ecoflow-s-christmas-sale-image22-6k2herpvw3.jpg"
					className="preview-pic1"
					alt="pic2"
				></img>
			</div>

			<div className="products-home-container">
				<h1 className="featured-items">Featured Items</h1>
				<div className="featured-products">{previewArr}</div>
			</div>

			<div>
				<Link to="/products">
					<button className="more-items-button">SHOP MORE ↓</button>
				</Link>
			</div>
		</div>
	);
}

export default Home;
