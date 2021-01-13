import sendRequest from './fetch'
import routes from './routes'
import {bindToggleHeader, HeaderTemplate} from '../components/header'
import createHomePage from '../pages/home'
import createCurrenciesListPage from '../pages/currencies-list'

import '../scss/index.scss'

window.onload = () => {
  const root = document.querySelector('.root')
  const contentNode = document.querySelector('.content')
  const URLExchangeRates = 'https://www.cbr-xml-daily.ru/daily_json.js'
  root.insertAdjacentHTML('afterbegin', HeaderTemplate)
  
  sendRequest('GET', URLExchangeRates)
  .then(data => createApp(contentNode, data, createHomePage, createCurrenciesListPage, bindToggleHeader, renderPage))
  .catch(err => console.log(err))
}



function createApp(contentNode, data, createHomePage, createCurrenciesListPage, bindToggleHeader, renderPage) {
  
  const currenciesNames = Object.keys(data.Valute)
  const exchangeRates = {}

  for (let key in data.Valute) {
    exchangeRates[key] = data.Valute[key].Value
  }

  bindToggleHeader(renderPage, contentNode, currenciesNames, exchangeRates, createHomePage, createCurrenciesListPage)

  renderPage(contentNode, currenciesNames, exchangeRates, createHomePage, createCurrenciesListPage)
  
}


function renderPage(contentNode, currenciesNames, exchangeRates, createHomePage, createCurrenciesListPage) {
  for (let route in routes) {
    if (window.location.pathname === routes[route]['path'] && 
      route === 'HomePage') {
      createHomePage(contentNode, currenciesNames, exchangeRates)
    } else if (window.location.pathname === routes[route]['path'] && 
      route === 'CurrenciesListPage') {
      createCurrenciesListPage(contentNode, exchangeRates)
    }
  }
}