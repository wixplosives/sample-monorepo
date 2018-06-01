import * as React from 'react'
import { App } from 'app'
import { renderToString } from 'react-dom/server'
import { expect } from 'chai'

describe('app', () => {
    it('works', () => {
        const renderAppSSR = () => renderToString(<App text="It works" />)

        expect(renderAppSSR).to.not.throw()
        expect(renderAppSSR()).to.contain('It works')
    })
})
