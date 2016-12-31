# ember-cli-all-in-one

A small Ember addon that replaces the following tags in `index.html`

```html
<link rel="stylesheet" href="{{rootURL}}assets/vendor.css">
<link rel="stylesheet" href="{{rootURL}}assets/dummy.css">

<!-- ... -->

<script src="{{rootURL}}assets/vendor.js"></script>
<script src="{{rootURL}}assets/dummy.js"></script>
```

with `<style>` and `<script>` tags that directly include the contents of the file above.

This reduces networks requests and the [above-the-fold](https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent) problem often reported by Google PageSpeed Insights.

Also, when no images are used (or replacing them with inline SVG or `data:` images) this addon reduces a entire Ember application to a single HTML file.

## Installation

`ember install ember-cli-all-in-one`

### Configuration

In the `ember-cli-build.js` file, please define a new `allInOne` section.

This section can contain one of the following sub-section:

* `css`: Settings applied to `assets/vendor.css` and `assets/$APP.css`
* `js`: Settings applied to `assets/vendor.js` and `assets/$APP.js`

Each settings can contain any of the following options:

* `enabled`: If to include this kind of files directly inside the `index.html` file. The default value is `true`.
* `preserveOriginal`: If not to delete the included file in the `dist` folder. The default value is `false`.
* `trackReplacements`: If add `data-original-source="$PATH"` to the replacement `<style>` and `<script>` tags. The default value is `true` if not in production environment.

## Contributing to ember-cli-all-in-one

* Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet.
* Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it.
* Fork the project.
* Start a feature/bugfix branch.
* Commit and push until you are happy with your contribution.
* Make sure to add tests for it. This is important so I don't break it in a future version unintentionally.

## Copyright

Copyright (C) 2016 and above Shogun <shogun@cowtech.it>.

Licensed under the MIT license, which can be found at http://opensource.org/licenses/MIT.