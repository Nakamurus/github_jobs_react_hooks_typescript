import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function JobsPagination({ page, setPage }: any) {
    function adjustPage(amount:number) {
        setPage((prevPage: number) => prevPage + amount)
    }
    return (
        <Pagination>
            { page > 2 && <Pagination.Prev onClick={() => adjustPage(-1)}/>}
            { page !== 1 && <Pagination.Item  onClick={() => setPage(1)}>1</Pagination.Item>}
            { page > 2 && < Pagination.Ellipsis  />}
            { page !== 1 && <Pagination.Item  onClick={() => adjustPage(-1)}> { page - 1}</Pagination.Item>}
            <Pagination.Item active> { page }</Pagination.Item>
            <Pagination.Item  onClick={() => adjustPage(1)}> { page + 1}</Pagination.Item>
            <Pagination.Next  onClick={() => adjustPage(1)} />
        </Pagination>
    )
}
