var carroCompra = [];
let DOLLAR_SYMBOL = "USD ";
let comissionPercentage = 0.15;

function totalCost() {
    let total = 0;
    let cantidadSub = document.getElementsByClassName("total");
    for (let i = 0; i < cantidadSub.length; i++) {
        total += parseInt(cantidadSub[i].innerHTML);
    }
    document.getElementById("sumasubTot").innerHTML = total;
    porcentajes();
}

function calcSubtotal(unitCost, i) {

    let count = parseInt(document.getElementById(`cantidad${i}`).value);
    subTot = unitCost * count;
    document.getElementById(`sumaSub${i}`).innerHTML = subTot;

    totalCost();
}
/*TIPO DE MODEDA*/
function usdMoneda(unitCost, currency) {
    if (currency === "UYU") {
        return unitCost / 80;
    } else
        return unitCost
}

function mostrarProducts(array) {
    let content = "";

    for (let i = 0; i < array.length; i++) {

        let articles = array[i];
        let monedauyu = usdMoneda(articles.unitCost, articles.currency);

        let subT = monedauyu * articles.count;

        content +=
            `
        <tr>
        <td><img src='${articles.src}' width="40px"</td>

        <td>${articles.name}</td>

        

        <td><input style="width:60px;" onchange="calcSubtotal(${subT}, ${i})"
        type="number" id="cantidad${i}" value="${articles.count}" min="1"></td>
        <td>${articles.currency}</td>
        <td>${articles.unitCost}</td>
    
        <td><span id="sumaSub${i}" class="total" style="font-weight:bold;">${subT}</span></td>
        
        </tr>
        `

        document.getElementById("listaProductos").innerHTML = content;
    }

    totalCost();

}


function porcentajes() {
    let subCostotal = parseInt(document.getElementById("sumasubTotal").innerHTML);
    let comissionCostHTML = document.getElementById("costoPorcentaje");



    let comissionToShow = Math.round((comissio | nPercentage * 100));
    let totalCostToShow = (Math.round(subCostotal * comissionPercentage * 100) / 100);
    let totalmasEnvio = subCostotal + totalCostToShow;


    comissionCostHTML.innerHTML = comissionToShow;
    totalCostHTML.innerHTML = totalCostToShow;

    document.getElementById("costoPorcentaje").innerHTML = totalCostToShow;
    document.getElementById("sumasubTotal").innerHTML = totalmasEnvio;
}




document.addEventListener("DOMContentLoaded", function(e) {

    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj) {
        if (resultObj.status === "ok") {
            carroCompra = resultObj.data.articles;

            mostrarProducts(carroCompra);
            totalCost();
            porcentajes()

        }


    });

    document.getElementById("premium").addEventListener("change", function() {
        comissionPercentage = 0.15;
        porcentajes();
    });

    document.getElementById("express").addEventListener("change", function() {
        comissionPercentage = 0.07;
        porcentajes();
    });

    document.getElementById("standard").addEventListener("change", function() {
        comissionPercentage = 0.05;
        porcentajes();
    });

});