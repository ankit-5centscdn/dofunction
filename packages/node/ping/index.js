const request = require('ping');

async function main(args, event) {
    /**
    * give ping info
    */
     const ping = require('ping');
      try {
          const pingResult = await ping.promise.probe(args.target);
          return {"body": {
            pingResult: pingResult,
            location: nodeLocation
          }};
      } catch (error) {
        console.error('Error occurred:', error);
        return {"body": {
          pingResult: 'error',
          location: nodeLocation
        }};
        throw error;
      }

}

exports.main = main;
