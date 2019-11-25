// get-candidates.js
const xsenv = require('@sap/xsenv');
var xssec = require("@sap/xssec");
const { retrieveJwt } = require("@sap/cloud-sdk-core");


const { Candidate } = require('./odata-client/sfo-data-service');

function getCandidates(req) {


  var req = Candidate.requestBuilder()
    .getAll()
    .top(20) //look at the top 20 candidates only
    .select(Candidate.FIRST_NAME, Candidate.LAST_NAME)
    // .withCustomHeaders({
    //   Authorization: 'Basic c2ZhZG1pbkBTRlNBTEVTMDA2MDk3OnRva3lv'
    // })
    .execute({
      // url: 'https://apisalesdemo2.successfactors.eu'
      // destinationName: 'my-destination',
      // jwt: fetchToken(),
      destinationName: 'sfdemo'
      // to retrieve the proper jwt token I need to set up proper authentication through the app router.
    });

    return req
}

function fetchToken(){

  // var uaaService = xsenv.getServices( { uaa: 'myuaa' } ).uaa;
  return xssec.getAppToken();
}

// 	sfdemo

function candidatesRoute(req, res) {  

    getCandidates()
      .then(candidates => {
        res.status(200).send(candidates);

      })
      .catch(
        
      )
  }
  

module.exports.getCandidates = getCandidates;
exports.candidatesRoute = candidatesRoute;