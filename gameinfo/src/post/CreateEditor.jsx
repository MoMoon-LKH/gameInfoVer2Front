import axios from "axios";
import { customAxios } from './../config/ApiUrl';
import { useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageResizeEditing from '@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting';
import ImageResizeHandles from '@ckeditor/ckeditor5-image/src/imageresize/imageresizehandles';


const CreateEditor = (props) => {

    const [content, setContent] = useState('');

    const handleContent = (data) => {
        props.handleSetContent(data);
    }

    const handleImageIds = (id) => {
        props.handleSetImages(id)
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
                                    handleImageIds(res.data.id)
                                
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


    function uploadPlugin (editor){ // (3)
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        }
    }


    return (
        <CKEditor className='editor'
            editor={ ClassicEditor }
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
                plugins: [ Image, ImageResizeEditing, ImageResizeHandles],
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
    )
}

export default CreateEditor
