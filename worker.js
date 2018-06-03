console.log('worker loaded');

const workerPort = {
    app: {
        writeOutput(msg) {
            postMessage({ 
                app: {
                    writeOutput: [msg]
                }
            });
        }
    }
};

onmessage = function (e) {
    console.log('worker job triggered');
    const execute = new Function('app', e.data.code);
    // expose the worker port as the app variable in the user code
    execute(workerPort.app);
    close();
};
