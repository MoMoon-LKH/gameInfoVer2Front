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
import CreateNews from './post/CreateNews';
import 'bootstrap/dist/css/bootstrap.css';
import NewsList from './post/news/NewsList';
import UpdateNews from './post/news/UpdateNews';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import  Editor from 'ckeditor5-custom-build/build/ckeditor';
import CurrentDevelopment from './errorPage/CurrentDevelopment';
import Footer from './common/Footer';


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
            <Route path='/list/news/:platformId' element={<NewsList/>}></Route>
            <Route path='/news/:newsId' element={<PostDetail/>}></Route>
            <Route path='/news/create' element={<CreateNews/>}></Route>
            <Route path='/news/update/:newsId' element={<UpdateNews/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register/terms' element={<RegisterTerms/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/develop' element={<CurrentDevelopment/>}></Route>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>  
    </div>
  </AuthProvider>    
  );
  
}

export default App;
