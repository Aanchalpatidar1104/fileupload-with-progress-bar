
import './App.css';
import{BrowserRouter as Router, Route, Routes}from 'react-router-dom'
import Fileupload from './Pages/Fileupload';
import Error404 from './Pages/Error404';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Fileupload/>}/>
        <Route path="*"element={< Error404/>}/>
        <Route path="/fileupload"element={< Fileupload/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
