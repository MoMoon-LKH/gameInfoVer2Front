import React, { useState } from 'react';
import { Link, useLocation, useParams} from 'react-router-dom';
import PostDetail from './PostDetail';
import './PostList.css';
import { useContext } from 'react';
import AuthContext from '../auth/AuthContext';
import useAuth from './../auth/useAuth';
import { Table } from 'react-bootstrap';
import NewsCategory from './news/NewsCategory';

const PostList = (props) => {
    
    const example = [
        {id: 1, title: 'title1', commentCnt: 1, view: 3,  memberId: 1, nickname: 'test', createDate: '2023-04-12 18:30:22'},
        {id: 2, title: 'title2', commentCnt: 5, view: 5, memberId: 1, nickname: 'test', createDate: '2023-04-12 18:30:22'},
        {id: 3, title: 'title3', commentCnt: 4, view: 10, memberId: 1, nickname: 'test', createDate: '2023-04-12 18:30:22'}
    ];

    let [list, setList] = useState(example);
    const {categoryId} = useParams()    

    return (
        <div className='post-list'>
            <NewsCategory id={categoryId}/>
            <div className='posts'>
                <Table>

                    {list.map(post => (                    
                        <tr>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.nickname}</td>
                            <td>{post.createDate}</td>
                            <td>{post.view}</td>
                        </tr>
                    ))}
                </Table>

            </div>
        </div>
    );
};

 export default PostList;