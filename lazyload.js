/*! lazyload - v1.0.0 - 2016-12-07
 * https://github.com/13twelve/lazyload
 * Copyright (c) 2016
 * License: MIT
 * Author: Mike Byrne @13twelve https://github.com/13twelve
 */
(function (window, document) {

  // Kill exeuction for bad browsers
  if(typeof document.querySelectorAll === undefined || !('addEventListener' in window) || !window.requestAnimationFrame) {
    return;
  }

  // set up
  var maxFrameCount = 10; // 60fps / 10 = 6 times a second
  var frameCount;
  var els = [];
  var elsLength;

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
    this.removeEventListener('load', loaded, false);
    this.removeAttribute('data-src');
    this.removeAttribute('data-srcset');
  }

  /**
   * Loops images, checks if in viewport, updates src/src-set
   * @private
   */
  function setSrcs() {
    // debounce checking
    if (frameCount === maxFrameCount) {
      // update cache of this for the loop
      elsLength = els.length;
      var i;
      for (i = 0; i < elsLength; i++) {
        // check if this array item exists, hasn't been loaded already and is in the viewport
        if (els[i] && els[i].lazyloaded === undefined && elInViewport(els[i])) {
          // cache this array item
          var thisEl = els[i];
          // set this array item to be undefined to be cleaned up later
          els[i] = undefined;
          // give this element a property to stop us running twice on one thing
          thisEl.lazyloaded = true;
          // add an event listener to remove data- attributes on load
          thisEl.addEventListener('load', loaded, false);
          // if source set, update and try picturefill
          var srcset = thisEl.getAttribute('data-srcset');
          if (srcset) {
            thisEl.srcset = srcset;
            if (picturefill) {
              picturefill({
                elements: [ thisEl ]
              });
            }
          } else {
            thisEl.src = thisEl.getAttribute('data-src');
          }
        }
      }
      // clean up array
      for (i = 0; i < elsLength; i++) {
        if (els[i] === undefined) {
          els.splice(i, 1);
        }
      }
      // reset var to decide if to continue running
      elsLength = els.length;
      // will shortly be set to 0 to start counting
      frameCount = -1;
    }

    // run again? kill if not
    if (elsLength > 0) {
      frameCount++;
      window.requestAnimationFrame(setSrcs);
    }
  }

  /**
   * Remove dupes from array
   * @private
   * @param {Array} array to clean up
   * http://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items/28631880#answer-1584377
   */
  function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
        if(a[i] === a[j]) {
          a.splice(j--, 1);
        }
      }
    }
    return a;
  }

  /**
   * Inspect element
   * @public
   * @param {Node} element in which to look
   */
  function lazyload(container) {
    var context = container || document;
    var newEls = context.querySelectorAll('img[data-src], img[data-srcset], source[data-srcset], iframe[data-src]');
    newEls = Array.prototype.slice.call(newEls);
    els = arrayUnique(els.concat(newEls));
    elsLength = els.length;
    frameCount = maxFrameCount;
    setSrcs();
  }

  // make public
  window.lazyload = lazyload;

  // go go go!
  lazyload();

})(window, document);
