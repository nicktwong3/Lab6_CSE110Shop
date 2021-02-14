// Script.js
let cartlist = {};
const cartnum = document.getElementById("cart-count");
window.addEventListener('DOMContentLoaded', () => {
	if(localStorage.getItem('itemlist')==null) {
		fetch('https://fakestoreapi.com/products').then(response=>response.text()).then(list=>localStorage.setItem('itemlist',list));
	}
	const list = JSON.parse(localStorage.getItem('itemlist'));
	if(localStorage.getItem('cartlist')!=null) {
		cartlist = JSON.parse(localStorage.getItem('cartlist'));
	}
	else {
		for(let i = 0; i < list.length; i++) {
			cartlist[list[i]['id']] = false;
		}
	}
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
		cart.setAttribute('id',list[i]['id']);
		if(cartlist[list[i]['id']]===true) {
			cart.setAttribute('onclick',"removefromcart(this);");
			cart.textContent = "Remove from cart";
			let temp = parseInt(cartnum.textContent) + 1;
			cartnum.textContent = temp;
		}
		else {
			cartlist[list[i]['id']]=false;
			cart.setAttribute('onclick',"addtocart(this);");
			cart.textContent = "Add to Cart";
		}
	}
	localStorage.setItem('cartlist',JSON.stringify(cartlist));
});
function addtocart(e) {
	e.textContent = "Remove from Cart";
	e.setAttribute('onclick',"removefromcart(this);");
	cartlist[e.getAttribute('id')]=true;
	localStorage.setItem('cartlist',JSON.stringify(cartlist));
	alert("Added to cart");
	let temp = parseInt(cartnum.textContent) + 1;
	cartnum.textContent = temp;
}
function removefromcart(e) {
	e.textContent = "Add to Cart";
	e.setAttribute('onclick',"addtocart(this);");
	cartlist[e.getAttribute('id')]=false;
	localStorage.setItem('cartlist',JSON.stringify(cartlist));
	alert("Removed from cart");
	let temp = parseInt(cartnum.textContent) - 1;
	cartnum.textContent = temp;
}