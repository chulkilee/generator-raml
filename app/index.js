'use strict';
var yeoman = require('yeoman-generator');

var RamlDocGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  writing: function () {
      this.dest.mkdir('src');

      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('gitignore', '.gitignore');

      this.template('_package.json', 'package.json');
      this.template('README.md');
      this.template('src/index.raml', 'src/index.raml');
      this.src.copy('_gulpfile.js', 'gulpfile.js');
  },

  end: function () {
    if (!this.options['skip-install']) {
      this.npmInstall();
    }
  }
});

module.exports = RamlDocGenerator;
