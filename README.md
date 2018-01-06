portato
====

Mail quota system for JMC.

> Portato [porˈtaːto] (Italian, past participle of portare, "to carry"), French notes portées (Anon. n.d.), in music denotes a smooth, pulsing articulation and is often notated by adding dots under slur markings.

TOC
----

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Setup](#setup)
	- [Local](#local)
	- [Heroku](#heroku)
- [Deploy](#deploy)
	- [Local](#local)
	- [Heroku](#heroku)

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

## Deploy
### Local

```
$ node index.js
```

### Heroku

```
$ git push heroku master
```

see. https://portato.herokuapp.com
