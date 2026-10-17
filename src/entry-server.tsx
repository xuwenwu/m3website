import { renderToString } from 'react-dom/server'
import App from './App'

export function render(pathname: string, staticMode = false) {
  return renderToString(<App initialPath={pathname} staticMode={staticMode} />)
}
