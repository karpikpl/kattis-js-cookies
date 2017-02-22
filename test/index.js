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

describe.only('linked list', function() {

    it('should grow', function() {

        // Arrange
        let linkedList = new Index.LinkedList;

        // Act
        linkedList.add(0);
        linkedList.add(1);
        linkedList.add(2);
        linkedList.add(3);

        // Assert
        assert.deepEqual(linkedList.toString(), '0,1,2,3');
    })
})
