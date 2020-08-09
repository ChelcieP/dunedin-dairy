function openSection(event, section){
const allSections = ["home","products","location","guestbook","news"]
let i;
for (i=0;i<allSections.length;i++){
    if(section==allSections[i]){
        document.getElementById(allSections[i]).style.display="block";
    } else {
        document.getElementById(allSections[i]).style.display="none";
    }
}
const activeSection = document.getElementsByClassName("active");
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

}

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
    
    fetchPromise.then((response)=>refreshThePage());

    }

function refreshThePage(){
    document.getElementById("comments").src = document.getElementById("comments").src;
}

//location page ---------------------------------------------------------------------------------------------------------------------------------
function locationAPI(){
    const fetchPromise= fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/vcard',
    {
        headers:{
            "Accept" : "application/text",
        },
    });

    const streamPromise = fetchPromise.then((response) => response.text());
    streamPromise.then((data)=> insertLocation(data));
}

function insertLocation(details){
    const line = details.split("\n");

    let phone;
    let email;
    let address;
    let street;
    let city;
    let country;

    for(i=0;i<line.length;i++){
        const colonSplit = line[i].split(":");
        const initialkey = colonSplit[0];
        const semicolonIndex = initialkey.indexOf(";");
        let actualkey = "";
        if (semicolonIndex > -1){
            actualkey = (initialkey.split(";")[0]);
        } else {
            actualkey = initialkey;
        }
        if (actualkey === "TEL"){
            phone = colonSplit[1];
        }
        if(actualkey === "EMAIL"){
            email = colonSplit[1];
        }
        if(actualkey === "ADR"){
            address = (colonSplit[1]).split(";");
            street = address[address.length - 3];
            city = address[address.length - 2];
            country = address[address.length - 1]
        }
        
    }

    let htmlcode = "";
        htmlcode += "<tr>";
        htmlcode += "<th class='header'>📞 Phone:</th>";
        htmlcode += "<th><a href='Tel:"+phone+"'>"+phone+"</a></th>";
        htmlcode += "</tr>";
        htmlcode += "<tr>";
        htmlcode += "<th class='header'>🏢 Address:</th>";
        htmlcode += "<th>"+street+"<br>"+city+"<br>"+country+"</th>";
        htmlcode += "</tr>";
        htmlcode += "<tr>";
        htmlcode += "<th class='header'>📩 Email:</th>";
        htmlcode += "<th><a href='mailto:"+email+"'>"+email+"</a></th>";
        htmlcode += "</tr>";
    document.getElementById("locationDetails").innerHTML = htmlcode;
}
