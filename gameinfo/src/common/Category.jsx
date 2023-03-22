import './Category.css'

const Category = () => {

    return (
        <div className="category-nav">
            <div className="category-div">
                <div className='category-text'>
                    뉴스
                </div>
            </div>

            <div className="category-div">
                <div className='category-text'>
                    Games
                </div>
            </div>
            
            <div className="category-div">
                <div className='category-text'>
                    리뷰
                </div>
            </div>
        </div>
    )
}

export default Category