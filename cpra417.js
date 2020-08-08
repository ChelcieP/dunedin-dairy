function openSection(event, section){
var allSections = ["home","products","location","guestbook","news"]
var i;
for (i=0;i<allSections.length;i++){
    if(section==allSections[i]){
        document.getElementById(allSections[i]).style.display="block";
    } else {
        document.getElementById(allSections[i]).style.display="none";
    }
}
var activeSection = document.getElementsByClassName("active");
activeSection[0].className = activeSection[0].className.replace("active","");
event.currentTarget.className += " active";
}

// products page ------------------------------------------------------------------------------------
function productAPI(){
    const fetchPromise= fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/items',
    {
        headers:{
            "Accept" : "application/json",
        },
    });

    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data)=> insertProducts(data));
    // console.log(streamPromise);

}

//commented out while i hardcode the formatting
function insertProducts(products){
    let htmlcode = "";
    const addproduct = (product) => {
        htmlcode += "<div class ='column'>";
        htmlcode += "<div class='singleProduct'>";
        htmlcode += "<div class='row'>";
        htmlcode +="<div class='pMiddle'>";       
        htmlcode += "<img class='product-img' src='http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id="+product.ItemId+"'>";
        htmlcode += "</div>";        
        htmlcode +="<div>";
        htmlcode += "<p class='pTitle'>"+product.Title+"</p>";
        htmlcode +="<div class='pWords'>";
        htmlcode +="<div class='details'>";        
        htmlcode += "<p>Type: "+product.Type+"</p>";
        htmlcode += "<p>Origin: "+product.Origin+"</p>";
        htmlcode += "</div>";
        htmlcode +="<div class='price-container'>";               
        htmlcode += "<p class='price'>$"+product.Price+"</p>";
        htmlcode += "</div>";
        htmlcode += "</div>";
        htmlcode += "</div>";
        htmlcode += "</div>";
        htmlcode += "</div>";
        htmlcode += "</div>";
    }
    products.forEach(addproduct);
    document.getElementById("allProducts").innerHTML = htmlcode;
}

function searchProductAPI(){
    const productSearch = document.getElementById("searchBar").value;
    const fetchPromise= fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/search?term='+productSearch,
    {
        headers:{
            "Accept" : "application/json",
        },
    });

    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data)=> insertProducts(data));

}

//news page-----------------------------------------------------------------------------------------------------------
function newsAPI(){
    const fetchPromise= fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news',
    {
        headers:{
            "Accept" : "application/json",
        },
    });

    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data)=> insertNews(data));
    console.log(streamPromise);

}
function insertNews(news){
    let htmlcode = "";
    const addnews = (news) => {
        htmlcode += "<div class='oneNews'>"

        htmlcode += "<a href='"+news.linkField+"' class='article-title'>"+news.titleField+"</a>";
        htmlcode += "<p class='newsDate'>"+news.pubDateField+"</p>";
        htmlcode += "<p class='newsWords'>"+news.descriptionField+"</p>";

        htmlcode += "<img class='newsImg' src='"+news.enclosureField.urlField+"'>";

        htmlcode += "</div>";
    }
    news.forEach(addnews);
    document.getElementById("allNews").innerHTML = htmlcode;
}

//guestbook page ---------------------------------------------------------------------------------------------------------------------
function guestBook(){
    const guestName = document.getElementById("guestName").value;
    const guestComment = document.getElementById("guestComment").value;
    const uri = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/comment?name=" + guestName;

    const fetchPromise= fetch(uri,
        {headers : {"Content-Type": "application/json",},
        method :"POST",
        body : JSON.stringify(guestComment)});
    
    refreshThePage();
    document.getElementById("comments").src = document.getElementById("comments").src;
    }

function refreshThePage(){
    document.getElementById("comments").src = document.getElementById("comments").src;
}