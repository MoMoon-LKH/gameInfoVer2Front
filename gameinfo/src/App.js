import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './common/Header'
import PostList from './post/PostList';
import PostDetail from './post/PostDetail';
import Login from './auth/Login';
import Register from './member/Register';
import RegisterTerms from './member/RegisterTerms';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <div className='content-body'>
          <Routes>
            <Route exact path='/' element={<PostList/>}></Route>
            <Route path='/post/:postId' element={<PostDetail/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register/terms' element={<RegisterTerms/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
