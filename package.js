Package.describe({
  name: 'smithy:describe',
  summary: 'A simple "describe" like syntax for testing meteor packages with Tinytest',
  version: '0.1.3',
  git: 'https://github.com/paolo/smithy-describe.git'
});

Npm.depends({
  'sinon': '1.17.2',
  'chai': '3.4.1'
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

  api.use('cosmos:browserify@0.9.2', 'client');

  //
  // Files
  //
  api.addFiles('packages.browserify.js');
  api.addFiles('lib/describe.js');

  //
  // Exports
  //
  api.export('sinon');
  api.export('expect');
  api.export('describe');
  api.export('catchable');
});

Package.onTest(function (api) {
  api.use('smithy:describe@0.1.3');

  api.addFiles('tests/tests.js');
});
