import { useState } from "react"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "./CreatePost.css"

const CreatePost = (props) => {


    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const onClickCreate = () => {
        
        const post = {
            title: title,
            content: content
        }

        if(post.title !== "" && post.content !== ""){
            // create api
        } else if(post.title === "") {
            alert("제목을 입력해주세요")
        } else if(post.content === "") {
            alert("해당 게시글 내용을 입력해주세요")
        }

        console.log(post)
    }

    const onClickCancel = () => {
        
    }

    return (
        <div className="post-create-div">
            <div className="editor-div">
                <div className="post-title">
                    <span className="post-title-text">제목: </span> 
                    <input className="post-title-input" placeholder="제목을 입력해주세요" onChange={e => setTitle(e.target.value)}></input>
                </div>
                <CKEditor className='editor'
                   editor={ ClassicEditor }
                    config={{
                        placeholder: "내용을 입력해주세요",
                    }}
                   onReady={ editor => {
                       // You can store the "editor" and use when it is needed.
                       console.log( 'Editor is ready to use!', editor );
                   } }
                   onChange={ ( event, editor ) => {
                       const data = editor.getData();
                       setContent(data)
                   } }
                   onBlur={ ( event, editor ) => {
                       console.log( 'Blur.', editor );
                   } }
                   onFocus={ ( event, editor ) => {
                       console.log( 'Focus.', editor );
                   } }
                />
               
            </div>
            <div className="button-div">
                <button className="create-btn" onClick={onClickCreate}>작성</button>
                <button className="cancel-btn" onClick={onClickCancel}>취소</button>
            </div>
        </div>
    )
}

export default CreatePost

