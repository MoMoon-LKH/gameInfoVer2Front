import HomePostList from "./post/HomePostList"
import './Home.css'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import customAxios from "./config/ApiUrl"

const Home = () => {
    
    const [imgSeq, setImgSeq] = useState(0)
    const [newsImage, setNewsImage] = useState({})
    const [newsImageList, setNewsImageList] = useState([])
    const [newsList, setNewsList] = useState([])
    const [reviewList, setReviewList] = useState([])


    const getMainList = () => {
        customAxios.get("/main/list")
        .then(response => {
            setNewsImageList(response.data.newsImages)
            setNewsList(response.data.news)
            setReviewList(response.data.review)
            setNewsImage(newsImageList[imgSeq])
        })
    }

    useEffect(() => {

    }, [])

    const onClickImageNext = (seq) => {
        if(seq >= newsImageList.length) {
            setImgSeq(0)
        } else {
            setImgSeq(imgSeq + 1)
            
        }
        setNewsImage(newsImageList[imgSeq])
    }

    const onClickImagePrev = (seq) => {
        if(seq < 0) {
            setImgSeq(newsImageList.length - 1)
        } else {
            setImgSeq(imgSeq - 1)
        }

        setNewsImage(newsImageList[imgSeq])
    }

    return(
        <div className="home">
            <div>
                <div className="post-bar-border">
                    <div className="post-bar-text">뉴스</div>    
                </div>
                <div className="image-list" style={{widht: '100%', backgroundColor: 'black', height:'350px'}}>
                    <div className="image-content left">
                        
                    </div>
                    <div className="image-content main" style={{backgroundImage: 'url(https://gameinfo.momoon.kro.kr/iamges/${newsImage.image})'}}>
                        
                    </div>
                    <div className="image-content right">
                        
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