import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { MovieDetail } from './components/MovieDetail';
import  Search  from './components/Searchbar';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path ='/' component={Home} exact />
        <Route path ='/movie/:id' component={MovieDetail} />
        <Route path ='/Search' component={Search} />
      </Switch>
    </div>
  );
}

export default App; 
