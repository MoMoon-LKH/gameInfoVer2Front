import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './common/Header'
import PostList from './post/PostList';
import PostDetail from './post/PostDetail';
import Login from './auth/Login';
import Register from './member/Register';
import RegisterTerms from './member/RegisterTerms';
import { AuthProvider } from './auth/AuthContext';
import Home from './Home';
import Category from './common/Category';
import CreatePost from './post/CreatePost';

function App() {
  
  return (
  
  <AuthProvider>
    <div className="App">
      <BrowserRouter>  
        <Header/>
        <Category/>
        <div className='content-body'>
          <Routes>
            <Route exact path='/' element={<Home/>}></Route>
            <Route path='/list/post/:categoryId' element={<PostList/>}></Route>
            <Route path='/post/:postId' element={<PostDetail/>}></Route>
            <Route path='/post/create' element={<CreatePost/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register/terms' element={<RegisterTerms/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>  
    </div>
  </AuthProvider>    
  );
  
}

export default App;
