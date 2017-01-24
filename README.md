
[![npm version](https://img.shields.io/npm/v/generator-goatstack.svg)](https://www.npmjs.com/package/generator-goatstack)
[![Dependency Status](https://img.shields.io/david/projectSHAI/GOATstack.svg)](https://david-dm.org/JCThomas4214/GOAT-yeoman.svg)

![GOAT-yeoman](https://github.com/JCThomas4214/Documentation/blob/master/GOAT-yeoman/goat-yeoman-banner.png)
yo generator for the [GOATstack](https://github.com/projectSHAI/GOATstack), a MEAN stack that puts SEO and scale-ability first

# Quick-Start

```sh
$ npm install -g yo generator-goatstack
$ mkdir [dirName] $$ cd [dirName]
$ yo goatstack [name?]
```

# Possible generators
  <img align="right" src="https://github.com/JCThomas4214/Documentation/blob/master/GOAT-yeoman/puzzle-pieces.png"/>
  
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
