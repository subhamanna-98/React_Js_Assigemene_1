
// import { RouterProvider, } from 'react-router-dom'
import './App.css'
import JokeGenerator from './componantes/JokeGenerator'
import WeatherComponantes from './componantes/WeatherComponantes'
import STOPEWATCH from './componantes/STOPEWATCH'
import TODOlist from './componantes/TODOlist'
// import Routes from './routes/Routes'

function App() {
 

  return (
   <>
   <main>
  <TODOlist/>
   </main>
   <main>
    <STOPEWATCH/>
   </main>
  
    {/* <RouterProvider router={Routes}/> */}
   <WeatherComponantes/>
   <JokeGenerator/>
   </>
  )
}

export default App
