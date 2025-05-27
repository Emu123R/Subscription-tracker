import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home'
import SignIn from "./sing-in";
import SignUp from "./sign-up";
import NewOrder from "./NewOrder";
import Profile from "./Profile";

function App() {
  

  return (
    <Router>
      <Routes>
        {/* määritellään sivujen reitit */}
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/new-order" element={<NewOrder />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
