//Morteza Yosefy
//Categories.json and category1.json are json file that
//wanted at the exam as Kategoriler.json and kategory_adi.json

(function (global) {
    var homeHtml = "snippets/home-snippet.html";

    //Actually, in index.html you do not need to open the category-snippet.html in the separate page or tab or
    //even won't need a reload to process, thats bcz I used AJAX there,
    var categoryHtml = "snippets/category-snippet.html";
    var categoryJson = "json-files/categories.json";

    var booksHtml = "snippets/accessories-snippet.html";
    var category1Json = "json-files/category1.json";
    var bookHtml = "snippets/detail-snippet.html";
    var dc = {};

    function insertHtml(selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    // Show loading icon inside element identified by 'selector'.
    function showLoading(selector) {
        var html = "";

        insertHtml(selector, html);
    };


    function insertProperty(string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string
            .replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    }

    // On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function (event) {
        // On first load, show home view
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            homeHtml,
            function (responseText) {
                document.querySelector("#main-content")
                    .innerHTML = responseText;
            },
            false);
    });

    
    dc.loadCategories = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            categoryJson,
            buildCategoriesHTML, true);
    };

    function buildCategoriesHTML(categories) {

        $ajaxUtils.sendGetRequest(
            categoryHtml, function (responseText) {
                var finalHtml = "";
                finalHtml += "<section class='row'>";

                // Loop over categories
                for (var i = 0; i < categories.length; i++) {
                    // Insert category values
                    var html = responseText;
                    
                    var name = "" + categories[i].name;

                    html =
                        insertProperty(html, "name", name);

                    finalHtml += html;
                }

                finalHtml += "</section>";
                insertHtml("#main-content", finalHtml);
            }, false
        )

    }

    dc.loadBooks = function(){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            category1Json,
            buildBooksHtml, true);
    };

    function buildBooksHtml(categories) {
        $ajaxUtils.sendGetRequest(
            booksHtml, function (responseText) {
                var finalHtml = "";
                finalHtml += "<section class='row'>";
                
                // Loop over categories
                for (var i = 0; i < categories.length; i++) {
                    // Insert category values
                    var html = responseText;
                    
                    var name = "" + categories[i].model;
                    var id = categories[i].id;
                    html =
                        insertProperty(html, "model", name);
                    html= insertProperty(html,"id",id);

                    finalHtml += html;
                }

                finalHtml += "</section>";
                insertHtml("#main-content", finalHtml);
            }, false
        )

    }

    dc.loadBook = function(id){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            category1Json,
            (category) => buildBookHTML(category, id), true
        );
    };
    function buildBookHTML(categories, id){
        
        $ajaxUtils.sendGetRequest(
            bookHtml, function(responseText){
                var finalHtml = "";
                finalHtml += "<section class='row'>";
                var html = responseText;
                var name = ""+ categories[id-1].model;
                var manufacturer = ""+ categories[id-1].manufacturer;
                var price = ""+ categories[id-1].price;
                var properties = ""+ categories[id-1].properties;
                html = insertProperty(html,"model", name);
                html = insertProperty(html,"manufacturer", manufacturer);
                html = insertProperty(html,"price",price);
                html = insertProperty(html,"properties",properties);
                finalHtml += html;
                finalHtml += "</section>";
                insertHtml("#main-content", finalHtml);

            }, false
        );
    };

    global.$dc = dc;

})(window);
