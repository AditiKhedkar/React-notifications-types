import React from 'react'
import { useNotifications, NotificationsContainer } from './notifications'

export default function App() {
  const { notify } = useNotifications()

  return (
    <div className="app">
      <h1>React Notifications — Basic Demo</h1>
      <div className="buttons">
        <button onClick={() => notify('success', 'Operation completed', 'The task finished successfully.')}>Show Success</button>
        <button onClick={() => notify('error', 'Something went wrong', 'There was an error processing your request.')}>Show Error</button>
        <button onClick={() => notify('info', 'Heads up', 'This is an informational notification.')}>Show Info</button>
        <button onClick={() => notify('warning', 'Be careful', 'This action has potential side-effects.')}>Show Warning</button>
        <button onClick={() => notify('custom', 'Custom style', 'You can provide custom classes or content.', { duration: 8000 })}>Show Custom (8s)</button>
      </div>

      <p className="hint">Click any button — notifications appear at the top-right and auto-dismiss.</p>

      <NotificationsContainer position="top-right" />
    </div>
  )
}
