"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const string_1 = require("./string");
describe('string helpers', () => {
    it('setCharacterCase', () => {
        // Standard
        assert.strictEqual(string_1.setCharacterCase('', 0, 'lower'), '');
        assert.strictEqual(string_1.setCharacterCase('A', 0, 'lower'), 'a');
        assert.strictEqual(string_1.setCharacterCase('a', 0, 'lower'), 'a');
        assert.strictEqual(string_1.setCharacterCase('a', 0, 'upper'), 'A');
        // Non-alphabets
        assert.strictEqual(string_1.setCharacterCase('_', 0, 'upper'), '_');
        assert.strictEqual(string_1.setCharacterCase('_', 0, 'lower'), '_');
        // Unicode
        assert.strictEqual(string_1.setCharacterCase('Γ€', 0, 'upper'), 'Γ');
        assert.strictEqual(string_1.setCharacterCase('Γ', 0, 'lower'), 'ΓΆ');
        assert.strictEqual(string_1.setCharacterCase('π©', 0, 'upper'), 'π©');
        assert.strictEqual(string_1.setCharacterCase('π©', 0, 'lower'), 'π©');
        // Words
        assert.strictEqual(string_1.setCharacterCase('fooBar', 0, 'lower'), 'fooBar');
        assert.strictEqual(string_1.setCharacterCase('fooBar', 0, 'upper'), 'FooBar');
    });
});
//# sourceMappingURL=string.spec copy.js.map