<template src="./createOrder.html"></template>


<style lang="scss" src="./style.scss"></style>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'
import {BadgerAccordion, BadgerAccordionItem} from 'vue-badger-accordion'
// import { store } from '../store.js';
import router from '../router.js'
export default {
  name: 'searchPrice',
  data: () => ({
  toggleInfo:false,
  toggleInfo2:false,
  flightConfirmation :"",
  true:true,  
  vm:this,
  components: {
        BadgerAccordion,
        BadgerAccordionItem,
    },
  form: {
  firstName: "theo",
  lastName: "vast",
  isModalVisible: false,
  gender: null,
  age: null,
  email: "abc@gmail.com",},
  userSaved: false,
  sending: false,
  lastUser: null,
  menuVisible: false,
  selectedCountryDeparture: "",
  countries: [],
  selectedCountryArrival: null,
  localhost: "http://localhost:3000",
  info:{},
  info2:{},
  info3:{},
  selectedDateDeparture :"2020-02-01",
  selectedDateArrival : "2020-02-27",
  mojsOptions : {
            count : 6,
            radius: { 15: 100 },
            origin: '100% 100%',
            degree: 360,
            children: {
              shape: 'polygon',
              fill: ['blue','white'],
              isSwirl:true,
              swirlSize: 10,
              swirlFrequency: 2,
              delay: 'stagger(0, 30)'
            }
          },
          selectedTravel:{},
          searchObject:""
  }),
 validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
        age: {
          required,
          maxLength: maxLength(3)
        },
        gender: {
          required
        },
        email: {
          required,
          email
        }}},
computed: {
       
    },

watch:{
			selectedTravel(){
				// alert('checkbox changed');
				return window.console.log(this.selectedTravel);},
      
			},

