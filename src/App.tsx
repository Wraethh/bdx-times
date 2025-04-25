import { Routes, Route, BrowserRouter } from "react-router"
import { UserProvider } from "./contexts/User/UserContextProvider"
import './App.css'

import Home from './pages/Home/Home'
import ArticlesList from './pages/ArticlesList/ArticlesList'
import ArticleDetails from './pages/ArticleDetails/ArticleDetails'
import Login from './pages/Login/Login'
import Navbar from "./components/Navbar/Navbar"

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}
