// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name() {
  // const [name, setName] = React.useState('')

  return (
    <div>
      <label htmlFor="name">Name: </label>
      {/* <input id="name" value={name} onChange={event => setName(event.target.value)} /> */}
      <input id="name"></input>
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={onAnimalChange}
      />
    </div>
  )
}

// function Display({name, animal}) {
//   return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
// }

// bonus
function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

// function App() {
//   // 🐨 add a useState for the animal
//   const [name, setName] = React.useState('')
//   const [animal, setAnimal] = React.useState('')
//   return (
//     <form>
//       <Name name={name} onNameChange={event => setName(event.target.value)} />
//       {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
//       <FavoriteAnimal animal={animal} onAnimalChange={event => setAnimal(event.target.value)} />
//       {/* 🐨 pass the animal prop here */}
//       <Display name={name} animal={animal} />
//     </form>
//   )
// }

// bonus
function App() {
  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      <Name/>
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal animal={animal} onAnimalChange={event => setAnimal(event.target.value)} />
      {/* 🐨 pass the animal prop here */}
      <Display animal={animal} />
    </form>
  )
}

export default App
