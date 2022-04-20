import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { MovieDetail } from './components/MovieDetail';
import { personDetail } from './components/personDetail'
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path ='/' component={Home} exact />
        <Route path ='/movie/:id' component={MovieDetail} />
      </Switch>
    </div>
  );
}

export default App; 
