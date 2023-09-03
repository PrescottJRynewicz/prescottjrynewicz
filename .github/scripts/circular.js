const madge = require('madge');

const config = {
  tsConfig: 'tsconfig.json'
};

const RootPromise = madge('app/root.tsx', config);
const ServerEntryPromise = madge('app/entry.server.tsx', config);
const ClientEntryPromise = madge('app/entry.client.tsx', config);

new Promise(async () => {
  try {
    const root = await RootPromise;
    const server = await ServerEntryPromise;
    const client = await ClientEntryPromise;

    console.log('root.tsx', root.circular());
    console.log('entry.server.tsx', server.circular());
    console.log('entry.client.tsx', client.circular());
    console.log('\n\n');

    if (
      root.circular().length > 0 ||
      server.circular().length > 0 ||
      client.circular().length > 0
    ) {
      console.log('\x1b[31m Circular dependency detected. See above logs for details.\x1b[0m');
      process.exit(1);
    }

    console.log('no circular dependencies detected');
  } catch (e) {
    console.log('\x1b[31m Circular dependency detected.\x1b[0m');
    console.log(e);
    process.exit(1);
  }

  process.exit(0);
});
