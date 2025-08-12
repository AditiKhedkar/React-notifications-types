// src/notifications.jsx
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import './notifications.css'
import { v4 as uuidv4 } from './uuid'

// Icons for each type
const icons = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
  warning: "⚠️",
  custom: "⭐"
}

const NotificationsContext = createContext(null)

export function NotificationsProvider({ children }) {
  const [items, setItems] = useState([])

  const remove = useCallback((id) => {
    setItems(s => s.filter(it => it.id !== id))
  }, [])

  const notify = useCallback((type, title, message, opts = {}) => {
    const id = uuidv4()
    const duration = opts.duration ?? 4000
    const position = opts.position ?? 'top-right'
    const action = opts.action ?? null // { label: 'Retry', onClick: () => {} }

    const item = { id, type, title, message, duration, position, action }
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
  const filteredItems = items.filter(it => it.position === position)

  return (
    <div className={`notifications-container ${position}`}>
      {filteredItems.map(item => (
        <div key={item.id} className={`notification ${item.type} animate`}>
          <div className="n-header">
            <span className="n-icon">{icons[item.type]}</span>
            <strong>{item.title}</strong>
            <button className="close" onClick={() => remove(item.id)}>✕</button>
          </div>
          <div className="n-body">{item.message}</div>
          {item.action && (
            <div className="n-action">
              <button onClick={item.action.onClick}>{item.action.label}</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
