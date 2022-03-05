import logo from './logo.svg';
// import './App.css';
import CovidData from './component/CovidData';
import Header from './component/Header';
import { Route, Routes } from 'react-router-dom';
import Weather from './Wether/Weather';
import Pagination from './component/Pagination';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>

      <Route path='/covid' element={<CovidData/>}/>
      <Route path='/wether' element={<Weather/>}/>
      <Route path='/page' element={<Pagination/>}/>


      </Routes>
      
      {/* <CovidData/> */}
    </div>
  );
}

export default App;
