// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
// import { globSync } from 'glob';

// eslint-disable-next-line import/no-extraneous-dependencies
const { globSync } = require('glob');

// eslint-disable-next-line import/no-extraneous-dependencies
const madge = require('madge');

const config = {
  tsConfig: 'tsconfig.json',
};

const allEntryPoints: string[] = globSync('pages/**/*');

// print in green
console.log('\x1b[32m Checking for circular dependencies in...\x1b[0m');
console.log(allEntryPoints);

// eslint-disable-next-line no-new, no-async-promise-executor
new Promise(async () => {
  try {
    const allResults = await Promise.all(
      allEntryPoints.map((entryPoint) => madge(entryPoint, config))
    );

    let shouldFail = false;

    allResults.forEach(async (result, index) => {
      const filename = allEntryPoints[index];
      if (result.circular().length > 0) {
        console.log('\x1b[31m\n\nCircular dependency detected.\x1b[0m');
        console.log(result.circular());
        console.log('\n\n\n');
        shouldFail = true;
      } else {
        console.log(
          `\x1b[32m No circular dependencies for ${filename} \x1b[0m`
        );
      }
    });

    if (shouldFail) {
      process.exit(1);
    }

    console.log('no circular dependencies detected');
    // TODO: this should fail
  } catch (e) {
    console.log('\x1b[31m Circular dependency detected.\x1b[0m');
    console.log(e);
    process.exit(1);
  }

  process.exit(0);
});
