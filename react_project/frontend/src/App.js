import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import NotFound from './Pages/NotFound';
import PrivateRoute from './Routes/PrivateRoute';
import ProductDetails from './Pages/ProductDetails'
import MyProfile from './Pages/MyProfile';
import ProductList from './Pages/ProductList';
import Login from './Layout/Login';
import Signup from './Layout/Signup';
import EmailVerification from './Layout/EmailVerification';
import EmailVerificationSuccess from './Layout/EmailVerificationSuccess';
import EmailVerificationFail from './Layout/EmailVerificationFail'
function App() {
  return (
    <div className="App">
      <Login />
      <Signup />
      <EmailVerification/>
      <EmailVerificationSuccess/>
      <EmailVerificationFail/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path='/myprofile' element={<MyProfile/>}/>
        </Route>
        <Route path='/productdetails/:id' element={<ProductDetails/>}/>
        <Route path='/productList/:id' element={<ProductList/>}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
