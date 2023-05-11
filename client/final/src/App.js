import './App.css';
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Home from './pages/Home';
import Bullion from './pages/Bullion';
import Commemorative from './pages/Commemorative';
import Exclusive from './pages/Exclusive';
import AdFilter from './pages/AdFilter';

function App() {
  return (
    <div className="App">
<BrowserRouter>
<Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/bullion" element={<Bullion/>} />
  <Route path="/commemorative" element={<Commemorative/>} />
  <Route path="/exclusive" element={<Exclusive/>} />
  <Route path="/filter" element={<AdFilter/>} />
</Routes>
</BrowserRouter>    </div>
  )
};

export default App;
