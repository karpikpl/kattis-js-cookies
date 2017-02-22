/*jshint esversion: 6, node: true*/
'use strict';

// put your solution in this method
function solution(toPrint, toRead) {

    const startAll = new Date();
    let input;
    let cookies = [];
    let sorted = true;
    let waitlist = [];
    let progress = 0;

    while (input = readline()) {

        progress++;

        if (progress % 50000 === 0) {
            console.log(`Processed ${progress} in ${new Date() - startAll}`);
        }

        if (input == '#') {

            // cookie out;
            // odd - (c+1)/2
            // even - (c/2)+1
            // if (!sorted) {
            //     cookies = cookies.sort();
            //     sorted = true;
            //     log(`not sorted - sorting... ${cookies}`);
            // }
            if (waitlist.length > 0) {
                if (waitlist.length > cookies.length) {
                    cookies = cookies.concat(waitlist);
                    log('sorting');
                    waitlist = [];
                    cookies = cookies.sort();
                } else {
                    waitlist.forEach(c => {
                        binaryInsert(c, cookies);
                    })
                    waitlist = [];
                }
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

            const cookie = input;

            // if (cookies.length === 0 || cookie >= cookies[cookies.length - 1]) {
            //     cookies.push(input);
            // }
            // else
            {
                log('adding to waitlist...');
                const cookie = input;

                if (cookies.length === 0) {
                    cookies.push(cookie);
                } else {
                    waitlist.push(cookie);
                }

                //binaryInsert(cookie, cookies);
            }

            sorted = true;
            //log(cookies);
        }
    }

    console.log(`Solved ALL in ${new Date() - startAll}`);
}

function binaryInsert(value, array, startVal, endVal) {

    var length = array.length;
    var start = typeof(startVal) != 'undefined' ? startVal : 0;
    var end = typeof(endVal) != 'undefined' ? endVal : length - 1; //!! endVal could be 0 don't use || syntax
    var m = start + Math.floor((end - start) / 2);

    if (length == 0) {
        array.push(value);
        return;
    }

    if (value >= array[end]) {
        array.splice(end + 1, 0, value);
        return;
    }

    if (value <= array[start]) { //!!
        array.splice(start, 0, value);
        return;
    }

    if (start >= end) {
        return;
    }

    if (value < array[m]) {
        binaryInsert(value, array, start, m - 1);
        return;
    }

    if (value > array[m]) {
        binaryInsert(value, array, m + 1, end);
        return;
    }

    //we don't insert duplicates
}

function LinkedList() {

    this.first = undefined;
    this.last = undefined;
    this.middle = undefined;
    this.count = 0;

    this.add = (val) => {

        if (this.count === 0) {
            // add first
            this.first = new Node(val);
            this.last = this.first;
            this.middle = this.first;
            this.count = 1;
            return;
        }

        // add value so that the list is sorted
        if (val >= this.middle.value) {
            let n = this.middle;

            while (n && n.value <= val) {
                n = n.next;
            }

            const added = n.prev.addNext(val);
            this.count++;
            this.middle = this.middle.next;

            if (!added.next) {
                // new last
                this.last = added;
            }
            return;
        }

        if (val < this.middle.value) {
            let n = this.middle;

            while (n && n.value > val) {
                n = n.prev;
            }

            const added = n.next.addPrev(val);
            this.count++;
            this.middle = this.middle.prev;

            if (!added.prev) {
                // new first
                this.first = added;
            }

            return;
        }
    }


    this.remove = () => {
        if (!this.middle.next) {
            // last
            this.middle.next.prev = this.middle.prev;
        }

        if (!this.middle.prev) {
            this.middle.prev.next = this.middle.next;
        }

        this.middle = this.middle.next;
    }

    this.toString = () => {
        const array = [];
        let node = this.first;

        while (node) {
            array.push(node.value);
            node = node.next;
        }

        return array.toString();
    }
}

function Node(val) {
    this.value = val;
    this.next = undefined;
    this.prev = undefined;

    this.addPrev = (val) => {
        let p = this.prev;
        this.prev = new Node(val);
        this.prev.prev = p;
        this.prev.next = this;

        return this.prev;
    }

    this.addNext = (val) => {
        let n = this.next;
        this.next = new Node(val);
        this.next.next = n;
        this.next.prev = this;

        return this.next;
    }
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
        //console.log.call(this, ...arguments);
    }
}

if (typeof module !== 'undefined') {
    module.exports.solution = solution;
    module.exports.init = init;
    module.exports.LinkedList = LinkedList;
}
