/*jshint esversion: 6, node: true*/
'use strict';

// put your solution in this method
function solution(toPrint, toRead) {

    const startAll = new Date();
    let input;
    let cookies = [];
    let sorted = true;

    while (input = readline()) {

        if (input == '#') {
            // cookie out;
            // odd - (c+1)/2
            // even - (c/2)+1
            if (!sorted) {
                cookies = cookies.sort();
                sorted = true;
                log(`not sorted - sorting... ${cookies}`);
            }

            if (cookies.length % 2 === 0) {
                const index = cookies.length / 2 + 1 - 1;
                const cookie = cookies.splice(index, 1)[0];
                print(cookie);
                log(`out ${cookie} from index [${index}] - cookies after: ${cookies}`)
            } else {
                const index = (cookies.length + 1) / 2 - 1;
                const cookie = cookies.splice(index, 1)[0];
                print(cookie);
                log(`out ${cookie} from index [${index}] - cookies after: ${cookies}`)
            }

        } else {
            cookies.push(parseInt(input));
            sorted = false;
            log(cookies);
        }
    }

    log(`Solved ALL in ${new Date() - startAll}`);
}

// run solution without any params for kattis
if (typeof process === 'undefined' || process.release.name !== 'node') {

    solution();
}

// node js internals below -----------------------------------------------------

function init(toPrint, toRead) {

    // replace global functions with ones for node or tests
    // kattis is using 'print' and 'readline' for standard I/O
    if (typeof global !== 'undefined') {
        global.print = toPrint;
        global.readline = toRead;
    }
}

// interactive mode - input from command line
if (typeof process !== 'undefined' && process.argv[2] === 'i') {

    const Readline = require('readline');
    const input = [];

    const inputProcessor = Readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    inputProcessor.on('line', (line) => {

        input.push(line);

        if (!line) {
            inputProcessor.close();
        }
    });

    inputProcessor.on('close', () => {

        init(console.log, () => input.shift());

        solution();
    });
}

// input from process params
if (typeof process !== 'undefined' && process.argv[2] && process.argv[2] !== 'i') {

    const input = process.argv[2].split('\\n');
    init(console.log, () => input.shift());

    solution();
}

function log() {

    if (typeof process !== 'undefined' && process.release.name === 'node') {
        console.log.call(this, ...arguments);
    }
}

if (typeof module !== 'undefined') {
    module.exports.solution = solution;
    module.exports.init = init;
}
