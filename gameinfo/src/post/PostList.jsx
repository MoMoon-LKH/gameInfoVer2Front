import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams} from 'react-router-dom';
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
    const perPage = 30
    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(0)
    const [searchSelect, setSearchSelect] = useState('title')
    const [searchInput, setSearchInput] = useState('')
    const navigator = useNavigate();

    const getListApi = async (id) => {
        customAxios.get("/news/list/" + id, {
            params: {
                page: page,
                size: perPage,
                searchSelect: searchSelect,
                searchInput: searchInput
            }
        })
        .then(response => {
            setTotal(response.data.total);
            setList(response.data.list);
        })
    }

    useEffect(() => {
        getListApi(categoryId)    
    }, [])
    

    const handleSearchSelect = (e) => {
        setSearchSelect(e.target.value)
    }

    const onClickCreateNews = () => {
        
        //권한 확인

        //글작성 페이지로 이동
        navigator("/news/create")
        
    }


    return (
        <div className='post-list'>
            <NewsCategory id={categoryId} getListApi={getListApi}/>
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
                                    <Link to={"/news/" + post.id}>
                                        {post.title}
                                    </Link>
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
            <CustomPagination total={total} page={page} setPage={setPage} perPage={perPage} lastNum={Math.ceil(total/perPage)} />
            <div className='posts-search-div' style={{textAlign: 'right'}}>
                <select value={searchSelect} onChange={handleSearchSelect} style={{width: '7%', height: '30px'}}>
                    <option value={'title'}>제목</option>
                    <option value={'writer'}>작성자</option>

                </select>
                <input type='text' style={{width: '18%', height: '30px'}}/> 
                <button style={{width: '5%', height: '30px'}} onChange={e => setSearchInput(e.target.value)}>검색</button>
                <button style={{width: '7%', height: '30px', marginLeft: '10px'}} onClick={onClickCreateNews}>글 작성</button>
            </div>

        </div>
    );
};

 export default PostList;