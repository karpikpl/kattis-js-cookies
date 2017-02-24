/*jshint esversion: 6, node: true*/
'use strict';

// put your solution in this method
function solution(toPrint, toRead) {

    const startAll = new Date();
    let cookie;
    let progress = 0;
    const linkedList = new LinkedList();

    while (cookie = readline()) {

        progress++;

        if (progress % 50000 === 0) {
            log(`Processed ${progress} in ${new Date() - startAll}`);
        }

        if (cookie == '#') {

            const removed = linkedList.remove();
            print(removed);
            log(`out ${removed}`);
        } else {

            linkedList.add(parseInt(cookie));
        }
    }

    log(`Solved ALL in ${new Date() - startAll}`);
}

function LinkedList() {

    this.first = undefined;
    this.last = undefined;
    this.middle = undefined;
    this.count = 0;
    // index that starts from 1
    this.middleIndex = 0;

    this.add = (val) => {

        if (this.count === 0) {
            // add first
            this.first = new Node(val);
            this.last = this.first;
            this.middle = this.first;
            this.count = 1;
            this.middleIndex = 1;
            //log(`Added 1st element. Middle is ${this.middle.value} index: ${this.middleIndex}. List after: \n${this}`);
            return;
        }

        // add value so that the list is sorted
        if (val >= this.middle.value) {
            let n = this.middle;

            while (n && n.value <= val && n.next) {
                n = n.next;
            }

            // found the element to add to - need to figure it if it's before or after
            const added = val > n.value
                ? n.addNext(val)
                : n.addPrev(val);
            this.count++;
            //log(`Added value after middle ${this.middle.value} so moving index from ${this.middleIndex} to ${this.middleIndex-1}`);

            // need to move the end of the list
            if (!added.next) {
                // new last
                this.last = added;
            }

            // move middle
            if (this.middleIndex != Math.floor(this.count / 2 + 1)) {

                if (this.middleIndex < Math.floor(this.count / 2 + 1)) {
                    //log(`Moving middle right from ${this.middle.value} (I:${this.middleIndex}) to ${this.middle.next.value} (I:${this.middleIndex + 1})`);
                    this.middle = this.middle.next;
                    this.middleIndex++;
                } else {
                    //log(`Moving middle left from ${this.middle.value} (I:${this.middleIndex}) to ${this.middle.prev.value} (I:${this.middleIndex - 1})`);
                    this.middle = this.middle.prev;
                    this.middleIndex--;
                }
            }

            //log(`Middle is ${this.middle.value} at index ${this.middleIndex}. List is \n${this}`);
            return;
        }

        if (val < this.middle.value) {
            let n = this.middle;

            while (n && n.value > val && n.prev) {
                n = n.prev;
            }

            //log(`adding ${val} next to ${n.value}. List before: \n${this}`);
            // found the element to add to - need to figure it if it's before or after
            const added = val < n.value
                ? n.addPrev(val)
                : n.addNext(val);
            this.count++;

            //log(`Added value before middle ${this.middle.value} so moving index from ${this.middleIndex} to ${this.middleIndex+1}`);
            // need to move the index of the middle because an item was added before it
            this.middleIndex++;

            // need to move the beginning of the list
            if (!added.prev) {
                // new first
                this.first = added;
            }

            // move middle
            if (this.middleIndex != Math.floor(this.count / 2 + 1)) {

                if (this.middleIndex < Math.floor(this.count / 2 + 1)) {

                    //log(`Moving middle right from ${this.middle.value} (I:${this.middleIndex}) to ${this.middle.next.value} (I:${this.middleIndex + 1})`);
                    this.middle = this.middle.next;
                    this.middleIndex++;
                } else {
                    //log(`Moving middle left from ${this.middle.value} (I:${this.middleIndex}) to ${this.middle.prev.value} (I:${this.middleIndex - 1})`);
                    this.middle = this.middle.prev;
                    this.middleIndex--;
                }
            }

            //log(`Middle is ${this.middle.value} at index ${this.middleIndex}. List is \n${this}`);
            return;
        }
    }

    this.remove = () => {

        const middleVal = this.middle.value;

        if (this.middle.next) {
            // not last
            this.middle.next.prev = this.middle.prev;
        }

        if (this.middle.prev) {

            // not first
            this.middle.prev.next = this.middle.next;
        }

        this.count--;

        // move middle when index changes
        if (this.middleIndex != Math.floor(this.count / 2 + 1)) {

            if (this.middleIndex < Math.floor(this.count / 2 + 1)) {

                //log(`Moving middle right from ${this.middle.value} (I:${this.middleIndex}) to ${this.middle.next.value} (I:${this.middleIndex + 1})`);
                this.middle = this.middle.next;
                this.middleIndex++;
            } else {
                //log(`Moving middle left from ${this.middle.value} (I:${this.middleIndex}) to ${this.middle.prev.value} (I:${this.middleIndex - 1})`);
                this.middle = this.middle.prev;
                this.middleIndex--;
            }
        } else {
            this.middle = this.middle.next;
        }

        return middleVal;
    }

    this.toString = () => {
        let node = this.first;
        let stringRepresentation = '';

        while (node) {
            stringRepresentation += '\t' + node + "\n";
            node = node.next;
        }

        return stringRepresentation + '\tFULL LIST: ' + this.toArray();
    }

    this.toArray = () => {
        const array = [];
        let node = this.first;

        while (node) {
            array.push(node.value);
            node = node.next;
        }

        return array;
    }
}

function Node(val) {
    this.value = val;
    this.next = undefined;
    this.prev = undefined;

    this.addPrev = (val) => {

        let p = this.prev;
        const newNode = new Node(val);

        this.prev = newNode;
        newNode.prev = p;
        newNode.next = this;

        if (p) {
            p.next = newNode;
        }

        return this.prev;
    }

    this.addNext = (val) => {
        let n = this.next;
        const newNode = new Node(val);

        this.next = newNode;
        newNode.next = n;
        newNode.prev = this;

        if (n) {
            n.prev = newNode;
        }

        return this.next;
    }

    this.toString = () => `${this.prev && this.prev.value} -> [${this.value}] -> ${this.next && this.next.value}`;
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

    const inputProcessor = Readline.createInterface({input: process.stdin, output: process.stdout});

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
    module.exports.LinkedList = LinkedList;
}
