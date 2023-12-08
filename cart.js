$(document).ready(function () {
	emptyCart()
	var productItem = [{
		productName: "Biryani",
		price: "200",
		photo: "images/biryani.jpg"
	},
	{
		productName: "Samosa",
		price: "30",
		photo: "images/61050397.jpg"
	},
	{
		productName: "Bread Pakoda",
		price: "40",
		photo: "images/84629641 (1).jpg"
	},
	{
		productName: "Sambhar Wada",
		price: "40",
		photo: "images/Medu-vada-with-sambar-WS-1.jpg"
	},
	{
		productName: "Veg Thali",
		price: "150",
		photo: "images/thali.jpg"
	},
	{
		productName: "Maggi",
		price: "40",
		photo: "images/Schezwan-Maggi.jpg"
	},
	{
		productName: "Pohe",
		price: "30",
		photo: "images/poha-recipe-featured.jpg"
	},
	{
		productName: "SandWich",
		price: "50",
		photo: "images/83740315 (1).jpg"
	},
	{
		productName: "Chai",
		price: "10",
		photo: "images/chai.jpg"
},
	{
		productName: "Coffee",
		price: "15",
		photo: "images/coffee.jpg"
	},
	{
		productName: "Coldrinks",
		price: "20",
		photo: "images/dark-reality-of-cold-drinks.jpg"
	},
	{
		productName: "Ice-Cream",
		price: "30",
		photo: "images/Ice-Cream-3.jpg"
	}];
	showProductGallery(productItem);
	// showCartTable();
});


var itemlist = [];
var totalamounts = '';

function addToCart(element) { 
	var productParent = $(element).closest('div.product-item');

	var price = $(productParent).find('.price span').text();
	var productName = $(productParent).find('.productname').text();
	var quantity = $(productParent).find('.product-quantity').val();

	var cartItem = {
		productName: productName,
		price: parseInt(price),
		quantity: parseInt(quantity)
	};
	if (itemlist.find((el) => el.productName == cartItem.productName)) {
		var indexx = itemlist.findIndex((el) => el.productName == cartItem.productName);
		itemlist[indexx].price =  (itemlist[indexx].price);
		itemlist[indexx].quantity = (cartItem.quantity) + (itemlist[indexx].quantity);
	}
	else {
		itemlist.push(cartItem);
	}
	showCartTable()

}

function emptyCart() {
		itemlist = [];
		showCartTable();
}

function removeCartItem(index) {
	if (sessionStorage.getItem('shopping-cart')) {
		var shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
		sessionStorage.removeItem(shoppingCart[index]);
		shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
		showCartTable();
	}
}


function showCartTable() {
	
	console.log(itemlist);
	var cartRowHTML = "";
	var grandTotal = 0;

	var price = 0;
	var quantity = 0;
	var subTotal = 0;

	for (var i = 0; i < itemlist.length; i++) {
			var cartItem = (itemlist);
			price = parseFloat(cartItem[i].price);
			quantity = cartItem[i].quantity;
			subTotal = price * quantity;
			cartRowHTML += "<tr>" +
				"<td class='text-right'>" + cartItem[i].productName + "</td>" +
				"<td class='text-right'>Rs " + price.toFixed(2) + "</td>" +
				"<td class='text-right'><input type='number' onchange='getval(this);' min='1' class='getqu' id='getquantity["+i+"]' value="+quantity+"></td>" +
				"<td class='text-right'>Rs " + subTotal.toFixed(2) + "</td>" +
				"</tr>";
			grandTotal += subTotal;
			
	}

	$('#cartTableBody').html(cartRowHTML);
	$('#totalAmount').css('font-weight', 900);
	$('#totalAmount').text("Rs " + grandTotal.toFixed(2));
	totalamounts = $('#totalAmount').text();
}

function getval(e){
	var unitpr= parseInt(e.parentNode.parentNode.childNodes[1].textContent.replace('Rs ',''))
	var totalpr=(unitpr*parseInt(e.value));
	var index=parseInt(e.id.match(/\d+/)[0]);
	itemlist[index].quantity =parseInt(e.value);
	showCartTable()
}

function showProductGallery(product) {
	//Iterate javascript shopping cart array
	var productHTML = "";
	product.forEach(function (item) {
		productHTML += '<div class="product-item" >' +
			'<img src="' + item.photo + '"style="width: 150px;height: 120px;">' +
			'<div class="productname">' + item.productName + '</div>' +
			'<div class="price">Rs <span>' + item.price + '</span></div>' +
			'<div class="cart-action">' +
			'<input type="number" min="1" class="product-quantity" name="quantity" value="1" size="2" style="width: 60px;"/>' +
			'<input type="submit" value="Add" class="add-to-cart" onClick="addToCart(this)" />' +
			'</div>' +
			'</div>';
		"<tr>";

	});
	$('#product-item-container').html(productHTML);
}

function sucessCart() {
	if(parseInt(totalamounts.replace('Rs ',''))==0){
		Swal.fire({
			icon: 'warning',
			title: 'Please Order Something',
			confirmButtonText: 'OK',
		})
		return;
	}

	Swal.fire({
		title: 'Total Amount <br>' + totalamounts,
		html:
			'<input id="swal-input1" placeholder="name" class="swal2-input">',	
		showCancelButton: true,
		confirmButtonText: 'Go To Payment',
		showLoaderOnConfirm: true,
	}).then((result) => {
		if (result.isConfirmed) {
			var amount=	parseInt(totalamounts.replace('Rs ',''));
			var note=JSON.stringify(itemlist);
			note=$('#swal-input1').val()+' @ '+totalamounts+' // '+note;
			window.location.href = 'https://wa.me/08390150577?text='+note+'';
		}		
	})
}


function logout() {
	window.location.href = 'index.html';
}

