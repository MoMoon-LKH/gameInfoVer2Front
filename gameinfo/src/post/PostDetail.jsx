import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = (props) => {
    
    const {postId} = useParams();

    return (
        <div>
            {postId}
        </div>
    );
};

export default PostDetail;