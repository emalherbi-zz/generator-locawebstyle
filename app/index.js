var util = require('util');
var yeoman = require('yeoman-generator');

var MyGenerator = module.exports = function MyGenerator(args, options, config) {
  'use strict';

  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    // this.installDependencies({ skipInstall : options['skip-install'] });
    this.installDependencies({
      skipInstall : this.options['skip-install'],
      callback : function () {
        this.spawnCommand('grunt', ['bower:install']);
      }.bind(this)
    });
  });
};

util.inherits(MyGenerator, yeoman.generators.Base);

MyGenerator.prototype.askFor = function askFor() {
  'use strict';

  var done = this.async();

  console.log(this.yeoman);

  var prompts = [{
    type: 'input',
    name: 'appName',
    message: 'What is your app\'s name?',
    default: 'LocawebStyle'
  }, {
    type: 'input',
    name: 'appVersion',
    message: 'version?',
    default: '1.0.0'
  }, {
    type: 'confirm',
    name: 'includeNormalize',
    message: 'Would you like to include normalize.css?',
    default: true
  }, /*{
    type: 'confirm',
    name: 'includeJQuery',
    message: 'Would you like to include jQuery?',
    default: true
  }, {
    type: 'confirm',
    name: 'includeLocawebStyle',
    message: 'Would you like to include LocawebStyle?',
    default: true
  },*/ {
    type: 'list',
    name: 'nameTheme',
    message: 'Would you like to include LocawebStyle Theme?',
    choices:[{
      name: 'green',
      value: 'includeGreen'
    },{
      name: 'light-green',
      value: 'includeLightGreen'
    },{
      name: 'blue',
      value: 'includeBlue'
    },{
      name: 'gold',
      value: 'includeGold'
    },{
      name: 'gray',
      value: 'includeGray'
    },{
      name: 'orange',
      value: 'includeOrange'
    },{
      name: 'light-red',
      value: 'includeLightRed'
    }],
    default: 0
  }];

  this.prompt(prompts, function processAnswers(answers) {

    this.appName = answers.appName;
    this.appVersion = answers.appVersion;
    this.includeNormalize = answers.includeNormalize;
    this.includeJQuery = true; //answers.includeJQuery;
    this.includeLocawebStyle = true; //answers.includeLocawebStyle;

    if (answers.nameTheme.indexOf('includeGreen') !== -1) {
      this.nameTheme = 'green';
    }
    else if (answers.nameTheme.indexOf('includeLightGreen') !== -1) {
      this.nameTheme = 'light-green';
    }
    else if (answers.nameTheme.indexOf('includeBlue') !== -1) {
      this.nameTheme = 'blue';
    }
    else if (answers.nameTheme.indexOf('includeGold') !== -1) {
      this.nameTheme = 'gold';
    }
    else if (answers.nameTheme.indexOf('includeGray') !== -1) {
      this.nameTheme = 'gray';
    }
    else if (answers.nameTheme.indexOf('includeOrange') !== -1) {
      this.nameTheme = 'orange';
    }
    else if (answers.nameTheme.indexOf('includeLightRed') !== -1) {
      this.nameTheme = 'light-red';
    }

    if (this.includeLocawebStyle) {
      this.includeJQuery = true;
    }

    done();
  }.bind(this));
};

MyGenerator.prototype.createDirectories = function createDirectories() {
  'use strict';

  this.mkdir('app');
  this.mkdir('app/img');
  this.mkdir('app/css');
  this.mkdir('app/js');
};

MyGenerator.prototype.addFiles = function addFiles() {
  'use strict';

  this.template('_index.html', 'app/index.html');
  this.copy('_app.css', 'app/css/app.css');
  this.template('_app.js', 'app/js/app.js');

  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');

  this.template('_bower.json', 'bower.json');
  this.copy('bowerrc', '.bowerrc');

  this.copy('_gruntfile.js', 'Gruntfile.js');
  this.template('_package.json', 'package.json');
  this.copy('_properties.json', 'properties.json');
};
