var carroCompra = [];

function totalCost() {
    let total = 0;
    let cantidadSub = document.getElementsByClassName("total");
    for (let i = 0; i < cantidadSub.length; i++) {
        total += parseInt(cantidadSub[i].innerHTML);
    }
    document.getElementById("sumaTot").innerHTML = total;
}

function calcSubtotal(unitCost, i) {

    let count = parseInt(document.getElementById(`cantidad${i}`).value);
    subTot = unitCost * count;
    document.getElementById(`sumaSub${i}`).innerHTML = subTot;

    totalCost();
}

function usdMoneda(unitCost, currency) {
    if (currency === "UYU") {
        return unitCost / 40;
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

        <td>${articles.count}</td>

        <td><input style="width:60px;" onchange="calcSubtotal(${subT}, ${i})"
        type="number" id="cantidad${i}" value="${articles.count}" min="1"></td>

        <td><span id="sumaSub${i}" class="total" style="font-weight:bold;">${subT}</span></td>
        
        </tr>
        `

        document.getElementById("listaProductos").innerHTML = content;
    }

    totalCost();

}

document.addEventListener("DOMContentLoaded", function(e) {

    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj) {
        if (resultObj.status === "ok") {
            carroCompra = resultObj.data.articles;

            mostrarProducts(carroCompra);
            totalCost();

        }


    });

});