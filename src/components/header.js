import routes from '../js/routes'

// привязка события клик на пункты меню в хедере
function bindToggleHeaderTemp(handlerUrl) {
  return (renderPage, contentNode, currenciesNames, exchangeRates, createHomePage, createCurrenciesListPage) => {
    const navbarItems = document.querySelectorAll('.navbar__item')
    navbarItems.forEach(item => {
      item.addEventListener('click', event => {
        handlerUrl(event)
        renderPage(contentNode, currenciesNames, exchangeRates, createHomePage, createCurrenciesListPage)
      })
    })
  }
}

const bindToggleHeader = bindToggleHeaderTemp(handlerUrl)

// сменить url при переходе на страницу
function handlerUrl(event) {
  event.preventDefault()
  history.pushState(null, null, event.target.href)
}

// создать массив с шаблонами пунктов меню
function createNavbarItems(routes) {
  const navbarItems = []
  for (let route in routes) {
    navbarItems.push(`
      <a href="${routes[route]['path']}" class="navbar__item">${routes[route]['title']}</a>
    `)
  }
  return navbarItems.join('')
}

// шаблон хедера
const Header = (routes) => (`
  <header class="header">
    <nav class="navbar">
      ${createNavbarItems(routes)}
    </nav>
  </header>
`)

const HeaderTemplate = Header(routes)




export {bindToggleHeader, HeaderTemplate}