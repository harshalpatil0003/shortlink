import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css';
import { toast, Toaster } from 'react-hot-toast'
import LinkCards from './../../components/LinkCards/LinkCards.js';
import linkicon from '../Home/link.png'

function Home() {
  const [links, setlinks] = useState([])
  const [user, setUser] = useState({})

  // useEffect({
  //   if(currentUser){

  //   }
  // },[])

  //logout function
  const logout = () => {
    localStorage.clear()
    toast.success("Logged out successfully..")
    setTimeout(() => {
      window.location.href = '/signin'
    }, 1000)
  }

  // const fetchedlinks = async () => {
  //   if (!user._id) {
  //     return
  //   }
  //   toast.loading("Loading Links")
  //   const response = await axios.get(`${process.env.REACT_APP_API_URL}/links?userId=${user._id}`)
  //   toast.dismiss()
  //   setlinks = (response.data.data)
  // }
  // useEffect(() => {
  //   fetchedlinks()
  // }, [user])

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser) {
      setUser(currentUser)
    }
    if (!currentUser) {
      window.location.href = '/signin'
    }
  }, [])

  const [linkdata, setlinkdata] = useState({
    title: "",
    target: "",
    slug: "",
  });

  const create = async () => {
    const { title, slug, target } = linkdata;
    if (!title || !target || !slug) {
      toast.error("Please fill all the fields")
      return
    }

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/link`,
      {
        target,
        title,
        slug,
        user
      })

    if (response.data.success) {
      toast.success("Link created Successfully")
      setlinkdata({
        title: "",
        target: "",
        slug: ""
      })
    }

    else {
      toast.error(response.data.message)
    }

  }
  const getAllLinks = async () => {
    if (!user._id) {
      return
    }
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/links?userId=${user._id}`)
    
      setlinks(response.data.data)
      toast.dismiss()
    
    toast.success("All Links Fetched Successfully")

  }
  useEffect(() => {
    getAllLinks()
  }, [user])

  
  return (
    <div>
      <div className='d-flex align-items-center gap-3 justify-content-center'>
        <img src={linkicon} alt='link-icon' className='link-icon d-block ' />
        <h1 className='header'>Short.ly</h1>
        <button type='button' className='btn btn-danger'
          onClick={logout}
        >Logout</button>

      </div>

      <form className='input-form p-4 rounded-2'>
        <div className='d-block d-flex flex-wrap justify-content-around '>
          <input type="text" className='form-control' placeholder="title" value={linkdata.title} onChange={(e) => setlinkdata({ ...linkdata, title: e.target.value })} />
          <input type="text" className='form-control' placeholder="target" value={linkdata.target} onChange={(e) => setlinkdata({ ...linkdata, target: e.target.value })} />
          <input type="text" className='form-control' placeholder="slug" value={linkdata.slug} onChange={(e) => setlinkdata({ ...linkdata, slug: e.target.value })} />

        </div>
        <button type='button' className='btn btn-success d-block mx-auto mt-4 ' onClick={create}>Create</button>

      </form>

      <h2 className='user-link-header my-3'>Hello {user.name}</h2>
      <div className='link-cards'>
        {links.map((link) => {
          const { title, slug, target, views, createdAt} = link;

          return (
            <LinkCards
              // key={_id}
              // _id={_id}
              title={title}
              slug={slug}
              target={target}
              views={views}
              createdAt={createdAt}
            />)
        })
        }

      </div>

      <Toaster />

    </div>
  )

}




export default Home