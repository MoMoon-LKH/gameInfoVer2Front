import { useParams } from "react-router-dom"
import NewsCategory from "./NewsCategory"


const NewsPostList = () => {
 
    const {categoryId} = useParams()

    return ( 
        <>
            <NewsCategory id={categoryId}/>
            <PostList categoryId={categoryId} gamesId={null}/>
        </>
    )
}
