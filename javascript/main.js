const Goods = prompt("enter goodsname"); 
const Quantity =  prompt("enter quntity in bags");
const priceOfGoods = 15000
alert("The price of one bag is 15000");
const totalPrice = Quantity * priceOfGoods
alert (totalPrice)
console.log(totalPrice)

const info = {}
const receipt=[]

const anotherArray =[
    {ProductName: 'garri', quantityOfGoods: '2', totalPrice: 30000, CustomerName: 'samuel'},
    {ProductName: 'yam', quantityOfGoods: '5', totalPrice: 100000, CustomerName: 'samuel'}
]

 
const optionToBuy = prompt("do you want to buy?")
if (optionToBuy==="yes" || optionToBuy === "y"){
    alert ("please wait as we arrange your goods")
   
    info.ProductName = Goods
    info.quantityOfGoods = Quantity
    info.totalPrice = totalPrice
    const CustomerBio = prompt(" Enter Full Name")
    info.CustomerName = CustomerBio

    receipt.push(info)
    console.log(receipt)
 
    const CustomerInterest=prompt("do you want to buy anything else?")
    if (CustomerInterest ==="yes" || CustomerInterest === "y") {
    prompt("What more do you want?")
    } else 
    alert(` store name: James
            customer name: ${info.CustomerName}
            product name: ${info.ProductName}
            quantity: ${info.quantityOfGoods}
            total price: ${info.totalPrice}
            thank you for your patronage Mr. ${info.CustomerName}
        `)

} else alert("Thanks for comimg")















// Psedu Code
// i am a customer that wants to buy something
// ask the customer wants he wants to buy
// i want to buy garri
// what quantitty 2
// calculate the price 
// and ask if the customer wants to still buy or else say thanks next time
// ask the customer name
// create a receipt with the customer name , the product name , the quantity , and the price ,
// ask the customer if he wants to add to the list
// 