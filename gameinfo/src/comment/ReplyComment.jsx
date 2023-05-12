import { useState } from "react"


const ReplyCommentWindow = (props) => {

    const [display, setDisplay] = useState(false)
    const onClickReply = props.onClickCreateReply

    const handleDisplay = () => {
        if(display === false) {
            props.setIsReply(true)
            setDisplay(true)
        } else {
            props.setIsReply(false)
            setDisplay(false)
        }
    }



    return (
        <>
        <div className='comment-reply'>
            <span className="reply-btn" onClick={handleDisplay}>답글</span>
        </div>
        <div className='comment-reply-bottom'>
        {display && 
            <div className='comment-reply-block'>
                    <div className='comment-block-title'>댓글</div>
                    <textarea className='comment-text' value={props.content} onChange={(e) => props.setContent(e.target.value)}/>
                    <button className='comment-btn' onClick={onClickReply}>등록</button>
            </div>
        }
        </div>
        </>
    )
}

export default ReplyCommentWindow