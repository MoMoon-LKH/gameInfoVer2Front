import HomePostList from "./post/HomePostList"
import './Home.css'
import { Link } from "react-router-dom"

const Home = () => {


    return(
        <div className="home">

            <div className="home-list">
                <div className="post-bar">
                    <div className="post-bar-text">뉴스</div>    
                </div> 
                <HomePostList />
            </div>
            <div className="home-list">
                <div className="post-bar">
                    <div className="post-bar-text">리뷰</div>    
                </div> 
                <HomePostList />
            </div>
            <Link to={'/post/create'}><button>작성</button></Link>
        </div>
    )
}

export default Home