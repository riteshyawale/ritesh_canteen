$(document).ready(function () {
	emptyCart()
	var productItem = [{
		pid:1,
		productName: "Biryani",
		price: "200",
		photo: "biryani.jpg"
	},
	{
		pid:2,
		productName: "Samosa",
		price: "30",
		photo: "61050397.jpg"
	},
	{
		pid:3,
		productName: "Bread Pakoda",
		price: "40",
		photo: "84629641 (1).jpg"
	},
	{
		pid:4,
		productName: "Sambhar Wada",
		price: "40",
		photo: "Medu-vada-with-sambar-WS-1.jpg"
	},
	{
		pid:5,
		productName: "Veg Thali",
		price: "150",
		photo: "thali.jpg"
	},
	{
		pid:6,
		productName: "Maggi",
		price: "40",
		photo: "Schezwan-Maggi.jpg"
	},
	{
		pid:7,
		productName: "Pohe",
		price: "30",
		photo: "poha-recipe-featured.jpg"
	},
	{
		pid:8,
		productName: "SandWich",
		price: "50",
		photo: "83740315 (1).jpg"
	},
	{
		pid:9,
		productName: "Chai",
		price: "10",
		photo: "chai.jpg"
	},
	{
		pid:10,
		productName: "Coffee",
		price: "15",
		photo: "coffee.jpg"
	},
	{
		pid:11,
		productName: "Coldrinks",
		price: "20",
		photo: "dark-reality-of-cold-drinks.jpg"
	},
	{
		pid:12,
		productName: "Ice-Cream",
		price: "30",
		photo: "Ice-Cream-3.jpg"
	}];
	showProductGallery(productItem);
	// showCartTable();
});

function showProductGallery(product) {
	//Iterate javascript shopping cart array
	var productHTML = "";
	product.forEach(function (item) {
		productHTML += '<div class="product-item" >' +
			'<img src="' + item.photo + '"style="width: 150px;height: 120px;">' +
			'<div class="productname">' + item.productName + '</div>' +
			'<div class="price">Rs <span>' + item.price + '</span></div>' +
			'<div class="pid" style="display:none"><span>' + item.pid + '</span></div>' +
			'<div class="cart-action">' +
			'<input type="submit" value="Add" class="add-to-cart" onClick="addToCart(this)" />' +
			'</div>' +
			'</div>';
		"<tr>";

	});
	$('#product-item-container').html(productHTML);
}


var itemlist = [];
var totalamounts = '';

function addToCart(element) { 
	var productParent = $(element).closest('div.product-item');
	var pid = $(productParent).find('.pid span').text();
	var price = $(productParent).find('.price span').text();
	var productName = $(productParent).find('.productname').text();
	var quantity = $(productParent).find('.product-quantity').val();

	var cartItem = {
		productName: productName,
		price: parseInt(price),
		quantity: 1,
		pid:parseInt(pid)
	};
	if (itemlist.find((el) => el.pid == cartItem.pid)) {
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

function deleterow(index) {
	var pids= parseInt(index.parentNode.childNodes[0].textContent);
	if (itemlist.find((el) => el.pid == pids)) {
		itemlist = itemlist.filter(function(e) {
			return e.pid != pids;
		});
	}
	showCartTable();
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
				"<td class='text-right' id='gets'>"+
				"<button class='quantity__minus' onclick='minusg(this)' value='-'>-</button><input type='text' readonly onchange='getval(this);' min='1' class='getqu' id='getquantity["+i+"]' value="+quantity+"><button class='quantity__plus' onclick='plusg(this)' value='+'>+</button></td>" +
				"<td class='text-right'>Rs " + subTotal.toFixed(2) + "</td>" +
				"<td class='text-right'><div  style='display:none'>" + cartItem[i].pid + "</div><i class='fa fa-trash-o' style='font-size:24px; cursor:pointer;'  onclick='deleterow(this)' ></i>" + "</td>" +
				"</tr>";
			grandTotal += subTotal;
			
	}

	$('#cartTableBody').html(cartRowHTML);
	$('#totalAmount').css('font-weight', 900);
	$('#totalAmount').text("Rs " + grandTotal.toFixed(2));
	totalamounts = $('#totalAmount').text();
}


function minusg(e){
	if((parseInt(e.parentNode.childNodes[1].value))>1){
	  e.parentNode.childNodes[1].value=parseInt(e.parentNode.childNodes[1].value) - 1;
	  var index = itemlist.findIndex((el) => el.productName == e.parentNode.parentNode.childNodes[0].textContent);
	  itemlist[index].quantity =e.parentNode.childNodes[1].value;
	  showCartTable()
	}
}

function plusg(e){
	if((parseInt(e.parentNode.childNodes[1].value))>=1){
		e.parentNode.childNodes[1].value=parseInt(e.parentNode.childNodes[1].value) + 1;	
	  var index = itemlist.findIndex((el) => el.productName == e.parentNode.parentNode.childNodes[0].textContent);
	  itemlist[index].quantity =e.parentNode.childNodes[1].value;
	  showCartTable()
	  }
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
		confirmButtonText: 'Submit',
		showLoaderOnConfirm: true,
	}).then((result) => {
		if (result.isConfirmed) {
			let new_list = itemlist.map(function(obj) {
				return {
				  productName: obj.productName,
				  qt: obj.quantity,
				  price: 'Rs.'+obj.price
				}
			});
			let nameamount=new Array({Name: $('#swal-input1').val(), '': totalamounts.replace('Rs','Rs.')});
			var arr3 = [...new_list, ...nameamount];
			var  formatted = `[${arr3.map(JSON.stringify).join(',\n ')}]`;
			formatted=formatted.replaceAll('-','').replaceAll(' ','').replaceAll('productName','');
			// var note=JSON.stringify(itemlist).replaceAll(' ','').replaceAll('{"productName":',' ').replaceAll('-','');
			// note=$('#swal-input1').val()+'  @  '+totalamounts+'   /   /   '+note;
			window.location.href = 'https://wa.me/918390150577?text='+formatted+'';
			
		}		
	})
}


function logout() {
	window.location.href = 'index.html';
}

