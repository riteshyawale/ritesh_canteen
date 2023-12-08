$(document).ready(function () {
	emptyCart()
	var productItem = [{
		productName: "Biryani",
		price: "200",
		photo: "https://assets.cntraveller.in/photos/6218cfdf6774879c067d3ece/1:1/w_1079,h_1079,c_limit/best%20biryani%20in%20pune%20lead.jpg"
	},
	{
		productName: "Samosa",
		price: "30",
		photo: "https://static.toiimg.com/thumb/61050397.cms?imgsize=246859&width=800&height=800"
	},
	{
		productName: "Bread Pakoda",
		price: "40",
		photo: "https://static.toiimg.com/photo/84629641.cms"
	},
	{
		productName: "Sambhar Wada",
		price: "40",
		photo: "https://www.nehascookbook.com/wp-content/uploads/2022/09/Medu-vada-with-sambar-WS-1.jpg"
	},
	{
		productName: "Veg Thali",
		price: "150",
		photo: "https://eastindianrecipes.net/wp-content/uploads/2023/02/Chicken-Thali-Indian-Thali-Recipe7.jpg"
	},
	{
		productName: "Maggi",
		price: "40",
		photo: "https://www.tipsnrecipesblog.com/wp-content/uploads/2022/01/Schezwan-Maggi.jpg"
	},
	{
		productName: "Pohe",
		price: "30",
		photo: "https://www.indianveggiedelight.com/wp-content/uploads/2022/07/poha-recipe-featured.jpg"
	},
	{
		productName: "SandWich",
		price: "50",
		photo: "https://static.toiimg.com/photo/83740315.cms"
	},
	{
		productName: "Chai",
		price: "10",
		photo: "https://lh5.googleusercontent.com/p/AF1QipPm3pJRa7cyjjo6l1VqcS5jXUNIcvSONBxpq2Xv=w1080-k-no"
	},
	{
		productName: "Coffee",
		price: "15",
		photo: "https://lzd-img-global.slatic.net/g/ff/kf/S48289b28ea694578a41ec39336950e462.jpg_720x720q80.jpg"
	},
	{
		productName: "Coldrinks",
		price: "20",
		photo: "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTkxODQ5MTA0ODMyNDcyNTYy/dark-reality-of-cold-drinks.jpg"
	},
	{
		productName: "Ice-Cream",
		price: "30",
		photo: "https://aestheticpoems.com/wp-content/uploads/2022/04/Ice-Cream-3.jpg"
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
		itemlist[indexx].price = ((cartItem.price) * (cartItem.quantity)) + (itemlist[indexx].price);
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
				"<td class='text-right'>" + quantity + "</td>" +
				"<td class='text-right'>Rs " + subTotal.toFixed(2) + "</td>" +
				"</tr>";
			grandTotal += subTotal;
	}

	$('#cartTableBody').html(cartRowHTML);
	$('#totalAmount').css('font-weight', 900);
	$('#totalAmount').text("Rs " + grandTotal.toFixed(2));
	totalamounts = $('#totalAmount').text();


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
			'<input type="submit" value="Add to Cart" class="add-to-cart" onClick="addToCart(this)" />' +
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
		title: 'Submit your details',
		html:
			'<input id="swal-input1" placeholder="name" class="swal2-input">' +
			'<input id="swal-input2" placeholder="mail" class="swal2-input">',
		inputAttributes: {
			autocapitalize: 'off'
		},
		showCancelButton: true,
		confirmButtonText: 'Submit',
		showLoaderOnConfirm: true,
	}).then((result) => {
		
		if (result.isConfirmed) {
			var name = $("#swal-input1").val();
			Swal.fire({
				icon: 'success',
				title: name + '<br>Ordered Successfully <br>Total ' + totalamounts,
				confirmButtonText: 'OK',
				showLoaderOnConfirm: true,
			}).then((results) => {
				if (results.isConfirmed) {
				var amount=	parseInt(totalamounts.replace('Rs ',''));
				var link='upi://pay?pa=riteshyawale@ybl&pn=Ritesh Yawale&mc=0000&mode=02&purpose=00&am='+amount+''
				window.location.href = link;
				
				}
				else{
					window.location.href = 'index.html';
				}
			})			
		}
		
	})
}


function logout() {
	window.location.href = 'index.html';
}

