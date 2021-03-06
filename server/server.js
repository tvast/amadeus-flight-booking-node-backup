var app = require('express')();
var http = require('http').createServer(app);
// var io = require('socket.io')(http);
const socket = require('socket.io')
const cors = require('cors')
var express = require('express')
var glob = require("glob")
const bodyParser = require('body-parser');
var parse = require('socket.io')(http);
const fetch = require('node-fetch');
var stringify = require('json-stringify-safe');
// app = express(),
// port = process.env.PORT || 3000;


let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

const uriAuth ="https://test.api.amadeus.com/v1/security/oauth2/token" 
//initialize variable
let departure ="2020-02-01";
let arrival="2020-03-30";
let locationDeparture="MAD";
let locationArrival="PAR";
let flightfrommadrid="";
let flightfrommadrid2="";
let flightfrommadrid3="";
let inputFlight="";
let cretateOrder ="";
let data="";
let data2="";
let keyword = "";
let countryCode ="";
let returnSearch ="";

//get grant
let headers= {  
  'Content-Type': 'application/x-www-form-urlencoded',
};

let body = {
 "grant_type": "client_credentials",
 "client_id": "",
 "client_secret": "",

}
//airport city search
let citySearch = "https://test.api.amadeus.com/v1/reference-data/locations?"

//init token
let token="";
  fetch(uriAuth, { method: 'POST', 
    headers: headers, 
    body: 'grant_type=client_credentials&client_id=' + body.client_id + '&client_secret=' + body.client_secret
  })
   .then((res) => {
     return res.json()
   })
   .then((json) => {

    token=json.access_token;


  });

async function postUrlToken() {
  // Default options are marked with *
  const response = await fetch(uriAuth, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      // 'Content-Type': 'application/json'   
      'Content-Type': 'application/x-www-form-urlencoded',
     },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: 'grant_type=client_credentials&client_id=' + body.client_id + '&client_secret=' + body.client_secret// body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

//POST flight search 
async function getCitySearch(url) {
  // returnSearch ="";
  // Default options are marked with *
  const response = await fetch(citySearch+"subType=CITY,AIRPORT"+url , {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      // 'Content-Type': 'application/json'   
      //'Content-Type': ,
      'Content-Type': 'application/x-www-form-urlencoded',authorization: 'Bearer '+token
     },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    // body: 
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}



// let header= {'content-type': 'application/json', authorization: 'Bearer '+token}
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

//POST
//get flight offer
app.post('/citySearch', function(req, res) {

  keyword = req.body.keyword;
  // countryCode =req.body.countryCode;
  var urlSend= "&keyword="+keyword

    postUrlToken().then((data) => {

      // token=data.access_token;
      // this.info3=data // JSON data parsed by `response.json()` call
    }).catch(function(error) {
    console.error(error);
  });
  getCitySearch(urlSend).then((data) => {

    returnSearch=data
    res.send(JSON.stringify(returnSearch)); // JSON data parsed by `response.json()` call
  }).catch(function(error) {
  console.error(error);
});
  });
//get flight offer
app.post('/date', function(req, res) {
  departure = req.body.departure;
  arrival = req.body.arrival;
  locationDeparture = req.body.locationDeparture;
  locationArrival =req.body.locationArrival;
  //   postUrlToken().then((data) => {
  //     console.log(data);
  //     // token=data.access_token;
  //     // this.info3=data // JSON data parsed by `response.json()` call
  //   }).catch(function(error) {
  //   console.error(error);
  // });
  updateFlightSearch(departure, arrival, locationArrival,locationDeparture).then((data) => {

    flightfrommadrid2=data
    res.send(JSON.stringify(flightfrommadrid2)); // JSON data parsed by `response.json()` call
  }).catch(function(error) {
  console.error(error);
});
  }); 
//get flight offer price

app.post('/flightprice', function(req, res) {
  res.json(req.body);
// console.log("request :"+JSON.stringify(req.body))
  inputFlight = req.body;
   // res.send(req.body);
  
  flifghtPrice(inputFlight).then((data) => {
    data2=data // JSON data parsed by `response.json()` call
  }).catch(function(error) {
  console.error(error);
});
    }); 

app.post('/flightCreateOrder', function(req, res) {
  res.json(req.body);
// console.log("request :"+JSON.stringify(req.body))
  inputFlightCreateOrder = req.body;


   // res.send(req.body);
  CreateOrder(inputFlightCreateOrder)
  .then((data) => {

    cretateOrder=data 
    res.send(JSON.stringify(cretateOrder));// JSON data parsed by `response.json()` call
  }).catch(function(error) {
  console.error(error);
});
    }); 

async function updateFlightSearch(departure, arrival, locationArrival,locationDeparture) {

    let request = {
      "currencyCode": "USD",
      "originDestinations": [
      {
        "id": "1",
        "originLocationCode": locationDeparture,
        "destinationLocationCode": locationArrival,
        "departureDateTimeRange": {
          "date": departure,
          "time": "10:00:00"
        }
      },
      ],
      "travelers": [
      {
        "id": "1",
        "travelerType": "ADULT",
        "fareOptions": [
        "STANDARD"
        ]
      },
      ],
      "sources": [
      "GDS"
      ],
      "searchCriteria": {
        "maxFlightOffers": 50,
        "flightFilters": {
          "cabinRestrictions": [
          {
            "cabin": "BUSINESS",
            "coverage": "MOST_SEGMENTS",
            "originDestinationIds": [
            "1"
            ]
          }
          ],
        }
      }
    }
  // Default options are marked with *
  const response = await fetch("https://test.api.amadeus.com/v2/shopping/flight-offers", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',authorization: 'Bearer '+token
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(request) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

//Function


async function flifghtPrice(inputFlightOffer) {
  // Default options are marked with *
  const response = await fetch("https://test.api.amadeus.com/v2/shopping/flight-offers/pricing", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',authorization: 'Bearer '+token
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(inputFlightOffer) // body data type must match "Content-Type" header
  });

  return await response.json(); // parses JSON response into native JavaScript objects
}

async function CreateOrder(inputFlightCreateOrder) {
  // Default options are marked with *
  const response = await fetch("https://test.api.amadeus.com/v1/booking/flight-orders", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',authorization: 'Bearer '+token
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(inputFlightCreateOrder) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

//GET

app.get('/flight', function(req, res) {
  res.send(JSON.stringify(flightfrommadrid));
});

app.get('/flightSearch', function(req, res) {
  res.send(JSON.stringify(flightfrommadrid2));
});

app.get('/flightPriceget', function(req, res) {
  res.send(JSON.stringify(data2));
});
app.get('/flightcretaeorderget', function(req, res) {
  res.send(JSON.stringify(cretateOrder));
});

app.get('/departureGet', function(req, res) {
  res.send(JSON.stringify(returnSearch));
});

app.get('/', function(req, res) {
  res.send('WELCOME OT Amadeus');
});

app.get('/chat', async (req,res) => {
  let result = await message.find()
  res.send(result);
})

var server = app.listen(process.env.PORT || 3000,()=>{
  console.log("Howdy, I am running at PORT 3000")
})


let io =  socket(server);

io.on("connection", function(socket){
  console.log("Socket Connection Established with ID :"+ socket.id)
})