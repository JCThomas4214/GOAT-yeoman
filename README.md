# Check out the [Demo App](http://www.goatstack.com/)!
_**NOTE**: This is the yo generator for the [GOATstack](https://github.com/projectSHAI/GOATstack), a MEAN stack that puts SEO and scale-ability first_
___

[![npm version](https://img.shields.io/npm/v/generator-goatstack.svg)](https://www.npmjs.com/package/generator-goatstack)
[![Dependency Status](https://img.shields.io/david/projectSHAI/GOATstack.svg)](https://david-dm.org/JCThomas4214/GOAT-yeoman.svg)

![GOAT yeoman][logo]

# Quick-Start

```sh
$ npm install -g yo generator-goatstack
$ mkdir [dirName] $$ cd [dirName]
$ yo goatstack [name?]
```

# What's new? v3.x

* Moved to [ngModule](https://angular.io/docs/ts/latest/guide/ngmodule.html) structure
* Removed segment generator
  * segments were an attempt to remedy an issue with ng2-redux which is no longer present
* NEW module/submodule generator
  * modules give access to features like lazyLoadingModules and [more](https://angular.io/docs/ts/latest/guide/ngmodule.html)
  * more inline with the angular way


# Future updates! v4.x [Angular4]

* Server-side rendering with [Angular Universal](https://universal.angular.io/)
  * Angular Universal will be integrated into @angular/core upon [angular@4.x](https://github.com/angular/angular/blob/master/CHANGELOG.md)
  * we will begin refactoring on the GOATv4 branch once rc.1 publishes in the coming month



# Possible generators
  <img align="right" src="https://raw.githubusercontent.com/JCThomas4214/GOAT-yeoman/master/assets/puzzle-pieces.png"/>
  
  + `yo goatstack [name?]`
  
  + `yo goatstack:module [name?]`
    + must add dependancy to app module

  + `yo goatstack:submodule [name?]`
    + must add dependancy to parent module
  
  + `yo goatstack:component [name?]`
    + must add dependancy to parent module
  
  + `yo goatstack:service [name?]`
    + must add dependancy to parent module/component
  
  + `yo goatstack:directive [name?]`
    + must add dependancy to parent module/component
  
  + `yo goatstack:pipe [name?]`
    + must add dependancy to parent module/component
  
  + `yo goatstack:actions [name?]`
    + must add dependancy to parent module/component
  
  + `yo goatstack:store-item [name?]`
    + must add actions dependancy to parent module/component
  
  + `yo goatstack:endpoint [name?]`
    + no hookup required
  
  
_**NOTE**: more information on the generator process click [here](https://github.com/projectSHAI/GOATstack/wiki/Yeoman-Generator-usage)_

[logo]: /assets/goat-yeoman-banner.png "GOAT-Yeoman"
