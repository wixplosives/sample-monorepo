import { expect } from 'chai';
import { derivedValue } from '../src'

describe('package-b', () => {
    it('works', () => {
        expect(derivedValue).to.include('myValue=true')
    })
})
