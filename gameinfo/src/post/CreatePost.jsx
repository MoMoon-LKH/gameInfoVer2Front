import { useState } from "react"
import "./CreatePost.css"
import { customAxios } from './../config/ApiUrl';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor} from '@ckeditor/ckeditor5-react'


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

 
    
    const customUploadAdapter = (loader) => { 
        return {
            upload(){
                return new Promise ((resolve, reject) => {
                    const data = new FormData();
                     loader.file.then( async (file) => {
                            data.append("file", file);

                            const response = await customAxios.post('/image/upload', data)
                                .then((res) => {
                                    setImages(images.concat(res.data.id))
                                
                                    resolve({
                                        default: 'https://gameinfo.momoon.kro.kr/images/' + res.data.fileName
                                    });
                                })
                                .catch((err)=>reject(err));
                        })
                })
            }
        }
    }


    function uploadPlugin (editor){
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        }
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
                <CKEditor className='editor'
                    editor={ Editor }
                    config={{
                        placeholder: "내용을 입력해주세요",
                        image: {
                            toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'],
                            styles: [
                            'full',
                            'alignLeft',
                            'alignRight'
                            ],
                        },
                        extraPlugins: [uploadPlugin]
                    
                    }}

                    data={content}


                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        //handleContent(data)
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

