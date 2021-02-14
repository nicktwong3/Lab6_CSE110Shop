// Script.js

window.addEventListener('DOMContentLoaded', () => {
	if(localStorage.getItem('itemlist')==null) {
		fetch('https://fakestoreapi.com/products').then(response=>response.text()).then(list=>localStorage.setItem('itemlist',list));
	}
	const list = JSON.parse(localStorage.getItem('itemlist'));
	const prodlist = document.getElementById('product-list');
	for(let i = 0; i < list.length; i++) {
		const listing = prodlist.appendChild(document.createElement('product-item'));
		listing.setAttribute('class','product');
		const image = listing.shadowRoot.appendChild(document.createElement('img'));
		image.setAttribute('src',list[i]['image']);
		image.setAttribute('alt',list[i]['title']);
		image.setAttribute('width','200');
		const desc = listing.shadowRoot.appendChild(document.createElement('p'));
		desc.setAttribute('class','title');
		desc.textContent = list[i]['title'];
		const price = listing.shadowRoot.appendChild(document.createElement('p'));
		price.setAttribute('class','price');
		price.textContent = '$' + list[i]['price'];
		const cart = listing.shadowRoot.appendChild(document.createElement('button'));
		cart.setAttribute('onclick',"addtocart(this)");
		cart.textContent = "Add to Cart";
	}
	const cartlist = {};
});
const cartnum = document.getElementById("cart-count");
function addtocart(e) {
	e.textContent = "Remove from Cart";
	e.setAttribute('onclick',"removefromcart(this)");
	alert("Added to cart");
	let temp = parseInt(cartnum.textContent) + 1;
	cartnum.textContent = temp;
}
function removefromcart(e) {
	e.textContent = "Add to Cart";
	e.setAttribute('onclick',"addtocart(this)");
	alert("Removed from cart");
	let temp = parseInt(cartnum.textContent) - 1;
	cartnum.textContent = temp;
}