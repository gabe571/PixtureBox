import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { MovieDetail } from './components/MovieDetail';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path ='/' component={Home} exact />
        <Route path ='/movie/:id' component={MovieDetail} />
      </Switch>
    </div>
  );
}

export default App; 
