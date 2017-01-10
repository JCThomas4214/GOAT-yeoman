describe('App E2E Tests', function () {

  var EC = protractor.ExpectedConditions;
  var defaultConfig = eval(require('typescript')
    .transpile(require('graceful-fs')
      .readFileSync('./config/env/default.ts')
      .toString()));

  it('should contain correct title tag', function () {
    expect(browser.getTitle()).toEqual("<%= appname %>");
  });

  it('should contain correct favicon', function () {
    expect(element(by.id('favicon')).getAttribute('href'))
      .toEqual('http://localhost:7001/public/assets/favicon.png');
  });

  it('should contain correct meta description', function () {
    expect(element(by.name('description')).getAttribute('content')).toEqual("<%= appdescription %>");
  });

  it('should contain correct meta keywords', function () {
    expect(element(by.name('keywords')).getAttribute('content'))
      .toEqual("<%= appkeywords %>");
  });

});