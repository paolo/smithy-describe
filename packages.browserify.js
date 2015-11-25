if (Meteor.isServer) {
  sinon = Npm.require('sinon');
  chai = Npm.require('chai');
} else {
  sinon = require('sinon');
  chai = require('chai');
}

expect = chai.expect;
