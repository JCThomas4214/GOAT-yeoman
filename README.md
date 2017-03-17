# Check out the [Demo App](http://www.goatstack.com/)!
_**NOTE**: This is the yo generator for the [GOATstack](https://github.com/projectSHAI/GOATstack), a ACNE/MEAN/SEAN stack that puts SEO and scale-ability first_
___

[![npm version](https://img.shields.io/npm/v/generator-goatstack.svg)](https://www.npmjs.com/package/generator-goatstack)
[![Dependency Status](https://img.shields.io/david/projectSHAI/GOATstack.svg)](https://david-dm.org/projectSHAI/GOAT-stack/tree/master.svg)
[![Dev-Dependency Status](https://img.shields.io/david/dev/projectSHAI/GOATstack.svg)](https://david-dm.org/projectSHAI/GOAT-stack/tree/master.svg#info=devDependencies)

[![GOAT yeoman][logo]](https://github.com/projectSHAI/GOATstack)

# Stack Types

* _CANE_ - Cassandra, Angular, NodeJS, Express
* _MEAN_ - MongoDB, Express, Angular, NodeJS
* _SEAN_ - SQL, Express, Angular, NodeJS

### GOATstack uses [Yarn](https://yarnpkg.com/en/) package manager and is required for package consistancy

# Quick-Start

```sh
$ yarn global add yo generator-goatstack
$ mkdir [dirName] $$ cd [dirName]
$ yo goatstack [name?]
```

# Coming Soon! v3.1

**_WARNING: 3.0 => 3.1 brings BREAKING CHANGES to the generator. Upgrade with caution_**

* generator will no longer prompt for what app you would like to generate (demo, helloGOAT, dblessGOAT)
   * instead it will prompt for what databases you would like to use (Apache-Cassandra, MongoDB, MySQL, PostgresSQL, MariaDB, SQLite, MSSQL), you can select one or many
   * if more than one database selected it will ask what database will be your default, where user authentication will be generated
   * __IF NO DATABASE IS SELECTED__ a dbless solution will be generated
* All packages updated to the latest

# What's New! v3.0

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
  <img align="right" src="https://github.com/JCThomas4214/Documentation/raw/master/GOAT-yeoman/puzzle-pieces.png?raw=true"/>
  
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

[logo]: https://github.com/JCThomas4214/Documentation/raw/master/GOAT-yeoman/goat-yeoman-banner.png?raw=true "GOAT-Yeoman"
