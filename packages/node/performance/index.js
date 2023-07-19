const request = require('request');

// config
const apiKey = "57a11e6bd226b4b0d36db218fa2933bef5ac884d";
const apiEndPoint = "http://206.189.183.219/cdn_network_performance";

async function main(providers, event) {

    var promises = [];
    // return Promise response.
    return new Promise((resolve) => {

    for (var provider in providers) {
        var cdnUrl = providers[provider];
        promises.push(ping(provider, cdnUrl, apiKey, apiEndPoint, nodeLocation));
    }


    Promise.all(promises)
    .then(results => {
    //   console.log('loop end.');
        resolve({body: results})
    })
    .catch(error => {
        console.error('Error occurred:', error);
        resolve({body: error});
    });

    })
    // end


    // function to pin cdn.
    function ping_cdn(provider, cdnUrl, apiKey, nodeLocation) {
        return new Promise((resolve, reject) => {
            console.log("requesting to..: ", provider);
            request({
                uri: cdnUrl + '?t=' + new Date().getTime(),
                method: 'GET',
                time: true,
                timeout: 2500
            }, function (error, response, body) {

                if (error) {
                    if (error.code === 'ETIMEDOUT') console.log("time out occurred", provider);
                    if (error.code === 'ECONNRESET') { console.log('socket hang up'); }
                    let formData = {
                        host: provider,
                        uptime: 0,
                        latency: 0,
                        location: nodeLocation
                    };
                    resolve(formData);

                } else {

                    let formData = {
                        host: provider,
                        cdn_ip: response.connection.remoteAddress,
                        uptime: 1,
                        latency: (response.timingPhases.firstByte),
                        location: nodeLocation
                    };
                    resolve(formData);

                }
            });
        });
    }

    // function to upload performance data into database using api.
    function upload_cdn_network_performance(apiEndPoint, formData) {
        console.log("uploading performance..: ", formData.host);
        return new Promise((resolve, reject) => {
            request.post({
                url: apiEndPoint,
                form: formData,
                headers: {'X-API-KEY': apiKey}
            }, function (err, httpResponse, body) {
                if (err) {
                    resolve(err);
                } else {
                    resolve(body);
                }
            });
        });
    }


    async function ping(provider, cdnUrl, apiKey, apiEndPoint, nodeLocation) {
        try {
            let formData = await ping_cdn(provider, cdnUrl, apiKey, nodeLocation);
            let res = await upload_cdn_network_performance(apiEndPoint, formData);
            console.log('uploaded '+provider+' performance data' );
            return res;
        } catch (err) {
            console.log('error: ', err);
            // throw err;
            return err;
        }
    }

}

exports.main = main;
