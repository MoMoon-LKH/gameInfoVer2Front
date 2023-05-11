import { useState } from "react"


const ReplyComment = (props) => {

    const [isReply, setIsReply] = useState(false)
    const onClickReply = props.onClickCreateReply

    const handleIsReply = () => {
        setIsReply(true)
    }

    return (
        <>
        <div className='comment-reply'>
            <div>
                <button onClick={handleIsReply}>답글</button>
            </div>
        </div>
        <div className='comment-reply-bottom'>
        {isReply ?? 
            <div className='comment-block'>
                    <textarea className='comment-text' value={props.content} onChange={(e) => props.setContent(e.target.value)}/>
                    <button className='comment-btn' onClick={onClickReply}>등록</button>
            </div>
        }
        </div>
        </>
    )
}

export default ReplyComment