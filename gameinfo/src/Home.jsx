import HomePostList from "./post/HomePostList"
import './Home.css'
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import customAxios from "./config/ApiUrl"

const Home = () => {

    const sampleList = [
        {
            id: 1,
            title: 'title1',
            imageName: 'sample'
        }, 
        {
            id: 2,
            title: 'title2',
            imageName: 'sample2'
        }
    ]

    const navigater = useNavigate();
    const [newsImage, setNewsImage] = useState({})
    const [newsImageList, setNewsImageList] = useState(sampleList)
    const [newsList, setNewsList] = useState([])
    const [reviewList, setReviewList] = useState([])

    

    const getMainList = async () => {
        customAxios.get("/main")
        .then(response => {
            setNewsImageList(response.data.newsImageList)
            setNewsList(response.data.newsList)
            setReviewList(response.data.review)
            setNewsImage(newsImageList[0])
        })
    }

    useEffect(() => {
        setNewsImage(newsImageList[0])
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
                <div className="image-list" style={{widht: '100%', height:'450px', position: 'relative'}}>
                    <div className="image-items">
                        {newsImageList.map((news, index) =>
                            <div className="image-item" key={index} onMouseEnter={() => onHoverNewsImageList(index)}>
                                {news.title}
                            </div>
                        )}
                    </div>
                    <div className="image-content" style={
                        {
                            height: '85%',
                            display: 'flex',
                            flexDirection: 'column'
                        }
                        }>
                        <Link to={'/news/' + newsImage.id}>
                            <img className="image-content-img" 
                                src={"https://gameinfo.momoon.kro.kr/images/" + newsImage.imageName} 
                                    alt={newsImage.title}/>
                        </Link>        
                    </div>
                    <div className="image-content-text">
                        <Link to={'/news/' + newsImage.id}>
                            <div className="image-text" >
                                {newsImage.title}
                            </div>
                        </Link>
                    </div>
                </div>
                <div style={{width: '100%', border: '1px solid gray', padding:'10px'}}>
                    <HomePostList list={newsList} type={"news"}/>
                </div>
            </div>            
                
            <div className="home-list">
                <div className="post-bar">
                    <div className="post-bar-text">리뷰</div>    
                </div> 
                <HomePostList list={reviewList} type={"review"}/>
            </div>
        </div>
    )
}

export default Home