import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoute"
import Loader from "./components/loader";
import { useSelector } from "react-redux";

function App() {
  const {loader} = useSelector(state => state.loaderReducer)
  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false}></Toaster>
      {loader && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }>  
          </Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
