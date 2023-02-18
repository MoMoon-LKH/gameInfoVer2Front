import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './common/Header'
import PostList from './post/PostList';
import PostDetail from './post/PostDetail';
import Login from './auth/Login';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <div className='content-body'>
          <Routes>
            <Route path='/' element={<PostList/>}></Route>
            <Route path='/post/:postId' element={<PostDetail/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
