'use strict';
var js2xml = require('js2xmlparser');
var Client = require('node-rest-client').Client;
var client = new Client();

// https://app.swaggerhub.com/apis/dataday/uspsVerify/1.0.0#/verify/verify
// sample http://localhost:3000/verify?addr={%22Address1%22:%223114%20Church%22,%22Address2%22:%22%22,%22City%22:%22Evanston%22,%22State%22:%20%22IL%22,%22ZIP%22:%22%22}
var uspscred = "";
function init(app, creds){
	uspscred = creds || process.env.USPSUserID;
	
	app.post("/zipverify", function(req, res) {
var	addr = req.body;
	verify(addr, function (address) {
  		    var verified = (JSON.parse(JSON.stringify(address).replace(/^................/g, '{')));
  		    verified.ok = false;
  		    if ( verified.Zip5 === addr.Zip5){
  		    	verified.ok = true;	
  		    }
			res.status(200).send(verified);
	});
});
}

var warned = false;
function verify(address, callback){
	if ( uspscred == null ){
		if (!warned) {
			warned = true;
			console.log("USPS Zip Validate is disabled");
			console.log("No biggie... In order to try it either");
			console.log(" set process.env.USPSUserID to your USPS supplied USERID ");
			console.log(" or set commandline -u #### to your USPS supplied USERID ");
			console.log(" see: https://www.usps.com/business/web-tools-apis/welcome.htm for details");
		} 
		return;
	}

	var verifyObj = {
		"AddressValidateRequest": {"@":{"USERID":uspscred},
	    "Address":{
	    	"@": {
            "ID": "0"
          },
	    "Address1": address.Address1,
	    "Address2": address.Address2,
	    "City": address.City,
	    "State": address.State,
	    "Zip5": address.ZIP,
	    "Zip4": ""	}}};
	
	console.log("V-address",address);
	console.log("V-OBJ",verifyObj);
	
var sXML = js2xml.parse("a", verifyObj).replace(/^.....................\n.../g, '').replace(/\n+ */g, '').replace(/....$/g, '');

client.get('http://production.shippingapis.com/ShippingAPITest.dll?API=Verify&XML='+sXML, 
		function(data){
	callback(data.AddressValidateResponse.Address);
});
}

 /*
 * test code
 *
var addr = {"Address1": "3614 Church",
"Address2": "",
"City": "Evanston",
"State": "IL",
"ZIP": ""};
verify(addr, "298GUINE6374", function (address) {
    // parsed response body as js object
    console.log(address);
    // raw response
 //   console.log(response);
});
 */

module.exports = {
		verifyAddress:  verify,
				 init:  init
	};
