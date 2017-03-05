var formulajs = require('formulajs');
var XLSX_CALC = require('../');
var assert = require('assert');

describe('formulajs integration', function() {
    describe('import_functions', function() {
        it('imports the functions from formulajs', function() {
            XLSX_CALC.import_functions(formulajs);
            var workbook = {};
            workbook.Sheets = {};
            workbook.Sheets.Sheet1 = {};
            workbook.Sheets.Sheet1.A1 = {v: 2};
            workbook.Sheets.Sheet1.A2 = {v: 4};
            workbook.Sheets.Sheet1.A3 = {v: 8};
            workbook.Sheets.Sheet1.A4 = {v: 16};
            workbook.Sheets.Sheet1.A5 = {f: 'AVERAGEIF(A1:A4,">5")'};
            XLSX_CALC(workbook);
            assert.equal(workbook.Sheets.Sheet1.A5.v, 12);
        });
        it('imports the functions with dot names like BETA.DIST', function() {
            XLSX_CALC.import_functions(formulajs);
            var workbook = {};
            workbook.Sheets = {};
            workbook.Sheets.Sheet1 = {};
            workbook.Sheets.Sheet1.A5 = {f: 'BETA.DIST(2, 8, 10, true, 1, 3)'};
            XLSX_CALC(workbook);
            assert.equal(workbook.Sheets.Sheet1.A5.v.toFixed(10), (0.6854705810117458).toFixed(10));
        });
    });
});