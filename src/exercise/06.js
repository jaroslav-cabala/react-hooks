// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
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
  const [pokemon, setPokemon] = React.useState(null)
  const [state, setState] = React.useState(pokemonInfoState.idle)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    setPokemon(null)
    setState(pokemonInfoState.pending)
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        console.log('promise then callback')
        setPokemon(pokemonData)
        setState(pokemonInfoState.resolved)
      })
      .catch(error => {
        setError(error)
        setState(pokemonInfoState.rejected)
      })
  }, [pokemonName])

  if (state === pokemonInfoState.rejected) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }
  if (state === pokemonInfoState.idle) {
    return 'Submit a pokemon'
  }
  if (state === pokemonInfoState.pending) {
    return <PokemonInfoFallback name={pokemonName}></PokemonInfoFallback>
  }
  return <PokemonDataView pokemon={pokemon}></PokemonDataView>
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
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
