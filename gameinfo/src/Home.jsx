import HomePostList from "./post/HomePostList"
import './Home.css'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import customAxios from "./config/ApiUrl"

const Home = () => {

    const [newsImage, setNewsImage] = useState({})
    const [newsImageList, setNewsImageList] = useState([])
    const [newsList, setNewsList] = useState([])
    const [reviewList, setReviewList] = useState([])



    useEffect(() => {
        const getData = async () => {
            const response = await customAxios.get("/main")

            setNewsImageList(response.data.newsImageList)
            setNewsList(response.data.newsList)
            setReviewList(response.data.review)
            setNewsImage(response.data.newsImageList[0])
        }

        getData()
    }, [])

    const onHoverNewsImageList = (i) => {
        setNewsImage(newsImageList[i])

    }

    return(
        <div className="home">
            <div>
                <div className="post-bar-border">
                    <div className="post-bar-text">뉴스</div>    
                </div>
                <div className="image-list" style={{widht: '100%', position: 'relative'}}>
                    <div className="image-items">
                        {newsImageList.length > 0 &&
                            newsImageList.map((news, index) =>
                                <Link to={'/news/' + newsImage.id}>
                                    <div className="image-item" key={index} onMouseEnter={() => onHoverNewsImageList(index)}>
                                        <div className="image-item-text">
                                            {news.title}
                                        </div>
                                    </div>
                                </Link>
                        )}
                    </div>
                    <div className="image-content" style={
                        {
                            display: 'flex',
                            flexDirection: 'column'                        }
                        }>
                        {newsImageList.length > 0 &&
                            <Link to={'/news/' + newsImage.id}>
                                <div style={{height:'100%'}}>
                                    <img className="image-content-img" 
                                        src={"https://gameinfo.momoon.kro.kr/images/" + newsImage.imageName} 
                                        alt={newsImage.title}/>
                                </div>
                            </Link>        
                        }         
                        <div className="image-content-text">
                            {newsImageList.length > 0 &&
                                <Link to={'/news/' + newsImage.id}>
                                    <div className="image-text" >
                                        {newsImage.title}
                                    </div>
                                </Link>
                            }
                        </div>
                    </div>
                    
                </div>
                <div style={{width: '100%', border: '1px solid gray', padding:'10px'}}>
                    <HomePostList list={newsList}/>
                </div>
            </div>            
                
            <div className="home-list">
                <div className="post-bar">
                    <div className="post-bar-text">리뷰</div>    
                </div> 
                {/* <HomePostList list={reviewList}/> */}
            </div>
        </div>
    )
}

export default Home