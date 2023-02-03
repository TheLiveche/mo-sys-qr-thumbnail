const HOME = '<div id="main"><button id="ownerC" onclick="change_ownerC()">Contact Owner</button><button id="mosysC" onclick="change_mosysC()">Contact Mo-Sys</button><button id="tutorial" onclick="change_tutorial()">Tutorials</button><button id="support" onclick="change_support()">Support</button><button id="settings" onclick="change_settings()">Settings</button><button id="bc" onclick="change_barcode()">Show Barcode</button></div>';
let html = "";
let idnum;
let bcShown = false;
let contactString;
let contactStringPhone;
let tutorialString;

window.onload=function(){
    idnum = (window.location.search.substring(1));
    fetch('testingJSON/testSalesOrder.json')
        .then((response) => response.json())
        .then((json) => lookup(json));
}

function lookup(json) {
    //for(let i = 0; i <= 1; i++){
        if(idnum == json[0].id){
            contactString = json[0].Customer;
            fetch('testingJSON/testCustomer.json')
                .then((response) => response.json())
                .then((json) => lookupCust(json));
            tutorialString = json[0].InventoryID;
            fetch('testingJSON/testItem.json')
                .then((response) => response.json())
                .then((json) => lookupItem(json));
        }
    //}
}

function lookupCust(json) {
    //for(let i = 0; i <= 75; i++){
        if(contactString == json[0].CustomerID){
            contactString = json[0].Email;
            contactStringPhone = json[0].Phone;
        }
    //}
}

function lookupItem(json) {
    //for(let i = 0; i <= 75; i++){
        if(tutorialString == json[0].InventoryID){
            tutorialString = json[0].Tutorial;
        }
    //}
}

function change_home(){
    document.querySelector("main").innerHTML = HOME;
}

function change_ownerC(){
    if(contactString){
        html = '<strong>Customer Name</strong><br>Company Name<br><strong>Email: </strong>'+contactString+'<br><strong>Mobile: </strong>'+contactStringPhone+'<br>';
    }
    else{
        html = "No matching Serial Number found!";
    }
    document.querySelector("main").innerHTML = html + '<button id="home" onclick="change_home()">Back Home</button>';
}
function change_mosysC(){
    html = '<strong>Jessica Raw</strong><br>Lost Items<br><strong>Email:</strong> xxxx<br><strong>Mobile:</strong> xxxxx<br>';
    document.querySelector("main").innerHTML = html + '<button id="home" onclick="change_home()">Back Home</button>';
}
function change_tutorial(){
    if(tutorialString){
        html = '<img src="' + tutorialString + '">';
    }
    else{
        html = "No matching Serial Number found!";
    }
    document.querySelector("main").innerHTML = html + '<button id="home" onclick="change_home()">Back Home</button>';
}
function change_support(){
    html = '<strong>Peter Pan</strong><br>Support Team<br><strong>Email:</strong> xxxx<br><strong>Mobile:</strong> xxxxx<br>';
    document.querySelector("main").innerHTML = html + '<button id="home" onclick="change_home()">Back Home</button>';
}
function change_settings(){
    html = "THIS WILL BE A LOGIN PAGE";
    document.querySelector("main").innerHTML = html + '<button id="home" onclick="change_home()">Back Home</button>';
}
function change_barcode(){
    if(bcShown){
        document.querySelector("main").innerHTML = HOME;
        bcShown = false;
    }
    else{
        document.querySelector("main").innerHTML = HOME + '<svg id="barcode"></svg>';
        JsBarcode("#barcode", idnum, {
            textAlign: "center"
        });
        bcShown = true;
    }
}

/*
<button id="ownerC" onclick="change_ownerC()">Contact Owner</button>
<button id="mosysC" onclick="change_mosysC()">Contact Mo-Sys</button>
<button id="tutorial" onclick="change_tutorial()">Tutorials</button>
<button id="support" onclick="change_support()">Support</button>
<button id="settings" onclick="change_settings()">Settings</button>
<button id="barcode" onclick="change_barcode()">Show Barcode</button>

"<strong>Nadia Higgings</strong><br>Executive assistant<br><strong>Email:</strong> xxxx<br><strong>Mobile:</strong> xxxxx<br><button id="home">Back Home</button>"
 */