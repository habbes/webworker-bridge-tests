console.log('worker loaded');

const appBridge = {
    writeOutput(msg) {
        postMessage({ 
            app: {
                writeOutput: [msg]
            }
        })
    }
};
onmessage = function (e) {
    console.log('worker job triggered');
    const execute = new Function('app', e.data.code);
    execute(appBridge);
};