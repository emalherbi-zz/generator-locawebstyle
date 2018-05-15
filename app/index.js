'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var MyGenerator = module.exports = function MyGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.on('end', function() {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });
};
util.inherits(MyGenerator, yeoman.generators.Base);
MyGenerator.prototype.askFor = function askFor() {
  var done = this.async();
  console.log(this.yeoman);
  var prompts = [{
    type: 'input',
    name: 'appName',
    message: 'What is your app\'s name?',
    default: 'Locawebstyle'
  }, {
    type: 'input',
    name: 'appVersion',
    message: 'version?',
    default: '1.0.0'
  }, {
    type: 'list',
    name: 'nameTheme',
    message: 'Would you like to include LocawebStyle Theme?',
    choices: [{
      name: 'dark-yellow',
      value: 'dark-yellow'
    }, {
      name: 'yellow-gold',
      value: 'yellow-gold'
    }, {
      name: 'blue',
      value: 'blue'
    }, {
      name: 'light-blue',
      value: 'light-blue'
    }, {
      name: 'indigo',
      value: 'indigo'
    }, {
      name: 'royal-blue',
      value: 'royal-blue'
    }, {
      name: 'turquoise',
      value: 'turquoise'
    }, {
      name: 'cyanogen',
      value: 'cyanogen'
    }, {
      name: 'gray',
      value: 'gray'
    }, {
      name: 'gold',
      value: 'gold'
    }, {
      name: 'orange',
      value: 'orange'
    }, {
      name: 'light-brown',
      value: 'light-brown'
    }, {
      name: 'purple',
      value: 'purple'
    }, {
      name: 'green',
      value: 'green'
    }, {
      name: 'light-green',
      value: 'light-green'
    }, {
      name: 'green-lemon',
      value: 'green-lemon'
    }, {
      name: 'dark-lemon',
      value: 'dark-lemon'
    }, {
      name: 'moss',
      value: 'moss'
    }, {
      name: 'light-red',
      value: 'light-red'
    }, {
      name: 'wine',
      value: 'wine'
    }],
    default: 0
  }];
  this.prompt(prompts, function processAnswers(answers) {
    this.appName = answers.appName;
    this.appVersion = answers.appVersion;
    this.nameTheme = answers.nameTheme;
    done();
  }.bind(this));
};
MyGenerator.prototype.createDirectories = function createDirectories() {
  this.mkdir('app');
  this.mkdir('app/img');
  this.mkdir('app/css');
  this.mkdir('app/js');
};
MyGenerator.prototype.addFiles = function addFiles() {
  this.template('_index.html', 'app/index.html');
  this.copy('_app.css', 'app/css/app.css');
  this.template('_app.js', 'app/js/app.js');
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
  this.copy('_gruntfile.js', 'Gruntfile.js');
  this.template('_package-app.json', 'app/package.json');
  this.template('_package.json', 'package.json');
  this.copy('_properties.json', 'properties.json');
  this.copy('_.jsbeautifyrc', '.jsbeautifyrc');
  this.copy('_.jshintrc', '.jshintrc');
};