import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import NavbarC from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register'
import Edit from './pages/Edit/Edit'
import Profile from './pages/Profile/Profile'
import {Toaster} from 'react-hot-toast'
function App() {
  return (
   <>
     <div>
        <Toaster
         position="top-center"
         reverseOrder={true}
        />
     </div>
    <NavbarC/>
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/register" element={<Register/>}/>
         <Route path="/edit/:id" element={<Edit/>}/>
         <Route path="/profile/:id" element={<Profile/>}/>
       </Routes>
     </BrowserRouter>
   </>
  );
}

export default App;
