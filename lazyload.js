/*! lazyload - v1.0.0 - 2016-12-07
 * https://github.com/13twelve/lazyload
 * Copyright (c) 2016
 * License: MIT
 * Author: Mike Byrne @13twelve https://github.com/13twelve
 */
(function (window, document) {
  // set up
  var els = document.querySelectorAll('img[data-src], img[data-srcset], source[data-srcset], iframe[data-src]');
  var elsLength = els.length;
  var elLoaders = [];
  var elsLoaded = 0;

  /**
   * Checks if an element is in the viewport
   * @private
   * @param {Node} element to check.
   * @returns {Boolean} true/false.
   */
  function elInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight));
  }

  /**
   * On loaded, removes event listener, removes data- attributes
   * @private
   */
  function loaded() {
    els[this.index].removeEventListener('load',setSrc,false);
    els[this.index].removeAttribute('data-src');
    els[this.index].removeAttribute('data-srcset');
  }

  /**
   * Loops images, checks if in viewport, updates src/src-set
   * @private
   */
  function setSrcs() {
    for (var i = 0; i < elsLength; i++) {

      if (els[i].index === undefined && elInViewport(els[i])) {

        els[i].index = i;
        els[i].addEventListener('load',setSrc,false);

        var srcset = els[i].getAttribute('data-srcset');

        if (srcset) {
          els[i].srcset = loaded;

          if (picturefill) {
            picturefill({
              elements: [ els[i] ]
            });
          }

        } else {
          els[i].src = els[i].getAttribute('data-src');
        }

        elsLoaded++;
      }
    }
    if (elsLoaded < elsLength) {
      window.requestAnimationFrame(setSrcs);
    }
  }

  // go go go
  window.requestAnimationFrame(setSrcs);

})(window, document);
