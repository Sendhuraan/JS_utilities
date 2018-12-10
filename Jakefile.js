'use strict';
/*global desc, task, file, jake, rule, fail, complete, directory, namespace*/

(function() {

  // Uncomment and modify the following list to cause the build to fail unless these browsers are tested.
  var REQUIRED_BROWSERS = [
//    'IE 8.0.0 (Windows 7)',
//    'IE 9.0.0 (Windows 7)',
//    'Firefox 31.0.0 (Mac OS X 10.8)',
//    'Chrome 37.0.2062 (Mac OS X 10.8.5)',
//    'Safari 6.1.6 (Mac OS X 10.8.5)',
//    'Mobile Safari 7.0.0 (iOS 7.1)'
  ];

  var shell = require('shelljs');
  var path = require('path');
  var fs = require('fs');


  var GENERATED_DIR = 'generated';
  var JSX_DIR = GENERATED_DIR + '/jsx';
  var BROWSERIFY_DIR = GENERATED_DIR + '/browserify';
  var COLLATED_CLIENT_DIR = GENERATED_DIR + '/client';
  var DEPLOY_DIR = GENERATED_DIR + '/deploy';

  var COLLECTION_DIR = 'src/collection/';

  var CLIENT_DIR = 'src/collection';
  var VENDOR_DIR = 'src/utilities';

  directory(GENERATED_DIR);
  directory(BROWSERIFY_DIR);
  directory(COLLATED_CLIENT_DIR);
  directory(DEPLOY_DIR);

  desc('Default Task');
  task('default', ['lint'], function() {
    console.log('Build OK');
  });

  desc('Lint All JS Files');
  task('lint', function() {
    
    var lintConfig = require('./build/config/eslint.config.js');
    var lintRunner = require('./build/utilities/lint-runner.js');

    var listES5 = new jake.FileList();
    listES5.include('**/*.js');
    if (fs.existsSync('node_modules')) {
      listES5.exclude('node_modules/*');
    }
    if (fs.existsSync('src/collection')) {
      listES5.exclude('src/collection' + '/*');
    }
    
    var listES6 = new jake.FileList();
    listES6.include('src/collection/**/*.js');
    listES6.exclude('src/collection/*/generated/**/*.js');

    var lintES5 = lintRunner.validateFiles(listES5.toArray(), lintConfig.es5Options);
    var lintES6 = lintRunner.validateFiles(listES6.toArray(), lintConfig.es6Options);

    if(!lintES5 || !lintES6) {
      fail('Lint Failed');
    }

  }, { async: true });


  desc('Server Tests');
  task('runInNode', function(){

    var mochaConfig = require('./build/config/mocha.config.js');
    var mochaRunner = require('./build/utilities/mocha-runner.js');

    var testFiles = new jake.FileList();
    testFiles.include('src/collection/**/*.js');
    testFiles.exclude('src/collection/*/generated/**/*.js');

    mochaRunner.runTests(mochaConfig, testFiles);

  });

  namespace('browserTests', function() {

    var KarmaServer = require('karma').Server;

    var cfg = require('karma').config;
    var path = require('path');

    desc('Start Karma Server');
    task('start', function(sourceDirName) {

      var dependentTask = jake.Task['transpile:unit'];

      dependentTask.addListener('complete', function() {
        
        var overrideConfig = {
          files: [
              'src/collection/'+sourceDirName+'/generated/**/*.js'
            ],
          preprocessors: {}
        };

        overrideConfig.preprocessors['src/collection/'+sourceDirName+'/generated/**/*.js'] = ['browserify'];

        var karmaConfig = cfg.parseConfig(path.resolve('./build/config/karma.config.js'), overrideConfig);

        var serverInstance = new KarmaServer(karmaConfig, function(exitCode) {
          console.log('Karma has exited with ' + exitCode);
          process.exit(exitCode);
        });

        serverInstance.start();
        process.stdout.write('Capture the expected browsers');

      });

      dependentTask.invoke.apply(dependentTask, [sourceDirName]);

      

    });

    desc('Client Tests');
    task('run', function(sourceDirName) {

      var dependentTask = jake.Task['transpile:unit'];

      dependentTask.addListener('complete', function() {

        var overrideConfig = {
          files: [
              'src/collection/'+sourceDirName+'/generated/**/*.js'
            ],
          preprocessors: {}
        };

        overrideConfig.preprocessors['src/collection/'+sourceDirName+'/generated/**/*.js'] = ['browserify'];

        var karmaConfig = cfg.parseConfig(path.resolve('./build/config/karma.config.js'), overrideConfig);

        var runner = require('karma').runner;
        runner.run(karmaConfig, function(exitCode) {
          console.log('Karma has exited with ' + exitCode);
          process.exit(exitCode);
        });

      });

      dependentTask.invoke.apply(dependentTask, [sourceDirName]);

    });

  });

  namespace('transpile', function() {

    task('all', function() {
      process.stdout.write('Transpiling all folders ');
    });

    task('unit', function(sourceDirName) {

      if(!sourceDirName) {
        fail('Specify folder name for transpiling - transpile:unit[folderName]');
      }
      else {
        process.stdout.write('Transpiling unit folder ');

        var SOURCE_DIR = COLLECTION_DIR + sourceDirName;
        var GENERATED_DIR = SOURCE_DIR + '/generated';
        var DEPLOY_DIR = SOURCE_DIR + '/deploy';

        shell.rm('-rf', GENERATED_DIR + '/*');
        shell.mkdir('-p', GENERATED_DIR);

        var babelConfig = require('./build/config/babel.config.js');
        var babelRunner = require('./build/utilities/babel-runner.js');

        var transpileFileList = new jake.FileList();
        transpileFileList.include(SOURCE_DIR + '/**/*.js');

        var compileOptions = {
          presets: ['@babel/preset-env']
        };

        var transpileStatus = babelRunner.transformFiles(SOURCE_DIR, transpileFileList.toArray(), GENERATED_DIR, babelConfig);
        if (!transpileStatus) fail('Transpilation failed');

        complete();

        return sourceDirName;

      }

    }, { async: true });

  });

})();