# Web Worker Bridge Test

This is an experiment for exploring the possibilities of calling functions on objects and dom elements in the host page from a web worker.

You can only pass cloneable objects to a web worker via `postMessage()`, this means you cannot pass functions or dom elements.
The purpose of this experiment is to find a way around this in order to arrive at an architecture that can work in Xaval, so
that Xaval can execute code in web workers while still allowing the user to access the standard apis through code (i.e. widgets, imageViewer, imageSource, etc.)