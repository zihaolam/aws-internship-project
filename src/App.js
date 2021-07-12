import logo from './logo.svg';
import './App.css'; 
import Navbar from './components/navbar';
import SearchPage from './routes/search/index';

function App() {
  return (
    <>
      <Navbar/>
      <SearchPage/>
    </>
  );
}

export default App;
