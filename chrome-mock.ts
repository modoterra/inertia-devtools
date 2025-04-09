const mockDataPage = {
  component: 'Auth/Login',
  props: {
    errors: {},
    auth: {
      user: null
    },
    flash: {
      success: null,
      error: null
    }
  },
  url: '/login',
  version: 'b00b9c1be26a6c28d7b36b0a5820a8a3',
  encryptHistory: false,
  clearHistory: false
}

export const runtime = {
  onMessage: {
    addListener: (callback: (message: unknown) => void) => {
      callback({ action: 'INERTIA_DATA_PAGE_RESPONSE', dataPage: mockDataPage })
    }
  },
  sendMessage: (_: unknown) => {}
}
