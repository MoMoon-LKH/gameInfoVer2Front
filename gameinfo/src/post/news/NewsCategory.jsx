import { Link } from 'react-router-dom'
import './NewsCategory.css'

const NewsCategory = (props) => {

    const activeId = props.id

    console.log(activeId)

    return (
        <div className='news-categorys'>
            <div className={activeId == 1 ? 'news-category-div active' : 'news-category-div'}>
                <Link className='news-category-link' to={"/list/post/1"} >
                    전체
                </Link>
            </div>
            <div className='news-category-div'>|</div>
            <div className={activeId == 4 ? 'news-category-div active' : 'news-category-div'}>
                <Link className='news-category-link' to={"/list/post/4"}>
                    PS5
                </Link>
            </div>
            <div className='news-category-div'>|</div>
            <div className={activeId == 5 ? 'news-category-div active' : 'news-category-div'}>
                <Link className='news-category-link' to={"/list/post/5"}>
                    SWITCH
                </Link>
            </div>
            <div className='news-category-div'>|</div>
            <div className={activeId == 6 ? 'news-category-div active' : 'news-category-div'}>
                <Link className='news-category-link' to={"/list/post/6"}>
                    XBOX
                </Link>
            </div>
            <div className='news-category-div'>|</div>
            <div className={activeId == 7 ? 'news-category-div active' : 'news-category-div'}>
                <Link className='news-category-link' to={"/list/post/7"}>
                    PC
                </Link>
            </div>
            <div className='news-category-div'>|</div>
            <div className={activeId == 8 ? 'news-category-div active' : 'news-category-div'}>
                <Link className='news-category-link' to={"/list/post/8"}>
                    모바일
                </Link>
            </div>
        </div>
    )
}
export default NewsCategory