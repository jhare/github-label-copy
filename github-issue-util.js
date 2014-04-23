'use strict';

var NodeRestClient = require('node-rest-client').Client;
var RSVP = require('rsvp');
var _ = require('lodash');

function GithubIssueUtil(srcUserName, apiToken, destUserName) {
  this._srcUserName = srcUserName;
  this._destUserName = destUserName || srcUserName;
  this._apiToken = apiToken;

  this._baseUrl = 'https://api.github.com/repos/${owner}/${repo}/labels';

  this._defaultAuth = {
    user: 'githubkeygoeshere',
    password: 'x-oauth-basic'
  };

  this._defaultArgs = {
      headers: {
          'User-Agent': 'curl/7.9.8 (i686-pc-linux-gnu) libcurl 7.9.8 (OpenSSL 0.9.6b) (ipv6 enabled)',
          'Accept': 'application/json'
      }
  };

  this._makeArgs = function makeArgs(userArgs) {
    return _.merge(this._defaultArgs, userArgs);
  };

  this._makeAuth = function makeAuth(srcUserName) {
    return _.merge(this._defaultAuth, { user: srcUserName });
  };

  this._restClient = new NodeRestClient(this._makeAuth(this._apiToken));

  this._restClient.registerMethod('getIssues', this._baseUrl, 'GET'); 
  this._restClient.registerMethod('postIssue', this._baseUrl, 'POST'); 

  this.getIssueLabels = function getIssueLabels(srcRepo) {
    var deferred = RSVP.defer();

    var args = this._makeArgs({
      path: {
        owner: this._srcUserName,
        repo: srcRepo
      }
    });

    this._restClient.methods.getIssues(args, function(data) {
      // We shouldn't have to call parse here... not sure why node-rest-client
      // doesn't automatically do that for us.
      deferred.resolve(JSON.parse(data));
    });

    return deferred.promise;
  };

  this.createIssueLabel = function createIssueLabel(destRepo, label) {
    var deferred = RSVP.defer();

    var args = this._makeArgs({
      data: label,
      path: {
        owner: this._destUserName,
        repo: destRepo
      }
    });

    this._restClient.methods.postIssue(args, function(data) {
      // We shouldn't have to call parse here... not sure why node-rest-client
      // doesn't automatically do that for us.
      deferred.resolve(JSON.parse(data));
    });

    return deferred.promise;
  };

}

module.exports = GithubIssueUtil;
