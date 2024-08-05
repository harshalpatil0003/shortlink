import React from 'react'
import '../LinkCards/LinkCards.css'
import view from './eye.png'
import link_img from '../../views/Home/link.png'
import earth from './earth.png'

function LinkCards({ title, slug, target, views, createdAt }) {
    return (
        <div className='main-card mx-auto p-4 my-4 rounded-3'>
            <h2 className='m-0'>{title || "<Untitled>"}</h2>
            <div className='d-flex gap-2 align-items-center'>
                <img src={link_img} alt='link' className='icon' />
                <a href={`${process.env.REACT_APP_API_URL}/${slug}`} className='short-url'>{process.env.REACT_APP_API_URL}/${slug} </a>
            </div>
            <div className='d-flex gap-2 align-items-center'>
                <img src={earth} alt='views' className='icon' />
                <a href={target} target='_blank' className='target-url'>{target}</a>
            </div>

            <span className='views d-flex gap-3 align-items-center' ><img src={view} alt='views' className='view-icon' /> {views}</span>
            <span className='timestamp'>{createdAt}</span>
        </div>
    )
}

export default LinkCards
