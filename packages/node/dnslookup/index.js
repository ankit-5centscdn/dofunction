const dns = require('dns');

async function main('google.com') {
  const startTime = process.hrtime();

  try {
    await dns.promises.lookup(domain);
    const endTime = process.hrtime(startTime);
    const lookupTime = endTime[0] * 1000 + endTime[1] / 1000000; // Convert to milliseconds
    console.log(`Domain lookup time for ${domain}: ${lookupTime}ms`);
  } catch (error) {
    console.error(`Error occurred during domain lookup: ${error}`);
  }
}

 exports.main = main;
