import { Pagination } from 'react-bootstrap';

const CustomPagination = ({total, offset, page, setPage, lastNum}) => {

    const perPaging = 10
    const mod = Math.floor(total / perPaging) * perPaging
    const pageList = []

    if(mod + perPaging > lastNum){
        for(let num = 0; num <= lastNum%10; num++) {
            pageList.push(mod + num)
        }
    } else {
        for(let num = 0; num < perPaging; num++){
            pageList.push(mod + num)
        }
    }
        

    return (
        <div className='posts-pagination' style={{display: 'flex', justifyContent: 'center'}}>
            <Pagination>
                <Pagination.First onClick={() => setPage(1)} disabled={page === 0} style={{cursor: 'pointer'}}/>
                <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 0} style={{cursor: 'pointer'}}/>
                {pageList.map((num) => (
                    <Pagination.Item key={num} onClick={() => setPage(num)} active={num === page} style={{cursor: 'pointer'}}>
                        {num + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === lastNum} style={{cursor: 'pointer'}}/>
                <Pagination.Last onClick={() => setPage(lastNum)} disabled={page === lastNum} style={{cursor: 'pointer'}}/>
            </Pagination>
        </div>
    )
}

export default CustomPagination