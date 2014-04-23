/**
 *
 */
'use strict';

var fs = require('fs');
var cli = require('cli');
var _ = require('lodash');
var GithubIssueUtil = require('./github-issue-util.js');

cli.parse({
  configFile: ['c', 'Github config file path', 'path', '~/.githubconfig'],
  srcUser: ['u', 'User name', 'string'],
  destUser: [null, 'Destination user name when source/dest differ', 'string'],
  srcRepo: ['s', 'Source repository', 'string'],
  destRepo: ['d', 'Destination repository', 'string']
});

cli.main(function(args, options) {
  if(!options.configFile) {
    this.fatal('Must supply a Github config file. See README.md for info.');
  } else {
    var jsonObj = JSON.parse(fs.readFileSync(options.configFile));
    options.accessToken = jsonObj.personalAccessToken;
  }

  if(!options.srcRepo) {
    this.fatal('Must supply a source repository name.');
  }

  if(!options.destRepo) {
    this.fatal('Must supply a destination repository name.');
  }

  if(!options.srcUser) {
    this.fatal('Must supply a user name.');
  }

  var ghUtil = new GithubIssueUtil(options.srcUser, options.accessToken, options.destUser);
  ghUtil.getIssueLabels(options.srcRepo).then(function(srcIssueLabels) {
    // Iterate through the labels but leave out "url" attribute since that will
    // have information about the source repo we don't care about anymore.
    _(srcIssueLabels).each(function(label) {
      ghUtil.createIssueLabel(options.destRepo, _.omit(label, 'url'));
    });
  });

});
