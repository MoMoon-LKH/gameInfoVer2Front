import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import './NewsList.css';
import { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';
import CustomPagination from '../page/CustomPagination';
import customAxios from '../../config/ApiUrl';
import NewsCategory from './NewsCategory';

const NewsList = ({match}) => {

    let [list, setList] = useState([])
    const {platformId} = useParams()
    const perPage = 30
    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(0)
    const [searchSelect, setSearchSelect] = useState('title')
    const [searchInput, setSearchInput] = useState('')
    const navigator = useNavigate();

    const getListApi = async (id, page) => {
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

    const getApi = (page) => {
        setPage(page)
        getListApi(platformId, page)
    }

    useEffect(() => {
        setSearchInput('')
        getListApi(platformId, page)    
    }, [platformId])
    

    const resetListApi = async (id) => {
        setSearchInput('')
        setSearchSelect('title')
        setPage(0)
        getListApi(id)
    }

    const handleSearchSelect = (e) => {
        setSearchSelect(e.target.value)
    }

    const onClickCreateNews = () => {
        
        navigator("/news/create")
        
    }


    return (
        <div className='post-list'>
            <NewsCategory activeId={platformId} getListApi={resetListApi}/>
            <div className='posts'>
                <Table className='posts-table'>
                    <thead>
                        <tr>
                            <th style={{width: '7%'}}>번호</th>
                            <th style={{width: '2%'}}></th>
                            <th style={{width: '45%'}}>제목</th>
                            <th style={{width: '18%'}}>작성자</th>
                            <th style={{width: '18%'}}>작성일</th>
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
                                {post.createDate ?
                                    <td>{post.createDate}</td>    
                                    :
                                    <td>{post.createHour}</td>
                                }
                                
                                <td>{post.views}</td>
                                <td>{post.likesCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <CustomPagination total={total} page={page} setPage={getApi} perPage={perPage} lastNum={Math.floor(total/perPage)} />
            <div className='posts-search-div' style={{textAlign: 'right'}}>
                <select value={searchSelect} onChange={handleSearchSelect} style={{width: '7%', height: '30px'}}>
                    <option value={'title'}>제목</option>
                    <option value={'writer'}>작성자</option>

                </select>
                <input type='text' value={searchInput} style={{width: '18%', height: '30px'}} onChange={e => setSearchInput(e.target.value)}/> 
                <button style={{width: '5%', height: '30px'}} onClick={() => getListApi(platformId)}>검색</button>
                <button style={{width: '7%', height: '30px', marginLeft: '10px'}} onClick={onClickCreateNews}>글 작성</button>
            </div>

        </div>
    );
};

 export default NewsList;