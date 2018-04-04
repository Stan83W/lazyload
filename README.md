# lazyload

v2.1.1 / 2018-04-01

Simple, tiny, no dependency, lazy loader. **[Demo](http://lazyload.dev.area17.com/)**

Doesn't preload, unload, mess with media queries, emit events, offer APIs etc.
Does periodically check all appropriate elements elements to see if they're in the viewport or not, using a throttled `requestAnimationFrame` loop.

When an element is in the view port it swaps `data-src/data-srcset` on `img`, `source` and `iframes` to `src/srcset`. It also adds a load listener and removes the `data-` attribute on load to allow you to hook styles up to the two different states.

It will also look for `data-lazyload` and swap that attribute for `data-lazyloaded`; again so you can hook up styles to the two different states.

If `data-srcset` to `srcset` and [picturefill](https://github.com/scottjehl/picturefill) is present, attempts to run picturefill on the element.

When it runs out of elements to watch, the loop ends.

Uses `IntersectionObserver` if available and if not, it uses `requestAnimationFrame` if available. If neither are available it does nothing.

## Setting up

In your HTML:

```HTML
<script src="/lazyload.js"></script>
```

In your JavaScript (on DOM ready):

```JavaScript
lazyLoad();
```

## Options

These options are the defaults, and can be overridden on init:

```JavaScript
var options = {
  pageUpdatedEventName: 'page:updated', // how your app tells the rest of the app an update happened
  elements: 'img[data-src], img[data-srcset], source[data-srcset], iframe[data-src], video[data-src], [data-lazyload]', // maybe you just want images?
  rootMargin: '0px', // IntersectionObserver option
  threshold: 0, // IntersectionObserver option
  maxFrameCount: 10, // 60fps / 10 = 6 times a second
};
lazyLoad(options);
```

`pageUpdatedEventName` - string - an event name to listen for when the page has new content that might need to be lazy loaded. If set to `false` lazyLoad will only run on initial page load.

`elements` - string - string of items to look to lazy load.

`rootMargin` - string - [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver) [rootMargin](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin) option.

`threshold` - integer/array - [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver) [threshold](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds) option.

`maxFrameCount` - integer - as `requestAnimationFrame` runs as the monitor refreshes, this could be 60 times a second, to throttle this we can tell the script every NUM of frames.

## Combating repaints

Its well advisable to give the images/picture/iframes an intrinsic size to stop huge repaints: Either by giving a pixel size and using a transparent gif:

```HTML
<img width="500" height="281" data-src="/images/greenflash_800.jpg" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">;
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

As of writing `IntersectionObserver` is supported in Edge, FireFox and Chrome: (caniuse.com/#search=IntersectionObserver)[https://caniuse.com/#search=IntersectionObserver]

If thats not supported, Safari 11 for example, lazyLoad checks for `document.querySelectorAll`, `('addEventListener' in window)`, `window.requestAnimationFrame` and `document.body.getBoundingClientRect`.

If they're not supported then this script isn't going to do anything. For these browsers, really old ones, you might want to look at [HTML4CSS](https://github.com/area17/html4css) and [legacypicturefill](https://github.com/area17/legacypicturefill) instead.


## Filesize

* ~7kb uncompressed
* ~2kb minified
* ~1kb minified and gzipped

## Author

* [Mike Byrne](https://github.com/13twelve) - [@13twelve](https://twitter.com/13twelve)
