/// <reference types="vite/client" />
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

declare global {
  interface Window {
    chrome: typeof chrome
  }
}

interface DataPageMessage {
  action: 'INERTIA_REQUEST_DATA_PAGE' | 'INERTIA_DATA_PAGE_RESPONSE'
  dataPage: AppState
}

export type Message = DataPageMessage

interface AppState {
  component?: string
  props?: Record<string, any>
  url?: string
  version?: string
  encryptHistory?: boolean
  clearHistory?: boolean
}

const App = () => {
  const [state, setState] = useState<AppState>({})

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message: Message) => {
      switch (message.action) {
        case 'INERTIA_DATA_PAGE_RESPONSE':
          setState({ ...state, ...message.dataPage })
          break
      }
    })
  }, [])

  useEffect(() => {
    chrome.runtime.sendMessage({
      action: 'INERTIA_REQUEST_DATA_PAGE'
    })
  }, [])

  return (
    <>
      <div className="overflow-none flex h-svh flex-col text-sm [&_*]:border-gray-200">
        <header className="flex h-12 flex-none items-center border-b px-4">
          <h1 className="text-lg font-medium">Inertia Developer Tools</h1>
        </header>
        <main className="flex h-[calc(100vh-var(--spacing)*12)]">
          <section className="w-80 flex-none flex-col border-r">
            <div className="h-full overflow-y-auto p-4">
              <dl className="[&>dd]:not-last:mb-4 [&>dt]:mb-1 [&>dt]:text-xs [&>dt]:font-semibold [&>dt]:text-slate-600">
                <dt>Component</dt>
                <dd>
                  <pre>{state.component}</pre>
                </dd>
                <dt>URL</dt>
                <dd>
                  <pre>{state.url}</pre>
                </dd>
                <dt>Encrypt History</dt>
                <dd>{state.encryptHistory ? 'Enabled' : 'Disabled'}</dd>
                <dt>Clear History</dt>
                <dd>{state.clearHistory ? 'Enabled' : 'Disabled'}</dd>
                {state.version && (
                  <>
                    <dt>Version</dt>
                    <dd>
                      <pre>{state.version}</pre>
                    </dd>
                  </>
                )}
              </dl>
            </div>
          </section>
          <section className="flex flex-1 flex-col">
            <div className="h-full overflow-y-auto">
              <h2 className="sticky top-0 border-b bg-gray-100 px-4 py-2 font-semibold">Props</h2>
              <pre className="p-4 text-xs">
                <code>{JSON.stringify(state.props, null, 2)}</code>
              </pre>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

const isInExtension = typeof chrome !== 'undefined' && chrome.runtime?.id !== undefined

if (!isInExtension && import.meta.env.DEV) {
  const chromeMock = await import('./chrome-mock.ts')
  window.chrome = chromeMock as unknown as typeof chrome
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
