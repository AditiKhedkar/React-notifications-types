// Simple UUID generator for demo purposes
export function v4() {
  return 'xxxx-4xxx-yxxx-xxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
export default v4
