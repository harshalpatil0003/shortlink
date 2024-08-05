import React, { useState } from 'react'
import axios from 'axios'
import './Home.css';
import { toast, Toaster } from 'react-hot-toast'
import linkCards from '../../components/links-cards/linkCards.js';
import linkicon from '../Home/link.png'
function Home() {
  const [linkdata, setlinkdata] = useState({
    title: "",
    target: "",
    slug: ""

  });
  const [links, setlinks] = useState([]);
  const create = async () => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/link`, linkdata)
  }
  return (
    <div>
      <div className='d-flex align-items-center gap-3 justify-content-center'>
        <img src={linkicon} alt='link-icon' className='link-icon d-block ' />
        <h1 className='header'> Link Shortner</h1>
      </div>
      <div className=''>
        <form className='input-form p-4 rounded-2'>
          <div className='d-block d-flex flex-wrap justify-content-around '>
            <input type="text" className='form-control' placeholder="title" value={linkdata.title} onChange={(e) => setlinkdata({ ...linkdata, title: e.target.value })} />
            <input type="text" className='form-control' placeholder="target" value={linkdata.target} onChange={(e) => setlinkdata({ ...linkdata, target: e.target.value })} />
            <input type="text" className='form-control' placeholder="slug" value={linkdata.slug} onChange={(e) => setlinkdata({ ...linkdata, slug: e.target.value })} />
          </div>
          <button type='button' className='btn btn-success d-block mx-auto mt-4 ' onClick={create}>Create</button>
        </form>
        <div>
          <h2>Links</h2>
          <linkCards />
        </div>
      </div>
      <Toaster title={links.title} />

    </div>
  )
}


export default Home