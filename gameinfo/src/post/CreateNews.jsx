import { useEffect, useState } from "react"
import "./CreateNews.css"
import { customAxios } from '../config/ApiUrl';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor} from '@ckeditor/ckeditor5-react'
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'


const CreateNews = (props) => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const naviagte = useNavigate();

    useEffect(() => {
        //권한 확인
        const bool = true

        if(!bool) {
            alert("해당 권한이 없습니다")
            naviagte(-1)
        }
    }, [])


    const handleCategory = (e) => {
        setCategory(e.target.value)
    }


    const onClickCreate = () => {
        
        const post = {
            title: title,
            content: content,
            imageIds: images,
            platformId: category
        }

        if(category === "") {
            alert("분류를 선택해주세요")
        } else if(post.title === "") {
            alert("제목을 입력해주세요")
        } else if(post.content === "") {
            alert("해당 게시글 내용을 입력해주세요")
        } else {
            ajaxCraeetPost(post)
        }

        
    }

    const modalOk = () => {
        setIsOpen(false)
        naviagte(-1)
    }

    const modalCancel = () => {
        setIsOpen(false)
    }

    const onClickCancel = () => { 
        setIsOpen(true)
    }

    const ajaxCraeetPost = (post) => {
        
        const response = customAxios.post('/news/create', post)
        .then(response => {
            if(response.status === 201 || response.status === 200) {
                alert("등록되었습니다")
                naviagte("/news/" + response.data.id)

            } else {
                alert("등록에 실패하였습니다")
            }
        }).catch(error => {
            alert("등록에 실패하였습니다")
        })
        
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
                            <option value={1}>PS5</option>
                            <option value={2}>SWITCH</option>
                            <option value={3}>XBOX</option>
                            <option value={4}>PC</option>
                            <option value={5}>모바일</option>
                            <option value={6}>MULTI</option>
                        </select>
                    </div>
                    <div className="post-sub-divs">
                        <span className="post-title-text">제목 </span> 
                        <input className="post-title-input" placeholder="제목을 입력해주세요" onChange={e => setTitle(e.target.value)}></input>
                    </div>
                </div>
                <CKEditor className='editor'
                    editor={ Editor }
                    config={{
                        placeholder: "내용을 입력해주세요",
                        image: {
                            resizeUnit: 'px',
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
                <button className="btns create-btn" onClick={onClickCreate}>작성</button>
                <button className="btns cancel-btn" onClick={onClickCancel}>취소</button>
            </div>

            <Modal
                show={isOpen}         
                backdrop="static"
                keyboard={false}
                className='modal'>
                <Modal.Body>
                            해당 내용은 저장되지않습니다<br/>
                            정말로 취소하겠습니다?                
                </Modal.Body>
                <Modal.Footer>
                    <Button className="modal-btn" variant="primary" onClick={modalOk}>확인</Button>
                    <Button className="modal-btn" variant="secondary" onClick={modalCancel} >취소</Button>
                </Modal.Footer>
            </Modal>
            
        </div>



    )
}

export default CreateNews

