Package.describe({
  name: 'smithy:describe',
  summary: 'A simple "describe" like syntax for testing meteor packages with Tinytest',
  version: '0.1.2',
  git: 'https://github.com/paolo/smithy-describe.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  //
  // Packages
  //
  var packages = [
    'tinytest',
    'ecmascript',
    'underscore'
  ];
  api.use(packages);
  api.imply(packages);

  //
  // Files
  //
  api.addFiles('lib/describe.js');

  //
  // Exports
  //
  api.export('describe');
});

Package.onTest(function (api) {
  api.use('smithy:describe@0.1.2');

  api.addFiles('tests/tests.js');
});
