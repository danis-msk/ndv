// создание домашней страницы
function createHomePage(conversion, HomeTemplate, bindEventToInput) {
  return (contentNode, currenciesNames, exchangeRates) => {
    contentNode.innerHTML = ''
    contentNode.insertAdjacentHTML('beforeend', HomeTemplate(currenciesNames))
    bindEventToInput(conversion, exchangeRates)
  }
}

// привязка событий на input и select для конвертирования валют
function bindEventToInput(conversion, exchangeRates) {
  const inputResult = document.querySelector('.convert-block__amount')
  const toggleCurrency = document.querySelector('.convert-block__currencies')

  inputResult.addEventListener('input', () => {
    document.querySelector('.convert-block__result-value').innerText = conversion(inputResult, exchangeRates)
  })

  toggleCurrency.addEventListener('change', () => {
    document.querySelector('.convert-block__result-value').innerText = conversion(inputResult, exchangeRates)
  })
}

// функция конвертации
function conversion(inputResult, exchangeRates) {
  const amount = inputResult.value
  const selectCur = document.querySelector('.convert-block__currencies')
  const currency = selectCur.options[selectCur.selectedIndex].value
  const rate = exchangeRates[currency]
  return (amount * rate).toFixed(2)
}

// шаблон домашней страницы
const HomeTemplate = (currencies) => (`
  <h1 class="title">Конвертер валют</h1>
  <div class="convert-block">
    <div class="convert-block__item">
      <input type="number" class="convert-block__amount" placeholder="введите количество"/>
      <select class="convert-block__currencies">
        ${currencies.map(cur => `<option>${cur}</option>`).join('')}
      </select>
    </div>
  
    <div class="convert-block__item">
      <div class="convert-block__result">
        <span class="convert-block__result-value">0</span>
        <span class="convert-block__result-text">руб.</span>
      </div>
    </div>
  </div>
`)
  
export default createHomePage(conversion, HomeTemplate, bindEventToInput)