/*jshint esversion: 6, node: true*/
'use strict';

const Index = require('../index');
const assert = require('assert');

function testSolution(input) {

    const max = 600000;
    const result = new Array(max);
    let current = 0;

    Index.init((ans) => result.push(ans), () => {
        return input[current++];
    });
    Index.solution();

    return result;
}

describe('Solution', function() {

    describe('program', function() {

        [{
            input: [
                '1',
                '2',
                '3',
                '4',
                '#',
                '#',
                '#',
                '#'
            ],
            result: [
                '3',
                '2',
                '4',
                '1'
            ]
        }, {
            input: [
                '1',
                '#',
                '2',
                '#',
                '3',
                '#',
                '4',
                '#'
            ],
            result: [
                '1',
                '2',
                '3',
                '4'
            ]
        }].forEach((testCase) => {

            it('should solve for ' + testCase.input, function() {

                // Arrange
                const input = testCase.input;

                // Act
                const result = testSolution(input);

                // Assert
                assert.deepEqual(result, testCase.result);
            });

        })

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        it.skip('should solve for large input', function() {

            // Arrange
            const input = [];

            for (let i = 0; i < 200000; i++) {
                input.push(getRandomInt(0, 30000000000));
            }
            for (let i = 0; i < 100000; i++) {
                input.push(getRandomInt(0, 30000000000));
                input.push('#');
            }
            for (let i = 0; i < 200000; i++) {
                input.push('#');
            }

            console.log(`${input.length} test items ready`);

            // Act
            const result = testSolution(input);

            // Assert
            assert('ok');
        });
    });
});

describe('linked list tests', function() {

    it('should grow for 0,1,2,3', function() {

        // Arrange
        let linkedList = new Index.LinkedList;

        // Act
        linkedList.add(0);
        linkedList.add(1);
        linkedList.add(2);
        linkedList.add(3);

        // Assert
        assert.deepEqual(linkedList.toArray(), [0,1,2,3]);
    })

    it('should grow for 3,2,1,0', function() {

        // Arrange
        let linkedList = new Index.LinkedList;

        // Act
        linkedList.add(3);
        linkedList.add(2);
        linkedList.add(1);
        linkedList.add(0);

        // Assert
        assert.deepEqual(linkedList.toArray(), [0,1,2,3]);
    })

    it('should grow for 2,1,3', function() {

        // Arrange
        let linkedList = new Index.LinkedList;

        // Act
        linkedList.add(2);
        linkedList.add(1);
        linkedList.add(3);

        // Assert
        assert.deepEqual(linkedList.toArray(), [1,2,3]);
    })

    it('should grow for 1,2,7,5', function() {

        // Arrange
        let linkedList = new Index.LinkedList;

        // Act
        linkedList.add(2);
        linkedList.add(1);
        linkedList.add(7);
        linkedList.add(5);

        // Assert
        assert.deepEqual(linkedList.toArray(), [1,2,5,7]);
    })

    it('should grow for 0,1,2,5,6,6,6,7,9,9', function() {

        // Arrange
        let linkedList = new Index.LinkedList;

        // Act
        linkedList.add(2);
        linkedList.add(1);
        linkedList.add(7);
        linkedList.add(5);
        linkedList.add(6);
        linkedList.add(6);
        linkedList.add(6);
        linkedList.add(0);
        linkedList.add(9);
        linkedList.add(9);

        // Assert
        assert.deepEqual(linkedList.toArray(), [0,1,2,5,6,6,6,7,9,9]);
    })

    it.only('should remove middle from 1,2,7,5', function() {

        // Arrange
        let linkedList = new Index.LinkedList;

        // Act
        linkedList.add(2);
        linkedList.add(1);
        linkedList.add(7);
        linkedList.add(5);
        const poped = linkedList.remove();

        // Assert
        assert.equal(poped, 5);
        assert.equal(linkedList.middle.value, 2, 'middle should be moved to 2');
        assert.deepEqual(linkedList.toArray(), [1,2,7]);
    })

    it.only('should remove middle from 1,2,7,5', function() {

        // Arrange
        let linkedList = new Index.LinkedList;

        // Act
        linkedList.add(2);
        linkedList.add(1);
        linkedList.add(7);
        linkedList.add(5);
        console.log(`before: ${linkedList}`);
        const poped1 = linkedList.remove();
        console.log(`after removal of ${poped1} middle is:${linkedList.middle}: \n${linkedList}`);
        const poped2 = linkedList.remove();
        console.log(`after removal of ${poped2} middle is:${linkedList.middle}: \n${linkedList}`);

        // Assert
        assert.equal(poped1, 5);
        assert.equal(poped2, 2);
        assert.equal(linkedList.middle.value, 7, 'middle should be moved to 7');
        assert.deepEqual(linkedList.toArray(), [1,7]);
    })
});
