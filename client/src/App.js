import {BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './components/Header'
import Popular from './components/Popular'
import Favorites from './components/Favorites'
import Movie from './components/Movie'
import SearchResults from './components/SearchResults'
import Footer from './components/Footer'

function App() {

  return (
    <Router>
      <Route path='/' exact render={(props) => (
        <>
        <div className="App">
          <Header />
          <Popular/>
          <Favorites/>
          <Footer/>
        </div>
        </>
      )}/>
      <Route path='/movie/:id' component={Movie}/>
      <Route path='/search' component={SearchResults}/>
    </Router>
  );
}

export default App;
