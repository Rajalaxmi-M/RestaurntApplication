$(".cartbut").click(function(){

	$("#empty").hide();
	$("#items").show();
	var id=this.id.slice(3);
	var countId="num"+id;
	var priceId="price"+id;
	var nameeId="name"+id;
	var name=$("#"+nameeId).text();
	var price=$("#"+priceId).text();
	var count=$("#"+countId).val();
	$("#"+countId).val(0);
	if(count<=0)
	{
		alert("Please select Quantity")
		return;
	}
    var amount=parseInt(price)*parseInt(count);
	const obj={
		name:name,
		amount:amount,
		count:count
	}
	cartItems.cart.push(obj);
	var tamount=0;
	cartItems.cart.forEach(function(current)
	{
		tamount+=current.amount;
	});
$("#items").append("<tr><td>"+name+"</td><td>"+count+"</td><td>"+amount+"</td></tr>");
$("#total").text("Total Amount:"+tamount)
console.log(cartItems.cart)
});
const cartItems={
	cart:[]
}
$("#items").hide();