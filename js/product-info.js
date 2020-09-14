var product = {};




document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCost = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productImgHTML = document.getElementById("productHTML|")


            productNameHTML.innerHTML = `<h1>${product.name}</h1>`;
            productDescriptionHTML.innerHTML = product.description;
            productCurrencyHTML.innerHTML = `<h3> ${product.currency+"-"+product.cost}</h3>`;

            productSoldCountHTML.innerHTML = `<p>${"Unidades Vendidas: "+product.soldCount}</p>`;
            productCategoryHTML.innerHTML = `<p>${product.category}</p>`;
            productImgHTML.innerHTML += `<img src="${product.images[0]}">`;
            productImgHTML.innerHTML += `<img src="${product.images[1]}">`;
            productImgHTML.innerHTML += `<img src="${product.images[2]}">`;
            productImgHTML.innerHTML += `<img src="${product.images[3]}">`;
            productImgHTML.innerHTML += `<img src="${product.images[4]}">`;




        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            showComment(product);

        }


    });


});

function showComment(comment) {

    let htmlContentToAppend = "";

    for (let i = 0; i < comment.length; i++) {
        let comentario = comment[i];

        htmlContentToAppend += `
    <div class="col-lg-3 col-md-4 col-6">
        <div class="d-block mb-4 h-100">
        <hr>
        <p><strong>${comentario.user}</strong> dice:</p>
    
        <p><strong>${comentario.description}</strong></p>
        <p>${comentario.score}</p>
        
        
        <p>${comentario.dateTime}</p>
        <hr>

        </div>
    </div>
    `;


    }
    document.getElementById("Coment").innerHTML = htmlContentToAppend;



}