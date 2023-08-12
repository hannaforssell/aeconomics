import './styles/App.scss'
import { Header } from './components/Header';
import { RecipeCardCollection } from './components/RecipeCardCollection';
import { ConfigMenu } from './components/ConfigMenu';
import { useState } from 'react';

function App() {
  const [useBestPath, setUseBestPath] = useState<boolean>(false);

  return (
    <>
      <Header />
      <ConfigMenu
        useBestPath={useBestPath}
        setUseBestPath={setUseBestPath}
      />
      <RecipeCardCollection
        useBestPath={useBestPath}
      />
    </>
  )
}

export default App
