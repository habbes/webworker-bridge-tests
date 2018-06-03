# Web Worker Bridge Test

This is an experiment for exploring the possibilities of calling functions on objects and dom elements in the host page from a web worker.

You can only pass a limited range of object types to a web worker via `postMessage()`. You cannot pass functions or dom elements.
The purpose of this experiment is to find a way around this in order to arrive at an architecture that can work in Xaval, so
that Xaval can execute code in web workers while still allowing the user to access the standard apis through code (i.e. widgets, imageViewer, imageSource, etc.)

This simple implementation creates a bridge between corresponding pairs of "ports", one of each pair lives in the host,
an the other in the worker. When a function on the worker port is called, it passes data regarding which object/method
was called, as well as the arguments to the host via `postMessage`. On the host, the bridge intercepts this call and
proxies it to the corresponding port on the host. The host port finally calls the intended object method on the host.
This is in someways analogues to "remote" procedure calls, but between a web worker and its host.

I've not fully explored the viability of this approach, but I can already think of some limitations. The worker port
can only pass as arguments to the bridge the subset of objects that are permitted by `postMessage`.