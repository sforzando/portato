# portato

[![CI](https://github.com/sforzando/portato/actions/workflows/ci.yml/badge.svg)](https://github.com/sforzando/portato/actions/workflows/ci.yml)

Mail quota system for JMC.

> Portato [porˈtaːto] (Italian, past participle of portare, "to carry"), French notes portées (Anon. n.d.), in music denotes a smooth, pulsing articulation and is often notated by adding dots under slur markings.

![screenshot_portato_20181119](https://user-images.githubusercontent.com/32637762/48684910-4745b400-ebf7-11e8-88c1-2f9a164d9d4f.png)

## How to

```shell
$ make help
setup                初回
start                起動
open                 閲覧
hide                 秘匿
reveal               暴露
test                 試験
clean                掃除
prune                破滅
help                 助言
```

### Setup

#### Local

It needs to store the information to log in to Zenlogic as `account_username` / `account_password`.
If you use PostgreSQL on Heroku, it needs `DATABASE_URL`, too.

```shell
npm install
make reveal
```

#### Heroku

On MacOS,

```shell
brew tap heroku/brew && brew install heroku
```

##### Initialize

```shell
heroku apps:create portato
heroku buildpacks:set heroku/nodejs
heroku buildpacks:add https://github.com/CoffeeAndCode/puppeteer-heroku-buildpack
heroku addons:create heroku-postgresql:hobby-dev
heroku config:add TZ=Asia/Tokyo
heroku config:set account_username=USERNAME
heroku config:set account_password=PASSWORD
```

##### Setup

```shell
heroku login
git remote add heroku https://git.heroku.com/portato.git
```

### Execute

```shell
npm start
```

Then `http://0.0.0.0:3000/` will wait your access.

### Deploy to Heroku

```shell
git push heroku master
heroku open
```

### ToDo

#### HIGH (FIXME)

- [ ] Check quota

#### MID (TODO)

- [ ] Send alert mail

#### LOW (XXX)

- [ ] Make data persistent via PostgreSQL

### Misc

T. B. D.
