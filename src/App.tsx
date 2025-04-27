import { Suspense } from "react"
import { Routes, Route, BrowserRouter } from "react-router"
import { UserProvider } from "./contexts/User/UserContextProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './App.css'

import Home from './pages/Home/Home'
import Articles from './pages/Articles/Articles'
import ArticleDetails from './pages/ArticleDetails/ArticleDetails'
import Login from './pages/Login/Login'
import Header from "./components/Header/Header"

export default function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={
              <Suspense fallback={<p>Loading...</p>}>
                <ArticleDetails />
              </Suspense>
            } />
            <Route path="/login" element={<Login />} />
          </Routes>
        </QueryClientProvider>
      </UserProvider>
    </BrowserRouter>
  )
}
