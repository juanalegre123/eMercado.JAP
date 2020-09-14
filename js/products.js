const ORDER_ASC_COST = "cost -> COST";
const ORDER_DESC_COST = "COST -> cost";
const ORDER_DESC_REL = "rel";

var productsArray = [];
var minCost = undefined;
var maxCost = undefined;
var buscar = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_COST) {
        result = array.sort(function(a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_COST) {
        result = array.sort(function(a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_REL) {
        result = array.sort(function(a, b) {

            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    }

    return result;
}


function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {
            if (buscar == undefined || product.name.toLowerCase().indexOf(buscar) != -1) {

                htmlContentToAppend += `
        <a href= "product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + product.name + " " + product.currency + " " + product.cost + `</h4>
                        <small class="text-muted">` + product.soldCount + ` Vendidos</small>
                      
                        
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                    <p>` + product.description + `</p></div>

                </div>
            </div>
        </a>
        `
            }
        }

        document.getElementById("listaproductos").innerHTML = htmlContentToAppend;
    }
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {

            productsArray = resultObj.data;

            //Muestro las categorías ordenadas
            showProductsList(productsArray);


        }
    });

});
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
document.getElementById("desc").addEventListener("click", function(e) {
    productsArray = sortProducts(ORDER_DESC_COST, productsArray);
    document.getElementById("asc").classList.remove('active');
    document.getElementById("rel").classList.remove('active');

    showProductsList(productsArray);

});
document.getElementById("asc").addEventListener("click", function(e) {
    productsArray = sortProducts(ORDER_ASC_COST, productsArray);
    document.getElementById("desc").classList.remove('active');
    document.getElementById("rel").classList.remove('active');

    showProductsList(productsArray);

});
document.getElementById("rel").addEventListener("click", function(e) {
    productsArray = sortProducts(ORDER_DESC_REL, productsArray);
    document.getElementById("asc").classList.remove('active');
    document.getElementById("desc").classList.remove('active');

    showProductsList(productsArray);

});





document.getElementById("rangeFilterCount").addEventListener("click", function(e) {
    minCost = document.getElementById("rangeFilterCountMin").value
    maxCost = document.getElementById("rangeFilterCountMax").value

    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {

        minCost = parseInt(minCost)
    } else {
        minCost = undefined;
    }

    if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {

        maxCost = parseInt(maxCost)
    } else {
        maxCost = undefined;
    }

    showProductsList(productsArray);

});

document.getElementById("clearRangeFilter").addEventListener("click", function() {

    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCost = undefined;
    maxCost = undefined;
    showProductsList(productsArray);


});

document.getElementById("buscador").addEventListener("input", function() {

    buscar = document.getElementById("buscador").value.toLowerCase();
    showProductsList(productsArray);
});