import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <h1>finnb.co.uk</h1>
      <p>Your site is live. Edit <code>src/App.jsx</code> to get started.</p>
      <button onClick={() => setCount((c) => c + 1)}>
        Clicked {count} times
      </button>
    </main>
  )
}

export default App
