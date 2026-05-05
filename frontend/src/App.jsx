import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
    const { authUser } = useAuthContext();
    
    // This points to the image you just put in the public folder
    const backgroundImage = "bg-[url('/home/arcanum/projects/mca-projects/mern-chat-app/frontend/public/bg.jpg')]";
    
    return (
        /* The classes below handle the image scaling and centering */
        <div className={`p-4 h-screen flex items-center justify-center ${backgroundImage} bg-cover bg-center`}>
            <Routes>
                <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
                <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
                <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;