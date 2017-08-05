![mr-jums logo](https://cloud.githubusercontent.com/assets/1221346/18084759/6d28b41c-6ee3-11e6-8f62-5eb0d8f673c0.png)

mr-jums is a html generator for bbn: blog.bouzuya.net using Cycle.js

## Development

### Run debugger & watcher

```
$ yarn
$ npm run watch
$ # VS Code "Debug: Start Debugging" (F5)
```

### Run docker image in local

```
$ # or docker pull registry.heroku.com/mr-jums/web
$ docker build -t registry.heroku.com/mr-jums/web .
$ docker push registry.heroku.com/mr-jums/web
```

### URLs

- `/`                          ... entry list (latest)
- `/{yyyy}/{mm}/{dd}/`         ... entry detail
- `/{yyyy}/{mm}/{dd}/related/` ... entry list ()

## Badges

[![Travis CI][travisci-badge-url]][travisci-url]

[travisci-badge-url]: https://travis-ci.org/bouzuya/mr-jums.svg
[travisci-url]: https://travis-ci.org/bouzuya/mr-jums

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][email]&gt; ([http://bouzuya.net][url])

[user]: https://github.com/bouzuya
[email]: mailto:m@bouzuya.net
[url]: http://bouzuya.net
