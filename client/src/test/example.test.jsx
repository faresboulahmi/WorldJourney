import {describe , it , expect} from "vitest"


describe('Example Suite', () => {
    it('Should pass' , () => {
        const sum = 2 + 2
        expect(sum).toEqual(4)
    })
});
