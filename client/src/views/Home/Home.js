import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css';
import { toast, Toaster } from 'react-hot-toast'
import LinkCards from './../../components/LinkCards/LinkCards.js';
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
    if (response.data.success) {
      toast.success("Link creaated Successfully")
      // setlinkdata = ({
      //   title: "",
      //   target: "",
      //   slug: ""
      // })
    }
    else {
      toast.error(response.data.message)
    }

  }
  const getAllLinks = async () => {

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/links`)
    setlinks(response.data.data)
    toast.success("All Links Fetched Successfully")

  }
  useEffect(() => {
    getAllLinks()
  }, [])
  return (
    <div>
      <div className='d-flex align-items-center gap-3 justify-content-center'>
        <img src={linkicon} alt='link-icon' className='link-icon d-block ' />
        <h1 className='header'> Link Shortner</h1>
      </div>

      <form className='input-form p-4 rounded-2'>
        <div className='d-block d-flex flex-wrap justify-content-around '>
          <input type="text" className='form-control' placeholder="title" value={linkdata.title} onChange={(e) => setlinkdata({ ...linkdata, title: e.target.value })} />
          <input type="text" className='form-control' placeholder="target" value={linkdata.target} onChange={(e) => setlinkdata({ ...linkdata, target: e.target.value })} />
          <input type="text" className='form-control' placeholder="slug" value={linkdata.slug} onChange={(e) => setlinkdata({ ...linkdata, slug: e.target.value })} />
        </div>
        <button type='button' className='btn btn-success d-block mx-auto mt-4 ' onClick={create}>Create</button>

      </form>

      <h2>Your Short Links</h2>
      <div className='link-cards'>
        {links.map((link, i) => {
          const { title, slug, target, views, createdAt } = link

          return (
            <LinkCards title={title}
              slug={slug}
              target={target}
              views={views}
              createdAt={createdAt} />)
        })}
      </div>

      <Toaster />

    </div>
  )
}


export default Home