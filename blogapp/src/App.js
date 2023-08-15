import './css/App.css';
import Home from './container/home.container';
import NewPost from './container/newpost.container';
import ViewBlog from './container/viewblog.container';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/NewPost" element={<NewPost />}></Route>
          <Route path="/ViewBlog/:Title" element={<ViewBlog />}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
