import React from 'react'
import ReactDOM from 'react-dom'
import MR from 'moonridge-client'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/lib/locale-data/en'
addLocaleData(en)
// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

let backend = MR({url: 'http://localhost:9000', hs: {query: 'email=god%40c8.com&password=111111'}})
let allModels = []
let selectedModel = null

backend.rpc('MR.getModels')().then(models => {
  console.log(models)
  models.forEach((model) => {
    allModels.push(backend.model(model))
  })
  console.log(allModels)
  selectedModel = allModels[6]
  let LQ = selectedModel.liveQuery().find({with: {type: 'advert'}}).exec()
  console.log(LQ)
})
backend.rpc.fetchNode('').then(value => {
  console.log(value)
})
ReactDOM.render((
  <IntlProvider locale='en'>
    <span>.model</span>
  </IntlProvider>
), document.getElementById('app'))
