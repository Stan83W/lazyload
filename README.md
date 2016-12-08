# lazyload

v1.0.0 / 2016-12-07

Simple, no dependency, lazy loader. Swaps `data-src/data-srcset` on `img`, `source` and `iframes` to `src/srcset`. Adds a load listener and removes the `data-` attribute on load. If `data-srcset` to `srcset` and [picturefill](https://github.com/scottjehl/picturefill) is present, attempts to run picturefill on the element.

## Issues/Contributing/Discussion

If you find a bug in lazyload, please add it to [the issue tracker](https://github.com/13twelve/lazyload/issues) or fork it, fix it and submit a pull request for it (👍).

Tabs are 2 spaces, functions are commented, variables are camel case and its preferred that its easier to read than outright file size being the smallest possible.

## Filesize

* ~4kb uncompressed
* ~1kb minified
* ~1kb minified and gzipped

## Author

* [Mike Byrne](https://github.com/13twelve) - [@13twelve](https://twitter.com/13twelve)
