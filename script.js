// it selects a meal
function selectMeal(mealOption) {
    const selectedMeal = document.querySelector(".meals > .selected");
    if (selectedMeal !== null) {
        mealOption.classList.add("selected");
        selectedMeal.classList.remove("selected");
    } else {
        mealOption.classList.add("selected");
    }
    releaseOrderButton();
}

// it selects a drink
function selectDrink(drinkOption) {
    const selectedDrink = document.querySelector(".drinks > .selected");
    if (selectedDrink !== null) {
        drinkOption.classList.add("selected");
        selectedDrink.classList.remove("selected");
    } else {
        drinkOption.classList.add("selected");
    }
    releaseOrderButton();
}

// it selects a dessert
function selectDessert(dessertOption) {
    const selectedDessert = document.querySelector(".desserts > .selected");
    if (selectedDessert !== null) {
        dessertOption.classList.add("selected");
        selectedDessert.classList.remove("selected");
    } else {
        dessertOption.classList.add("selected");
    }
    releaseOrderButton();
}



/*releaseOrderButton() {
    it changes the order button from uncolored to green and
    it enables the button to work, but only if the three
    options on the menu are choosen.
}*/
function releaseOrderButton() {
    //Getting the button
    const orderButton =  document.querySelector(".order-button");

    //Changing it's properties
    orderButton.classList.add("release"); 
    orderButton.innerHTML = `<p>Fechar pedido</p>`;
    orderButton.disabled = false;

    //Getting user choices
    const selectedMeal = document.querySelector(".meals > .selected");
    const selectedDrink = document.querySelector(".drinks > .selected");
    const selectedDessert = document.querySelector(".desserts > .selected");

    //Stablishing conditions to change order-button appearance
    if (selectedMeal === null || selectedDrink === null || selectedDessert === null) {
        orderButton.classList.remove("release");   
        orderButton.innerHTML = `<p>Selecione os 3 itens<br>para fechar o pedido</p>`;
        orderButton.disabled = true;
    }
}

/*finishOrder() {
    it display the green screen, showing to the user
    what are his choices and offering two options:
        one to confirm and move on
        other to cancel 
}*/
function finishOrder() {
    //Getting the informations from the menu
    const selectedMeal = document.querySelector(".meals > .selected");
    const mealName = selectedMeal.querySelector(".option-title p").innerHTML
    const mealPrice = selectedMeal.querySelector(".option-price p").innerHTML;

    const selectedDrink = document.querySelector(".drinks > .selected");
    const drinkName = selectedDrink.querySelector(".option-title p").innerHTML
    const drinkPrice = selectedDrink.querySelector(".option-price p").innerHTML

    const selectedDessert = document.querySelector(".desserts > .selected");
    const dessertName = selectedDessert.querySelector(".option-title p").innerHTML
    const dessertPrice = selectedDessert.querySelector(".option-price p").innerHTML

    //Calculating the total cost of the order
    const total = (Number(mealPrice.split(" ").pop().replace(",", ".")) 
    + Number(drinkPrice.split(" ").pop().replace(",", ".")) 
    + Number(dessertPrice.split(" ").pop().replace(",", "."))).toFixed(2);

    //Asking for user's name and address
    const name = prompt("Por favor, digite o nome de quem ir?? receber o pedido:");
    const address = prompt("Por favor, digite o endere??o de entrega:");

    //Inserting the infos on the confirm order screen
    document.querySelector(".meal #name").innerHTML = mealName;
    document.querySelector(".meal #price").innerHTML = mealPrice;
    document.querySelector(".drink #name").innerHTML = drinkName;
    document.querySelector(".drink #price").innerHTML = drinkPrice;
    document.querySelector(".dessert #name").innerHTML = dessertName;
    document.querySelector(".dessert #price").innerHTML = dessertPrice;
    document.querySelector(".total-price #price").innerHTML = `R$ ${total.replace(".", ",")}`;
    document.querySelector(".user-data #name").innerHTML = `Nome: ${name}`;
    document.querySelector(".user-data #address").innerHTML = `Endere??o: ${address}`;

    //Uncovering the confirmation screen
    document.querySelector(".body-cover").setAttribute("style", "display: initial");
    document.querySelector(".confirm-order").setAttribute("style", "display: initial");

};

function discountFactor() {
    // Gerando soma aleat??ria. Desconto m??ximo 30%
    const n1 = Math.floor(Math.random() * 16);
    const n2 = Math.floor(Math.random() * 16);
    const sum = n1 + n2;


    const userAnswer = Number(prompt (`Quanto ?? ${n1} + ${n2}?`));
    let discountAnswer = document.querySelector(".discount p")

    if (userAnswer === sum) {
        discountAnswer.innerHTML = `Boa! Pegou ${userAnswer}% de desconto!`;
        document.querySelector(".total-price #name").innerHTML = `Total c/ desconto`

        /* nesse caso, quero que o pre??o total mude para o valor com desconto */
        let price = document.querySelector(".total-price #price").innerHTML.replace(",",".").replace("R$ ","")
        let newPrice = (price * (1-( userAnswer/ 100))).toFixed(2);
        document.querySelector(".total-price #price").innerHTML = `R$ ${newPrice.replace(".",",")}`
        
        /*e quero que o bot??o desative no final*/
        document.querySelector(".discount").setAttribute("onclick", "");
    } else {
        discountAnswer.innerHTML = "Opa, voc?? perdeu o desconto :/"
        document.querySelector(".discount").setAttribute("onclick", "");
    } 
}

/*confirmOrder(){
    it the function at the button on the green screen.
    it get user's data, organizes it in a particular format
    and send it to the restaurant owner's contact.
}*/
function confirmOrder() {
    //Getting the informations from the menu
    const selectedMeal = document.querySelector(".meals > .selected");
    const mealName = selectedMeal.querySelector(".option-title p").innerHTML
    const mealPrice = selectedMeal.querySelector(".option-price p").innerHTML;

    const selectedDrink = document.querySelector(".drinks > .selected");
    const drinkName = selectedDrink.querySelector(".option-title p").innerHTML
    const drinkPrice = selectedDrink.querySelector(".option-price p").innerHTML

    const selectedDessert = document.querySelector(".desserts > .selected");
    const dessertName = selectedDessert.querySelector(".option-title p").innerHTML
    const dessertPrice = selectedDessert.querySelector(".option-price p").innerHTML

    //Definindo a mensagem de desconto que vai para o whatsapp
    desconto = document.querySelector(".discount p").innerHTML
    if (desconto == "Opa, voc?? perdeu o desconto :/") {
        desconto = "Sem desconto";
    } else {
        desconto = document.querySelector(".discount p").innerHTML.replace("Boa! Pegou ","").replace(" de desconto!", "")
    }

    const total = document.querySelector(".total-price #price").innerHTML

    //Getting name and address informed by the user
    const name = document.querySelector(".user-data #name").innerHTML
    const address = document.querySelector(".user-data #address").innerHTML

    //Building the message to be sent on whatsapp
    const message =
    `Ol??, gostaria de fazer o pedido:\n
- Prato: ${mealName}
- Bebida: ${drinkName}
- Sobremesa: ${dessertName}\n
Desconto: ${desconto} 
Total: ${total}\n
${name}
${address}`;

    //Enconding and sending
    const uriMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5521982235702?text=${uriMessage}`);    
}

/*cancelOrder(){
    it hides green screen back again, so new choices can be made.
}*/
function cancelOrder() {
    location.reload();
}