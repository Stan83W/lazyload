# lazyload

v1.0.0 / 2016-12-07

Simple, tiny, no dependency, lazy loader. **[Demo](http://lazyload.dev.area17.com/)**

Doesn't preload, unload, mess with media queries, emit events, offer APIs etc.
Does periodically check all appropriate elements elements to see if they're in the viewport or not using a throttled `requestAnimationFrame` loop.

When an element is in the view port it swaps `data-src/data-srcset` on `img`, `source` and `iframes` to `src/srcset`. It also adds a load listener and removes the `data-` attribute on load to allow you to hook styles up to the two different states.

If `data-srcset` to `srcset` and [picturefill](https://github.com/scottjehl/picturefill) is present, attempts to run picturefill on the element.

When it runs out of elements to watch, the loop ends.

## Dynamic Content

lazyload exposes `lazyload` globally. By default it checks the DOM for appropriate elements and begins checking those. If you load more content dynamically, you can call:

```JavaScript
lazyload();
```

Or with a specific DOM node to look into:

```JavaScript
lazyload(node);
```

It assumes the `document` if no `node` is specified. It won't check the same element more than once per iteration so no need to worry about duplicates.

This restarts the loop checking on things.

## Combating repaints

Its well advisable to give the images/picture/iframes an intrinsic size to stop huge repaints: Either by giving a pixel size and using a transparent gif:

```HTML
&lt;img width="500" height="281" data-src="/images/greenflash_800.jpg" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="&gt;
```

Or using the padding trick:

```CSS
.img-container {
  position: relative;
  height: 0;
  padding-bottom: 56.25%; // for 16:9 images
}

.img-container img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## Issues/Contributing/Discussion

If you find a bug in lazyload, please add it to [the issue tracker](https://github.com/area17/lazyload/issues) or fork it, fix it and submit a pull request for it (👍).

Tabs are 2 spaces, functions are commented, variables are camel case and its preferred that its easier to read than outright file size being the smallest possible.

## Support

*IE11, recent Chrome, recent FireFox, recent Safari, recent Android - needs testing*

For unsupported browsers, really old ones, you might want to look at [HTML4CSS](https://github.com/area17/html4css) and [legacypicturefill](https://github.com/area17/legacypicturefill) instead.


## Filesize

* ~4kb uncompressed
* ~1kb minified
* ~1kb minified and gzipped

## Author

* [Mike Byrne](https://github.com/13twelve) - [@13twelve](https://twitter.com/13twelve)
