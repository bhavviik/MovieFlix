import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Folder } from 'react-feather';
import { Link } from 'react-router-dom';
export default function Lists() {

  const [lists, setLists] = useState([]);
  const [listItem, setListItem] = useState([]);
  const userID = localStorage.getItem('UserID');

  
  const getLists = async () => {
    if (userID) {
      await axios.post('http://localhost:3001/GetLists', { userID })
        .then(res => {
          setLists(res.data.data)
        })
        .catch((err) => console.log(err))
    }
  }
  
  function getListItem (e) {
        const listID = e.listID;
        axios.post('http://localhost:3001/getListItem', { listID } )
        .then(res => {
          setListItem(res.data)
        })
        .catch((err) => console.log(err))
  }

  console.log(lists)
  console.log(listItem)
  useEffect(() => {
    getLists();
  },[])
  return (
    <>
      <p className='text-3xl font-extrabold ml-20 mt-20'>Your Lists</p>
      <div className='flex h-auto mt-5 mr-[18%] ml-[12%] border-2 border-black rounded-lg flex-wrap bg-gray-200'>
        {lists.map((listItem) => (
          <div className='flex m-5 p-5 bg-gray-400 rounded-lg'>
              <p className='mr-10 text-black'>{listItem.listName}</p>
              <button onClick={() => getListItem({listID : listItem._id})}><Folder></Folder></button>
          </div>
        ))}
      </div>
    </>
  )
}
