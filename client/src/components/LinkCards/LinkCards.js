import React from 'react'
import '../LinkCards/LinkCards.css'
import view from './eye.png'
import link_img from '../../views/Home/link.png'
import axios from 'axios'
import earth from './earth.png'
import { toast, Toaster } from 'react-hot-toast'
import trash from '../../views/Home/trash.png'
import copy_link from '../LinkCards/copy.png'
import { useState } from 'react'
function LinkCards({ _id, title, slug, target, views, createdAt }) {
    const [copied, setCopied] = useState(false);
    const deleteLink = async () => {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/link/${_id}`)
        toast.success(response.data.message)

    }
    function copy() {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
        toast.success("Link Copied!")

    }

    return (
        <div className='main-card mx-auto p-3 my-4 rounded-3'>
            <h2 className='m-0 '>{title || "<Untitled>"}</h2>
            <div className='d-flex gap-2 align-items-center'>
                <img src={link_img} alt='link' className='icon' />
                <a href={`${process.env.REACT_APP_API_URL}/${slug}`} target='blank' className='short-url'>{process.env.REACT_APP_API_URL}/${slug} </a>
                <img src={copy_link} alt='copy-icon' className='icon'onClick={copy} style={{cursor:'pointer'}} />
            </div>

            
            <div className='d-flex gap-2 align-items-center'>
                <img src={earth} alt='views' className='icon' />
                <a href={target} target='_blank' className='target-url'>{target.substring(0, 40)}{target.length > 40 ? "..." : null}</a>
            </div>

            <button className='btn ' onClick={deleteLink}><img src={trash} alt='delete-icon' className=' btn-trash' /></button>

            <span className='views d-flex gap-3 align-items-center' ><img src={view} alt='views' className='icon' /> {views}</span>
            <span className='timestamp'>{new Date(createdAt).toLocaleString()}</span>
            <Toaster />
        </div>
    )
}

export default LinkCards
