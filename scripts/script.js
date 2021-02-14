// Script.js

window.addEventListener('DOMContentLoaded', () => {
	if(localStorage.getItem('itemlist')==null) {
		fetch('https://fakestoreapi.com/products').then(response=>response.text()).then(list=>localStorage.setItem('itemlist',list));
	}
	localStorage.setItem('cartlist');
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
		price.textContent = list[i]['price'];
		const cart = listing.shadowRoot.appendChild(document.createElement('button'));
		cart.setAttribute('onclick',"alert('Added to cart!')");
		cart.textContent = "Add to Cart";
		cart.addEventListener('click', butswitch);
	}
});
const cartnum = document.getElementById("cart-count");
function butswitch(e) {
	if(e.textContent != "Add to Cart") {
		e.textContent = "Remove from Cart";
		let temp = parseInt(cartnum.textContent) + 1;
		cartnum.textContent = temp;
	}
	else {
		e.textContent = "Add to Cart";
		let temp = parseInt(cartnum.textContent)-1;
		cartnum.textContent = temp;
	}
}