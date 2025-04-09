let inertiaApp: HTMLElement | null
const parser = new DOMParser()

function parseDataPage(dataPage: string) {
  const unescapedDataPage = parser.parseFromString(dataPage, 'text/html').body.textContent
  return JSON.parse(unescapedDataPage!)
}

chrome.runtime.onMessage.addListener(message => {
  switch (message.action) {
    case 'INERTIA_REQUEST_DATA_PAGE':
      const dataPage = inertiaApp?.dataset?.page

      if (!dataPage) {
        chrome.runtime.sendMessage({ action: 'INERTIA_NO_DATA_PAGE' })
        return
      }

      const parsedDataPage = parseDataPage(dataPage)

      chrome.runtime.sendMessage({ action: 'INERTIA_DATA_PAGE_RESPONSE', dataPage: parsedDataPage })
      break
  }
})

document.addEventListener('inertia:navigate', event => {
  const customEvent = event as CustomEvent
  chrome.runtime.sendMessage({ action: 'INERTIA_DATA_PAGE_RESPONSE', dataPage: customEvent.detail.page })
})

;(() => {
  inertiaApp = document.getElementById('app')

  if (!inertiaApp) {
    chrome.runtime.sendMessage({ action: 'INERTIA_NOT_INSTALLED' })
    return
  }

  const dataPage = inertiaApp.dataset?.page

  if (!dataPage) {
    chrome.runtime.sendMessage({ action: 'INERTIA_NO_DATA_PAGE' })
    return
  }

  const parsedDataPage = parseDataPage(dataPage)

  chrome.runtime.sendMessage({ action: 'INERTIA_DATA_PAGE_RESPONSE', dataPage: parsedDataPage })
})()
