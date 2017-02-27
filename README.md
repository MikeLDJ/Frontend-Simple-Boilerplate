# Frontend-Simple-Boilerplate

***

### Include:

- gulp
- browsersync
- scss
- html partials
- autoprefixer
- cssnano
- uglify
- reset CSS

***
### Directory structure:

```
./
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── _home.html
│   │   │   ├── _header.html
│   │   │   └── _footer.html
│   │   └── stylesheet/
│   │       ├── base/
│   │       │   ├── _base.scss
│   │       │   └── _typography.scss
│   │       ├── layout/
│   │       │   ├── _home.scss
│   │       │   ├── _header.scss
│   │       │   └── _footer.scss
│   │       ├── modules/
│   │       │   ├── _button.scss
│   │       │   └── _form.scss
│   │       ├── tools/
│   │       │   ├── _helpers.scss
│   │       │   ├── _media-queries.scss
│   │       │   ├── _mixins.scss
│   │       │   └── _reset.scss
│   │       │   └── _variables.scss
│   │       └── main.scss
│   ├── css/
│   ├── fonts/
│   ├── images/
│   ├── js/
│   └── index.html
│
├── dev/
└── prod/
```

***
### Require:

- NodeJS

- gulp
```
npm install -g gulp
```
or
```
sudo npm install -g gulp
```

***
### Install:

```
npm install
```

***
## Use:

### development:

```
gulp serve
```

open browser on ```localhost:3000```

files goes to ```dev``` directiory

### production:

```
gulp
```

files in ```prod``` directory
