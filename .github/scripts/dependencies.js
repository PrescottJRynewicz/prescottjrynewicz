const ncu = require('npm-check-updates');

/**
 * Packages to ignore that require manual updates due to conflicts.
 */
const packagesToIgnore = ['eslint'];

console.log('\x1b[32mChecking for dependencies that can be updated...\x1b[0m');


ncu.run().then((result) => {
  // print to the screen in green

  packagesToIgnore.forEach((packageToIgnore) => {
    delete result[packageToIgnore];
  });

  if (Object.keys(result).length > 0) {
    // print to console in green color
    console.log('\x1b[32m Packages are ready to be updated \x1b[0m');
    console.log(result);
    process.exit(1);
  } else {
    console.log('\x1b[32m All packages are up to date \x1b[0m');

  }

  process.exit(0);
});
