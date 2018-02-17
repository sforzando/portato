portato
====

Mail quota system for JMC.

[![CircleCI](https://circleci.com/gh/sforzando/portato.svg?style=svg)](https://circleci.com/gh/sforzando/portato)

> Portato [porˈtaːto] (Italian, past participle of portare, "to carry"), French notes portées (Anon. n.d.), in music denotes a smooth, pulsing articulation and is often notated by adding dots under slur markings.

TOC
----

- [TOC](#toc)
- [Setup](#setup)
  - [Local](#local)
  - [Heroku](#heroku)
- [Execute](#execute)
- [Deploy to Heroku](#deploy-to-heroku)
- [ToDo](#todo)
  - [HIGH (FIXME)](#high-fixme)
  - [MID (TODO)](#mid-todo)
  - [LOW (XXX)](#low-xxx)

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
$ yarn start
```

## Deploy to Heroku

```
$ git push heroku master
$ heroku open
```

## ToDo
### HIGH (FIXME)
- [ ] Check quota
- [ ] Send alert mails

### MID (TODO)
- [ ] Make data persistent via PostgreSQL
- [ ] Show total usage

### LOW (XXX)
- [ ] Fix progress width and style
