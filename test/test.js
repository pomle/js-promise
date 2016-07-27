const Promise = require('../promise');

describe('Promise', function() {
  function doSomething() {
    return new Promise(function(resolve) {
      var value = 42;
      resolve(value);
    });
  }

  function doSomethingElse() {
    return new Promise(function(resolve) {
      var value = 105;
      resolve(value);
    });
  }

  it('should call once', function() {
    doSomething().then(res => {
      console.log(res);
    });
  });

  it('should call multi', function() {
    var promise = doSomething();

    promise.then(function(value) {
      console.log('Got a value:', value);
    });

    promise.then(function(value) {
      console.log('Got the same value again:', value);
    });
  });

  it('should be chainable', function() {
    doSomething().then(function(result) {
      console.log('first result', result);
      // not explicitly returning anything
      return '43';
    }).then(function(secondResult) {
      console.log('second result', secondResult);
    });
  });

  it('should be chainable without providing then callback', function() {
    doSomething().then().then(function(result) {
      console.log('first result', result);
    });
  });

  it('should be chainable with promises in between', function() {
    doSomething().then(function(result) {
      // doSomethingElse returns a promise
      return doSomethingElse(result);
    }).then(function(finalResult) {
      console.log("the final result is", finalResult);
    });
  });
});