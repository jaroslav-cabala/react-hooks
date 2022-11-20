// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {
  fetchPokemon,
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
} from '../pokemon'

const pokemonInfoState = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
}

function PokemonInfo({pokemonName}) {
  console.log('pokemon info component. PokemonName = ', pokemonName)
  const [state, setState] = React.useState({
    status: pokemonName ? pokemonInfoState.pending : pokemonInfoState.idle,
    pokemon: null,
    error: null,
  })

  React.useEffect(() => {
    if (!pokemonName) return

    console.log('fetching pokemon ', pokemonName)
    setState({status: pokemonInfoState.pending})

    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setState({status: pokemonInfoState.resolved, pokemon: pokemonData})
      })
      .catch(error => {
        setState({status: pokemonInfoState.rejected, error})
      })
  }, [pokemonName])

  if (state.status === pokemonInfoState.idle) {
    console.log('idle status')
    return 'Submit a pokemon'
  }
  if (state.status === pokemonInfoState.pending) {
    console.log('pending status')
    return <PokemonInfoFallback name={pokemonName}></PokemonInfoFallback>
  }
  if (state.status === pokemonInfoState.rejected) {
    console.log('rejected status')
    throw state.error
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
      </div>
    )
  }

  console.log('resolved status')
  return <PokemonDataView pokemon={state.pokemon}></PokemonDataView>
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setPokemonName('')}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
      {/* <div className="pokemon-info">
        <MyErrorBoundary key={pokemonName}>
          <PokemonInfo pokemonName={pokemonName} />
        </MyErrorBoundary>
      </div> */}
    </div>
  )
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

class MyErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false, error: null}
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true, error}
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      console.log('error boundary render error message, ', this.state.error)
      return <h1>Something went wrong.</h1>
    }

    console.log('error boundary render children')
    return this.props.children
  }
}

export default App
