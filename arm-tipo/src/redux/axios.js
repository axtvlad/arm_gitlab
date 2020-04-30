
axios.get('http://localhost:3003/rest/api/types', config)
    .then(function (response) {
        return response
    })
    .catch(function (error) {
        console.log('An error occured.' + error);
    });
