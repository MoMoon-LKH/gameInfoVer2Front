import PostList from "./post/PostList"

const Home = () => {


    return(
        <div className="home">

            <div className="post-list">
                <div>뉴스</div> 
                <PostList/>
            </div>
            <div className="post-list">
                <div>리뷰</div> 
                <PostList/>
            </div>
        </div>
    )
}

export default Home