These are various third-party libraries used in Basketball GM. They are all
standard, except for the following exceptions:

html2canvas.js has a change on lines 2818-2819 to fix background color always
being set to transparent.

IndexedDB-getAll-shim was altered to override the native getAll, because using
the native one in Safari in a Worker results in a hard crash and I'm not sure
how to do feature detection for that.
https://bugs.webkit.org/show_bug.cgi?id=172434 is the Safari bug.

Manually modified for CommonJS:
html2canvas.js