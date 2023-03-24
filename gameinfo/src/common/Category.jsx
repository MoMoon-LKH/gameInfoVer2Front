import './Category.css'
import { Link } from 'react-router-dom';

const Category = () => {

    return (
        <div className="category-nav">
            
                <div className="category-div">
                <Link className='category-link' to="/list/post/1">
                    <div className='category-text'>
                        뉴스
                    </div>
                </Link>
                </div>
            
            <div className="category-div">
                <Link className='category-link' to="/list/post/2" >
                    <div className='category-text'>
                        리뷰
                    </div>
                </Link>
            </div>

            <div className="category-div">
                <Link className='category-link' to="/list/post/3" >
                    <div className='category-text'>
                        Games
                    </div>
                </Link>

            </div>
            
            
        </div>
    )
}

export default Category