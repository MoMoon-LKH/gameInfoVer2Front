import './NewsCategory.css'
import { useEffect, useState } from 'react';


const NewsCategory = (props) => {

    const [activeId, setActiveId] = useState();
    const getListApi = props.getListApi;
    

    useEffect(() => {
        setActiveId(props.activeId)
    }, [props.activeId])

    const listApi = (id) => {
        setActiveId(id)
        getListApi(id)
    }

    return (
        <div className='news-categorys'>
            <div className={activeId == 0 ? 'news-category-div active' : 'news-category-div'}>
                <div className='news-category-link' onClick={()=>listApi(0)} >
                    전체
                </div>
            </div>
            <div className='news-category-div'>|</div>
            <div className={activeId == 1 ? 'news-category-div active' : 'news-category-div'}>
                <div className='news-category-link' onClick={()=>listApi(1)}>
                    PS5
                </div>
            </div>
            <div className='news-category-div'>|</div>
            <div className={activeId == 2 ? 'news-category-div active' : 'news-category-div'}>
                <div className='news-category-link' onClick={()=>listApi(2)}>
                    SWITCH
                </div>
            </div>
            <div className='news-category-div'>|</div>
            <div className={activeId == 3 ? 'news-category-div active' : 'news-category-div'}>
                <div className='news-category-link' onClick={()=>listApi(3)}>
                    XBOX
                </div>
            </div>
            <div className='news-category-div'>|</div>
            <div className={activeId == 4 ? 'news-category-div active' : 'news-category-div'}>
                <div className='news-category-link' onClick={()=>listApi(4)}>
                    PC
                </div>
            </div>
            <div className='news-category-div'>|</div>
            <div className={activeId == 5 ? 'news-category-div active' : 'news-category-div'}>
                <div className='news-category-link' onClick={()=>listApi(5)}>
                    모바일
                </div>
            </div>
            <div className='news-category-div'>|</div>
            <div className={activeId == 6 ? 'news-category-div active' : 'news-category-div'}>
                <div className='news-category-link' onClick={()=>listApi(6)}>
                    MULTI
                </div>
            </div>
        </div>
    )
}
export default NewsCategory