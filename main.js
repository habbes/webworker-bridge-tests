const app = {
    _output: document.getElementById('output'),
    writeOutput (msg) {
        this._output.textContent = `${this._output.textContent}${msg}\n`;
    }
};

const hostPort = {
    __module: true,
    app: {
        __module: true,
        writeOutput: (args) => {
            app.writeOutput(...args);
        }
    }
};

const bridge = {
    execute (hostPort, workerPort) {
        for (module in workerPort) {
            if (module in hostPort) {
                const host = hostPort[module];
                const worker = workerPort[module];
                if (host.__module) {
                    // sub module
                    this.execute(host, worker)
                }
                else {
                    // function
                    host(worker);
                }
            }
        };
    }
};

function getCode () {
    return document.getElementById('editor').value;
}

function runCode () {
    const worker = new Worker('worker.js');
    worker.postMessage({ code: getCode() });
    worker.onmessage = e => {
        bridge.execute(hostPort, e.data);
    };
}

document.getElementById('runBtn').onclick = runCode;
