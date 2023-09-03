const ncu = require('npm-check-updates');

ncu.run().then((result) => {
  if (Object.keys(result).length > 0) {
    // print to console in green color
    console.log('\x1b[32m Packages are ready to be updated \x1b[0m');
    console.log(result);
    process.exit(1);
  }

  process.exit(0);
});
