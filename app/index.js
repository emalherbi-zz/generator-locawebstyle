var util = require('util');
var yeoman = require('yeoman-generator');

var MyGenerator = module.exports = function MyGenerator(args, options, config) {
  'use strict';

  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall : options['skip-install'] });
    /*
    this.installDependencies({
      skipInstall : this.options['skip-install'],
      callback : function () {
        this.spawnCommand('grunt', ['bower']);
      }.bind(this) // bind the callback to the parent scope
    });
    */
  });
};

util.inherits(MyGenerator, yeoman.generators.Base);

MyGenerator.prototype.askFor = function askFor() {
  'use strict';

  var done = this.async();

  console.log(this.yeoman);

  var prompts = [{
    name: 'appName',
    message: 'What is your app\'s name ?',
    default: 'LocaWebStyle'
  }, {
    name: 'appVersion',
    message: 'version ?',
    default: '1.0.0'
  }, {
    type: 'confirm',
    name: 'includeNormalize',
    message: 'Would you like to include normalize.css?',
    default: true
  }, {
    type: 'confirm',
    name: 'includeJQuery',
    message: 'Would you like to include jQuery?',
    default: true
  }, {
    type: 'confirm',
    name: 'includeLocawebStyle',
    message: 'Would you like to include LocawebStyle?',
    default: true
  }, {
    name: 'nameTheme',
    message: 'Would you like to include LocawebStyle Theme (gold, green, light-green)?',
    default: 'gold'
  }];

  this.prompt(prompts, function processAnswers(answers) {

    this.appName = answers.appName;
    this.appVersion = answers.appVersion;
    this.includeNormalize = answers.includeNormalize;
    this.includeJQuery = answers.includeJQuery;
    this.includeLocawebStyle = answers.includeLocawebStyle;
    this.nameTheme = answers.nameTheme;

    if ( this.includeLocawebStyle )
      this.includeJQuery = true;

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
