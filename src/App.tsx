import './styles/App.scss'
import { Header } from './components/Header';
import { RecipeCardCollection } from './components/RecipeCardCollection';
import { ConfigMenu } from './components/ConfigMenu';
import { useState } from 'react';

function App() {
  const [debugMode, setDebugMode] = useState<boolean>(false);

  return (
    <>
      <Header />
      <ConfigMenu
        debugMode={debugMode}
        setDebugMode={setDebugMode}
      />
      <RecipeCardCollection
        debugMode={debugMode}
      />
    </>
  )
}

export default App
