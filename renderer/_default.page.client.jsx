export { render }

import { hydrateRoot } from 'react-dom/client'

// 🔥 Import global CSS
import '../src/index.css'
import '../src/App.css'

async function render(pageContext) {
  const { Page } = pageContext
  
  const container = document.getElementById('root')
  
  if (!container) {
    throw new Error('DOM element #root not found')
  }

  hydrateRoot(container, <Page />)
}