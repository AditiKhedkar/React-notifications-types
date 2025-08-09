import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import './notifications.css'
import { v4 as uuidv4 } from './uuid'

const NotificationsContext = createContext(null)

export function NotificationsProvider({ children }) {
  const [items, setItems] = useState([])

  const remove = useCallback((id) => {
    setItems(s => s.filter(it => it.id !== id))
  }, [])

  const notify = useCallback((type, title, message, opts = {}) => {
    const id = uuidv4()
    const duration = opts.duration ?? 4000
    const item = { id, type, title, message, duration }
    setItems(s => [item, ...s])

    if (duration > 0) {
      setTimeout(() => remove(id), duration)
    }
    return id
  }, [remove])

  const value = useMemo(() => ({ items, notify, remove }), [items, notify, remove])

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationsProvider')
  return ctx
}

export function NotificationsContainer({ position = 'top-right' }) {
  const { items, remove } = useNotifications()
  return (
    <div className={`notifications-container ${position}`}>
      {items.map(item => (
        <div key={item.id} className={`notification ${item.type}`}>
          <div className="n-header">
            <strong>{item.title}</strong>
            <button className="close" onClick={() => remove(item.id)}>✕</button>
          </div>
          <div className="n-body">{item.message}</div>
        </div>
      ))}
    </div>
  )
}
