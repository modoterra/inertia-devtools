import { Message } from './panel'

chrome.runtime.onInstalled.addListener(() => {})

chrome.runtime.onMessage.addListener((message: Message) => {
  switch (message.action) {
    case 'INERTIA_REQUEST_DATA_PAGE':
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'INERTIA_REQUEST_DATA_PAGE' })
        }
      })
  }
})
