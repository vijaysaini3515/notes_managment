import './App.scss';
import Homepage from './components/HomePage/Homepage';
import Login from './components/Login/Login';
import Navbar from './components/NavBar/Navbar';
import SignUp from './components/SignUp/SignUp';
import { Route, Routes } from 'react-router-dom';
import Upload from './components/Uploade/Upload';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PdfCollction from './components/pdfCollection/Pdf'
import Circket from './components/circket/Circket';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route  element={<PrivateRoute />}>
      <Route path='/' element={<Homepage />} />
      <Route path='/collection' element={<PdfCollction />} />
      <Route path='/uploade' element={<Upload />} />
      <Route path='/circket' element={<Circket />} />

      <Route path='/logout' element={<h1>Logout</h1>} />
      </Route>

      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
    </>
  );
}

export default App;
