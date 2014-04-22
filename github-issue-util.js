'use strict';

var NodeRestClient = require('node-rest-client').Client;
var RSVP = require('rsvp');
var _ = require('lodash');

function GithubIssueUtil(userName, apiToken) {

  this._userName = userName;
  this._apiToken = apiToken;

  this._baseUrl = 'https://api.github.com/api/repos/${owner}/repo/${repo}';

  this._defaultArgs = {
      path: {
        owner: this._userName
      },
      headers: {
          'User-Agent': 'curl/7.9.8 (i686-pc-linux-gnu) libcurl 7.9.8 (OpenSSL 0.9.6b) (ipv6 enabled)'
      }
  };

  this._restClient = new NodeRestClient();

  (function registerGithubMethods() {
    this._restClient.registerMethod('getIssues', this._baseUrl, 'GET'); 
    this._restClient.registerMethod('postIssues', this._baseUrl, 'POST'); 
  })();

  this.getIssueLabels = function getIssueLabels(srcRepo) {
    var deferred = RSVP.defer();

    var args = this.makeArgs({
      path: {
        repo: srcRepo
      }
    });

    this._restClient(args, function(data) {
      deferred.resolve(data);
    });

    return deferred.promise();
  };

  this.createIssueLabel = function createIssueLabel() {

  };

  this.makeArgs = function makeArgs(userArgs) {
    return _.merge(this._defaultArgs, userArgs);
  };
}

module.exports = GithubIssueUtil;
