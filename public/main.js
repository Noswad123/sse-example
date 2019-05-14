
const onMessage = (message) => {
  document.getElementById('emoji').innerHTML = message.data
}
const onUnload = () => {
  es.removeEventListener('message', onMessage)
  es.close()
}
const es = new EventSource('http://localhost:8080/sse')
es.addEventListener('message', onMessage)
// Workaround for "connection interrupted" bug in Firefox (https://bugzilla.mozilla.org/show_bug.cgi?id=712329)
window.addEventListener('beforeunload', onUnload, { once: true })
