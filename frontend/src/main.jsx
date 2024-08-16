import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RecoilRoot } from 'recoil'
// import { store } from './app/store'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import ThemeProvider from './Compnents/ThemeProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RecoilRoot>
      <ThemeProvider >
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </Provider>,
)
