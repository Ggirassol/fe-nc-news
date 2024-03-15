import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import UserContext from './contexts/User';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import ArticlesList from './components/ArticlesList/ArticlesList';
import SingleArticle from './components/SingleArticle/SingleArticle';
import AddArticle from './components/AddArticle';
import Users from './components/Users';
import SingleUser from './components/SingleUser';
import Library from './components/Library';
import Profile from './components/Profile';
import ArticlesListByTopic from './components/ArticlesListByTopic';
import FilterBar from './components/FilterBar.jsx/FilterBar';
import ErrorPage from './components/ErrorPage/ErrorPage';
import './App.css'




function App() {

  const [currUser] = useState({
    username: 'cooljmessy',
    name: 'Peter Messy',
    avatar_url:
      'https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002'
  })

  const [order_by, setOrder_by] = useState(null)
  const [sort_by, setSort_by] = useState(null)

  return (
    <UserContext.Provider value={{currUser}}>
      <Header/>
      <NavBar setSort_by={setSort_by} setOrder_by={setOrder_by}/>
      <FilterBar order_by={order_by} setOrder_by={setOrder_by} sort_by={sort_by} setSort_by={setSort_by}/>
      <Routes>
        <Route path='/' element={<ArticlesList order_by={order_by} sort_by={sort_by}/>} />
        <Route path='/articles/:article_id' element={<SingleArticle />} />
        <Route path={`/${currUser.username}/create`} element ={<AddArticle/>} />
        <Route path='/members' element ={<Users/>} />
        <Route path={`/members/${currUser.username}`} element ={<SingleUser/>} />
        <Route path={`/${currUser.username}/library`} element ={<Library/>} />
        <Route path={`/${currUser.username}/profile`} element ={<Profile/>} />
        <Route path={`/topic/:topic`} element={<ArticlesListByTopic order_by={order_by} sort_by={sort_by}/>}/>
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App
