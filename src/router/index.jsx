import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import List from '../pages/List'
import Edit from '../pages/Edit'
import Means from '../pages/Means'

const BaseRouter = () => (
    <Router>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='/list' element={<List />}></Route>
                <Route path='/edit' element={<Edit />}></Route>
                <Route path='/means' element={<Means />}></Route>
            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
        </Routes>
    </Router>
)

export default BaseRouter