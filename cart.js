$(document).ready(function() {
	emptyCart()
	var productItem = [{
			productName: "Biryani",
			price: "150",
			photo: "https://assets.cntraveller.in/photos/6218cfdf6774879c067d3ece/1:1/w_1079,h_1079,c_limit/best%20biryani%20in%20pune%20lead.jpg"
		},
		{
			productName: "Samosa",
			price: "30.00",
			photo: "https://static.toiimg.com/thumb/61050397.cms?imgsize=246859&width=800&height=800"
		},
		{
			productName: "Bread Pakoda",
			price: "40.00",
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
	showCartTable();
});

var itemlist=[];

function addToCart(element) {
	// 
	var productParent = $(element).closest('div.product-item');

	var price = $(productParent).find('.price span').text();
	var productName = $(productParent).find('.productname').text();
	var quantity = $(productParent).find('.product-quantity').val();

	var cartItem = {
		productName: productName,
		price: price,
		quantity: quantity
	};
	if(itemlist.find((el)=>el.productName==cartItem.productName)){
		Swal.fire({
			icon: 'error',
			title: 'Item already added'
		})
			return;
			}
	itemlist.push(cartItem);
	console.log(itemlist);
	var cartItemJSON = JSON.stringify(cartItem);

	var cartArray = new Array();
	// If javascript shopping cart session is not empty
	if (sessionStorage.getItem('shopping-cart')) {
		cartArray = JSON.parse(sessionStorage.getItem('shopping-cart'));
	}
	cartArray.push(cartItemJSON);

	var cartJSON = JSON.stringify(cartArray);
	sessionStorage.setItem('shopping-cart', cartJSON);
	showCartTable();
}

function emptyCart() {
	if (sessionStorage.getItem('shopping-cart')) {
		// Clear JavaScript sessionStorage by index
		sessionStorage.removeItem('shopping-cart');
		showCartTable();
	}
}



function removeCartItem(index) {
	if (sessionStorage.getItem('shopping-cart')) {
		var shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
		sessionStorage.removeItem(shoppingCart[index]);
		shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
		showCartTable();
	}
}
var totalamounts='';
function showCartTable() {
	var cartRowHTML = "";
	var itemCount = 0;
	var grandTotal = 0;

	var price = 0;
	var quantity = 0;
	var subTotal = 0;

	if (sessionStorage.getItem('shopping-cart')) {
		var shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
		itemCount = shoppingCart.length;

		//Iterate javascript shopping cart array
		shoppingCart.forEach(function(item) {
			var i=-1;
			var cartItem = JSON.parse(item);
			price = parseFloat(cartItem.price);
			quantity = parseInt(cartItem.quantity);
			subTotal = price * quantity

			cartRowHTML += "<tr>" +
				"<td class='text-right'>" + cartItem.productName + "</td>" +
				"<td class='text-right'>Rs " + price.toFixed(2) + "</td>" +
				"<td class='text-right'>" + quantity + "</td>" +
				"<td class='text-right'>Rs " + subTotal.toFixed(2) + "</td>"+
				"</tr>";

			grandTotal += subTotal;
		});
	}
	$('#cartTableBody').html(cartRowHTML);
	$('#itemCount').css('font-weight', 900);
	$('#itemCount').text(itemCount);
	$('#totalAmount').css('font-weight', 900);
	$('#totalAmount').text("Rs " + grandTotal.toFixed(2));
	 totalamounts=$('#totalAmount').text();

	 
}


function showProductGallery(product) {
	//Iterate javascript shopping cart array
	var productHTML = "";
	product.forEach(function(item) {
		productHTML += '<div class="product-item" style="height: 200px;width: 180px;">'+
					'<img src="' + item.photo + '"style="width: 150px;height: 120px;">'+
					'<div class="productname">' + item.productName + '</div>'+
					'<div class="price">Rs <span>' + item.price + '</span></div>'+
					'<div class="cart-action">'+
						'<input type="number" min="1" class="product-quantity" name="quantity" value="1" size="2" style="width: 60px;"/>'+
						'<input type="submit" value="Add to Cart" class="add-to-cart" onClick="addToCart(this)" />'+
					'</div>'+
				'</div>';
				"<tr>";
		
	});
	$('#product-item-container').html(productHTML);
}

function sucessCart() {

  Swal.fire({
	title: 'Submit your details',
	html:
	  '<input id="swal-input1" placeholder="name" class="swal2-input">' +
	  '<input id="swal-input2" placeholder="payment" class="swal2-input">',
	inputAttributes: {
	  autocapitalize: 'off'
	},
	showCancelButton: true,
	confirmButtonText: 'Submit',
	showLoaderOnConfirm: true,
  }).then((result) => {
	if (result.isConfirmed) {
		var name=$("#swal-input1").val();
	  Swal.fire({
		icon: 'success',
		title: name+ '<br>Ordered Successfully <br>Total ' +totalamounts,
		
	  })
	}
  })
}


function logout(){
	window.location.href='login.html';
}

