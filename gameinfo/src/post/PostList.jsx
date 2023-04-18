import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams} from 'react-router-dom';
import PostDetail from './PostDetail';
import './PostList.css';
import { useContext } from 'react';
import AuthContext from '../auth/AuthContext';
import useAuth from './../auth/useAuth';
import { Table } from 'react-bootstrap';
import NewsCategory from './news/NewsCategory';
import { Pagination } from 'react-bootstrap';
import CustomPagination from './page/CustomPagination';
import customAxios from '../config/ApiUrl';

const PostList = (props) => {

    let [list, setList] = useState([])
    const {categoryId} = useParams() 
    const perPage = 20
    const [page, setPage] = useState(1)
    const [offset, setOffset] = useState(0)
    let pageList = []
    const [searchSelect, setSearchSelect] = useState('title')
    const [searchInput, setSearchInput] = useState('')

    const example = {
        posts: [
            {id: 1, title: 'title1', commentCnt: 1, view: 3,  memberId: 1, nickname: 'test', createDate: '2023-04-12', likes: 5},
            {id: 2, title: 'title2', commentCnt: 5, view: 5, memberId: 1, nickname: 'test', createDate: '2023-04-12' , likes: 3},
            {id: 3, title: 'title3', commentCnt: 4, view: 10, memberId: 1, nickname: 'test', createDate: '2023-04-12', likes: 2}
        ],
        total: 2300
    }

   
    const getListApi = async () => {
        customAxios.get("/post/list/" + categoryId, {
            params: {
                page: page,
                offset: offset,
                searchSelect: searchSelect,
                searchInput: searchInput,
                size: perPage
            }
        })
        .then(response => {
            
        })
    }

    useEffect(() => {
        
        setList(example.posts)
        
        
    }, [])
    
    const onClickPagenation = (selectPage) => {
        setOffset((selectPage-1)*perPage)
    
    }

    const handleSearchSelect = (e) => {
        setSearchSelect(e.target.value)
    }


    return (
        <div className='post-list'>
            <NewsCategory id={categoryId}/>
            <div className='posts'>
                <Table className='posts-table'>
                    <thead>
                        <tr>
                            <th style={{width: '10%'}}>번호</th>
                            <th style={{width: '2%'}}></th>
                            <th style={{width: '50%'}}>제목</th>
                            <th style={{width: '18%'}}>작성자</th>
                            <th style={{width: '10%'}}>작성일</th>
                            <th style={{width: '10%'}}>조회수</th>
                            <th style={{width: '10%'}}>추천수</th>
                        </tr>
                    </thead>
                    <tbody className='posts-table-body'>
                        {list.map(post => (                    
                            <tr>
                                <td>{post.id}</td>
                                <td></td>
                                <td style={{textAlign: 'left'}}>
                                    
                                    {post.title}
                                </td>
                                <td>{post.nickname}</td>
                                <td>{post.createDate}</td>
                                <td>{post.view}</td>
                                <td>{post.likes}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <CustomPagination total={example.total} page={page} setPage={setPage} perPage={perPage} lastNum={Math.ceil(example.total/perPage)} />
            <div className='posts-search-div' style={{textAlign: 'right'}}>
                <select value={searchSelect} onChange={handleSearchSelect} style={{width: '7%', height: '30px'}}>
                    <option value={'title'}>제목</option>
                    <option value={'writer'}>작성자</option>

                </select>
                <input type='text' style={{width: '18%', height: '30px'}}/> 
                <button style={{width: '5%', height: '30px'}} onChange={e => setSearchInput(e.target.value)}>검색</button>
            </div>

        </div>
    );
};

 export default PostList;