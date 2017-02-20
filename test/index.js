/*jshint esversion: 6, node: true*/
'use strict';

const Index = require('../index');
const assert = require('assert');

function testSolution(input) {

    const result = [];

    Index.init((ans) => result.push(ans), () => input.shift());
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
        },{
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
    });
});