methods: {

	autocompleteCity(){
		
	},getSeletedItem(){
    this.selectedCountryDeparture = this.selectedCountryDeparture.iataCode
  },
  getSeletedItem2(){
    this.selectedCountryArrival = this.selectedCountryArrival.iataCode
  },
  getCountriesDeparture (searchTerm) {
        this.countries = new Promise(resolve => {
          window.setTimeout(() => {
            if (!searchTerm) {
              resolve(this.countryList)
            } else {
              const term = searchTerm.toLowerCase()

              resolve(this.countryList.filter(({ name }) => name.toLowerCase().includes(term)))
            }
          }, 500)
        })
      },getCountriesDeparture2 (searchTerm2) {
        this.countries = new Promise(resolve => {
          window.setTimeout(() => {
            if (!searchTerm2) {
              resolve(this.countryList)
            } else {
              const term = searchTerm2.toLowerCase()

              resolve(this.countryList.filter(({ name }) => name.toLowerCase().includes(term)))
            }
          }, 500)
        })
      },searchCity() {
          this.showLoader(true)
    var vm =this;
  var urlSend= "keyword="+this.selectedCountryDeparture
  
  
 
  async function postUrlEncoded() {
  // Default options are marked with *
 
  const response = await fetch("http://localhost:3000/citySearch?", {
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
    body: urlSend// body data type must match "Content-Type" header
  });
   // this.isLoading = true
  return await response.json(); // parses JSON response into native JavaScript objects
}

postUrlEncoded().then((data) => {
    window.console.log(data)
    // this.info3=data // JSON data parsed by `response.json()` call
  });
async function departureGet() {

  // Default options are marked with *
  const response = await fetch(vm.localhost+"/departureGet" );
  // vm.isLoading = true
  return await response.json(); // parses JSON response into native JavaScript objects
}

setTimeout(() => departureGet()
  .then((json) => {
    this.countryList=json.data;
    this.$store.commit('dataCitySearchMute', json.data)
   // this.info2=json;
   
  // this.toggleInfo=true;
  this.showLoader(false)
  // this.isLoading = false
  // this.isLoading = false // JSON data parsed by `response.json()` call
  }).catch(function(error) {
    Swal.fire({
  title: 'Error!',
  text: 'Do you want to continue'+error,
  icon: 'error',
  confirmButtonText: 'skip'
})
  window.console.error(error);
}), 500); 
      },searchCity2() {
          this.showLoader(true)
    var vm =this;
  var urlSend= "keyword="+this.selectedCountryArrival
  
  
 
  async function postUrlEncoded() {
  // Default options are marked with *
 
  const response = await fetch("http://localhost:3000/citySearch?", {
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
    body: urlSend// body data type must match "Content-Type" header
  });
   // this.isLoading = true
  return await response.json(); // parses JSON response into native JavaScript objects
}

postUrlEncoded().then((data) => {
    window.console.log(data)
    // this.info3=data // JSON data parsed by `response.json()` call
  });
async function departureGet() {

  // Default options are marked with *
  const response = await fetch(vm.localhost+"/departureGet" );
  // vm.isLoading = true
  return await response.json(); // parses JSON response into native JavaScript objects
}

setTimeout(() => departureGet()
  .then((json) => {
    this.countryList=json.data;
    this.$store.commit('dataCitySearchArrival', json.data)
   // this.info2=json;
  
  // this.toggleInfo=true;
  this.showLoader(false)
  // this.isLoading = false
  // this.isLoading = false // JSON data parsed by `response.json()` call
  }).catch(function(error) {
    Swal.fire({
  title: 'Error!',
  text: 'Do you want to continue'+error,
  icon: 'error',
  confirmButtonText: 'skip'
})
  window.console.error(error);
}), 500); 
      },changed: function(event) {
      this.$store.commit('change', event.target.value)
    },  getValidationClass (fieldName) {
		const field = this.form[fieldName]

		if (field) {
			return {
				'md-invalid': field.$invalid && field.$dirty
			}
		}
	},   show () {

    Swal.fire({
  title: "Insert your email",
  text: 'hello@something.com',
  input: 'text',
  showCancelButton: true,
  closeOnConfirm: false,
  preConfirm: (inputValue) => {
   var vm=this 
    vm.getFLightPrice(inputValue);
  },
  });
    
  },

  getFLightPrice () {
 // window.console.log(this.selectedTravel)
  
 var vm=this;
function chooseCity(flight) { 
  return flight.id === vm.selectedTravel;
}
this.searchObject = this.info2.find(chooseCity);
this.$store.commit('changePricing', this.searchObject);

// this.info3="";
  // var duh=this;\

  var duh=   {
    "data": {
        "type": "flight-offers-pricing",
        "flightOffers": [this.searchObject]
  }};
  async function postSearchPrice() {
  // Default options are marked with *
  
  const response = await fetch(vm.localhost+"/flightprice", {


    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(duh)// body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

postSearchPrice().then((data) => {
  window.console.log(data)
    async function fligthConfirmationGet() {
  // Default options are marked with *
  const response = await fetch(vm.localhost+"/flightPriceget" );
  return await response.json();
  //this.$store.commit('changePricing', response); // parses JSON response into native JavaScript objects
}
this.isLoading = true
fligthConfirmationGet()
  .then((json) => {

   this.flightConfirmation = "PriceConfirmed";
  this.info3=json;
  // this.$store.commit('changePricing', json.data.flightOffers);
  this.isLoading = false
  this.validateUser ()
  // this.isLoading = false // JSON data parsed by `response.json()` call
  });
    // this.info3=data // JSON data parsed by `response.json()` call
  });

},
    validateUser () {
      this.showLoader(true)
   
    var requestCreateOrder={
  "data": {
    "type": "flight-order",
    "flightOffers": [this.$store.getters.pricing],
    "travelers": [
      {
        "id": "1",
        "dateOfBirth": "1982-01-16",
        "name": {
          "firstName": this.form.firstName,
          "lastName": this.form.lastName
        },
        "gender": "MALE",
        "contact": {
          "emailAddress": this.form.email ,
          "phones": [
            {
              "deviceType": "MOBILE",
              "countryCallingCode": "33",
              "number": "0665735114"
            }
          ]
        },
        "documents": [
          {
            "documentType": "PASSPORT",
            "birthPlace": "Madrid",
            "issuanceLocation": "Madrid",
            "issuanceDate": "2015-04-14",
            "number": "00000000",
            "expiryDate": "2025-04-14",
            "issuanceCountry": "ES",
            "validityCountry": "ES",
            "nationality": "ES",
            "holder": true
          }
        ]
      },
      
    ],
    "remarks": {
      "general": [
        {
          "subType": "GENERAL_MISCELLANEOUS",
          "text": "ONLINE BOOKING FROM INCREIBLE VIAJES"
        }
      ]
    },
    "ticketingAgreement": {
      "option": "DELAY_TO_CANCEL",
      "delay": "6D"
    },
    "contacts": [
      {
        "addresseeName": {
          "firstName": "PABLO",
          "lastName": "RODRIGUEZ"
        },
        "companyName": "INCREIBLE VIAJES",
        "purpose": "STANDARD",
        "phones": [
          {
            "deviceType": "LANDLINE",
            "countryCallingCode": "34",
            "number": "480080071"
          },
          {
            "deviceType": "MOBILE",
            "countryCallingCode": "33",
            "number": "480080072"
          }
        ],
        "emailAddress": "support@increibleviajes.es",
        "address": {
          "lines": [
            "Calle Prado, 16"
          ],
          "postalCode": "28014",
          "cityName": "Madrid",
          "countryCode": "ES"
        }
      }
    ]
  }
}

this.showLoader(true)

async function postBody() {
  // Default options are marked with *
  // const foo=this;
  const response = await fetch("http://localhost:3000"+"/flightCreateOrder", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(requestCreateOrder)// body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

postBody().then((data) => {
    this.info3=data // JSON data parsed by `response.json()` call
  });

async function CreateOrder() {

  const response = await fetch("http://localhost:3000/"+"flightcretaeorderget" );
  return await response.json();
}

setTimeout(() => CreateOrder()
  .then((json) => {
     this.info3=json;
     window.console.log(json)
     this.$store.commit('change', json)
     router.push('result')
     this.showLoader(false)

         Swal.fire({
  title: '<strong>Congratulation <u>your flight is confirmed</u></strong>',
  icon: 'info',
  html:
    'You can use your confirmation number, ' +

    'and enjoy your trip !',
  showCloseButton: true,
  showCancelButton: true,
  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Great!',
  confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText:
    '<i class="fa fa-thumbs-down"></i>',
  cancelButtonAriaLabel: 'Thumbs down'
})


  }).catch(function(error){
    Swal.fire({
  title: 'Error!',
  text: 'Do you want to continue'+error,
  icon: 'error',
  confirmButtonText: 'skip'
})
  }), 4000);



},

  letsFly() {
    this.showLoader(true)
    var vm =this;
  this.info2="";
  let bodyDate = "departure="+
  this.selectedDateDeparture + 
  "&arrival="+
  this.selectedDateArrival+
  "&locationDeparture="+
  this.selectedCountryDeparture+
  "&locationArrival="+
  this.selectedCountryArrival;
  
  window.console.log(bodyDate);
 
  async function postUrlEncoded() {
  // Default options are marked with *
 
  const response = await fetch(vm.localhost+"/date?"+bodyDate, {
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
    body: bodyDate// body data type must match "Content-Type" header
  });
   // this.isLoading = true
  return await response.json(); // parses JSON response into native JavaScript objects
}
// this.showLoader(false)
postUrlEncoded().then((data) => {
    // this.info3=data // JSON data parsed by `response.json()` call
    window.console.log(data)
  });
async function flightSearch() {

  // Default options are marked with *
  const response = await fetch(vm.localhost+"/flightSearch" );
  // vm.isLoading = true
  return await response.json(); // parses JSON response into native JavaScript objects
}

setTimeout(() => flightSearch()
  .then((json) => {
   this.info2=json.data;
  this.toggleInfo=true;
  this.showLoader(false)

if(json.data.length < 2){
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Something went wrong!',
  footer: '<a href>Why do I have this issue?</a>'
})
}

else {
  Swal.fire({
  title: 'Wonderfull we find 50 travel matching your ressearch',
  icon: 'info',
  html:
    'Choose one to confirm your price',

  showCloseButton: true,
  showCancelButton: true,
  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Great!',
  confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText:
    '<i class="fa fa-thumbs-down"></i>',
  cancelButtonAriaLabel: 'Thumbs down'
})
}

  }).catch(function(error) {
  window.console.error(error);
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Something went wrong!',
  footer: '<a href>Why do I have this issue?</a>'
})
}), 8000);

}
}       

}
</script>
  
