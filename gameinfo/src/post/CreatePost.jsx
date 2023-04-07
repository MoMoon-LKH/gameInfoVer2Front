import { useState } from "react"
import "./CreatePost.css"
import CreateEditor from "./CreateEditor"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

const CreatePost = (props) => {


    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState({})

    const handleCategory = (e) => {
        setCategory(e.target.value)
    }


    const onClickCreate = () => {
        
        const post = {
            title: title,
            content: content
        }

        if(category === "") {
            alert("분류를 선택해주세요")
        } else if(post.title === "") {
            alert("제목을 입력해주세요")
        } else if(post.content === "") {
            alert("해당 게시글 내용을 입력해주세요")
        } else {
            
        } 

        console.log(post)
    }

    const onClickCancel = () => {
        
    }

    const handleSetImages = (content) => {
        setContent(content);
    }

    const handleSetContent = (id) => {
        setImages(images.concat(id))
    }


    return (
        <div className="post-create-div">
            <div className="editor-div">
                <div className="post-sub-div">
                    <div className="post-sub-divs">
                        <span style={{marginRight: '8px'}}>분류</span>
                        <select className="category-select" value={category} onChange={handleCategory}>
                            <option value={""}>선택</option>
                        </select>
                    </div>
                    <div className="post-sub-divs">
                        <span className="post-title-text">제목: </span> 
                        <input className="post-title-input" placeholder="제목을 입력해주세요" onChange={e => setTitle(e.target.value)}></input>
                    </div>
                </div>
                <CreateEditor content={content} handleSetImages={handleSetImages} handleSetContent={handleSetContent}/>
            </div>
            <div className="button-div">
                <button className="create-btn" onClick={onClickCreate}>작성</button>
                <button className="cancel-btn" onClick={onClickCancel}>취소</button>
            </div>
        </div>
    )
}

export default CreatePost

