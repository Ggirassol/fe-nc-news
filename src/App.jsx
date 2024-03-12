import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import UserContext from './contexts/User';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import ArticlesList from './components/ArticlesList/ArticlesList';
import SingleArticle from './components/SingleArticle';
import AddArticle from './components/AddArticle';
import Users from './components/Users';
import SingleUser from './components/SingleUser';
import Library from './components/Library';
import Profile from './components/Profile';
import './App.css'



function App() {

  const [currUser] = useState({
    username: "icellusedkars",
    name: "sam",
    avatar_url: "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4"
    })

  return (
    <UserContext.Provider value={{currUser}}>
      <Header/>
      <NavBar/>
      <Routes>
        <Route path='/' element={<ArticlesList/>} />
        <Route path='/articles/:article_id' element={<SingleArticle/>} />
        <Route path={`/${currUser.username}/create`} element ={<AddArticle/>} />
        <Route path='/members' element ={<Users/>} />
        <Route path={`/members/${currUser.username}`} element ={<SingleUser/>} />
        <Route path={`/${currUser.username}/library`} element ={<Library/>} />
        <Route path={`/${currUser.username}/profile`} element ={<Profile/>} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App
