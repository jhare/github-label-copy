/**
 *
 */
'use strict';

var cli = require('cli');
var _ = require('lodash');
var GithubIssueUtil = require('./github-issue-util.js');

cli.parse({
  configFile: ['c', 'Github config file path'],
  userName: ['u', 'User name'],
  srcRepo: ['s', 'Source repository'],
  destRepo: ['d', 'Destination repository']
});

cli.main(function(args, options) {
  if(!options.configFile) {
    this.fatal('Must supply a Github config file. See README.md for info.');
  } else {
    var jsonObj = JSON.parse(options.configFile);
    options.accessToken = jsonObj.personalAccessToken;
  }

  if(!options.srcRepo) {
    this.fatal('Must supply a source repository name.');
  }

  if(!options.destRepo) {
    this.fatal('Must supply a destination repository name.');
  }

  if(!options.userName) {
    this.fatal('Must supply a user name.');
  }

  var ghUtil = new GithubIssueUtil(options.userName, options.accessToken);
  ghUtil.getIssueLabels(options.srcRepo).then(function(srcIssueLabels) {
    _(srcIssueLabels).each(function(label) {
        ghUtil.createIssueLabel(options.destRepo, label);
    });
  });

});
