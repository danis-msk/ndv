// создать страницу с курсами валют
function createCurrenciesListPage(CurrenciesListTemplate, createCurrenciesItems) {
  return (contentNode, exchangeRates) => {
    contentNode.innerHTML = ''
    contentNode.insertAdjacentHTML('beforeend', CurrenciesListTemplate(createCurrenciesItems(exchangeRates)))
  }
}

// создать массив шаблонов с пунктами списка курсов валют
function createCurrenciesItems(exchangeRates) {
  const currenciesItems = []
  for (let key in exchangeRates) {
    currenciesItems.push(`
      <div class="currencies-list__item">1 ${key} = ${exchangeRates[key]} RUB</div>
    `)
  }
  return currenciesItems.join('')
}

// шаблон для страницы с курсами валют
const CurrenciesListTemplate = (currenciesItems) => (`
  <h1 class="title">Курсы валют</h1>
  <div class="currencies-list">
    ${currenciesItems}
  </div>
`)

export default createCurrenciesListPage(CurrenciesListTemplate, createCurrenciesItems)