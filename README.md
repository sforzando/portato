portato
====

Mail quota system for JMC.

[![CircleCI](https://circleci.com/gh/sforzando/portato.svg?style=svg)](https://circleci.com/gh/sforzando/portato)

> Portato [porˈtaːto] (Italian, past participle of portare, "to carry"), French notes portées (Anon. n.d.), in music denotes a smooth, pulsing articulation and is often notated by adding dots under slur markings.

TOC
----

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Setup](#setup)
	- [Local](#local)
	- [Heroku](#heroku)
- [Execute](#execute)
- [Deploy to Heroku](#deploy-to-heroku)
- [ToDo](#todo)
	- [HIGH (FIXME)](#high-fixme)
	- [MID (TODO)](#mid-todo)
	- [LOW (XXX)](#low-xxx)

<!-- /TOC -->

## Setup
### Local

```
$ yarn install
$ echo account_username=USERNAME > .env
$ echo account_password=PASSWORD >> .env
```

### Heroku

```
$ heroku plugins:install heroku-accounts
$ heroku accounts:add jmc && heroku accounts set jmc
$ heroku apps:create portato
$ heroku buildpacks:set heroku/nodejs
$ heroku buildpacks:add https://github.com/CoffeeAndCode/puppeteer-heroku-buildpack
$ heroku config:set account_username=USERNAME
$ heroku config:set account_password=PASSWORD
```

## Execute

```
$ node index.js
```

## Deploy to Heroku

```
$ git push heroku master
$ heroku open
```

## ToDo
### HIGH (FIXME)
- [ ] Send alert mail

### MID (TODO)
- [ ] Make data persistent via PostgreSQL
- [ ] Prepare CI

### LOW (XXX)
