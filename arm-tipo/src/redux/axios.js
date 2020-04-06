import * as axios from "axios";

const user = "Admin";
const pass = "admin";

const authorizationBasic = window.btoa(user + ':' + pass);
const config = {
    "headers": {
        "Authorization": "Basic " + authorizationBasic
    }
};
axios.get('http://localhost:3003/rest/api/types', config)
    .then(function (response) {
        return response
    })
    .catch(function (error) {
        console.log('An error occured.' + error);
    });
