
import React, { useState } from 'react'
import { Search } from "react-feather";
import { Link, useNavigate } from 'react-router-dom';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

const menuItems = [
  {
    name: 'Popular',
    href: '/Popular',
  },
  {
    name: 'Top Rated',
    href: '/TopRated',
  },
  {
    name: 'Upcoming',
    href: '/UpComing',
  },
  {
    name: 'Explore',
    href: '/Explore'
  }
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {

  const [searchContent, setSearchContent] = useState();
  const navigate = useNavigate()

  const userid = localStorage.getItem("UserID")

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchContent !== '') {
      navigate('/SearchResult', {
        state: {
          searchData: searchContent
        }
      })
    }
    setSearchContent('');
  }
  const handleSignOut = (e) => {
    e.preventDefault()
    localStorage.clear()
    navigate('/Signin')
  }


  return (
    <div className="relative w-full bg-white sticky top-0">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-4 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <Link to='/' >
              <img src='./src/assets/Images/logo-no-background.png' className='MainLogo' />
            </Link>
          </span>
          <span></span>
        </div>

        <div className="sticky top-0 z-1">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="text-xl font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="z-1 log-search">
          <form onSubmit={handleSearch} className='flex' >
            <input type="text" className="search-box" placeholder="search" value={searchContent} onChange={(e) => setSearchContent(e.target.value)} />
            <button type='submit'><Search color="black" size={20} /></button>
          </form>
        </div>
        <div>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center  rounded-full bg-white mt-1  shadow-sm ring-1 ring-inset ring-black">
                <img className="w-10 h-10 rounded-full" src={`https://api.multiavatar.com/${localStorage.getItem('UserName')}.svg`} alt="Rounded avatar" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {userid ? (<div>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='/Profile'
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-800',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                  </div>) : (<div>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='/Signin'
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-800',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                  </div>)}
                  {userid ? (<div>
                    <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/Lists"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-800',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Lists
                      </a>
                    )}
                  </Menu.Item>
                  </div>) : (<div>
                    <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/Signin"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-800',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Lists
                      </a>
                    )}
                  </Menu.Item>

                  </div>)}
                  
                  {userid ? (<div>

                    <Menu.Item >
                      {({ active }) => (
                        <button
                          onClick={handleSignOut}
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block w-full px-4 py-2 text-left text-sm'
                          )} >
                          Sign-Out
                        </button>
                      )}
                    </Menu.Item>
                  </div>) : (<div>
                    <Menu.Item >
                      {({ active }) => (
                        <Link
                          to='/Signin'
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block w-full px-4 py-2 text-left text-sm'
                          )}
                        >
                          Sign-in
                        </Link>
                      )}
                    </Menu.Item>

                  </div>)}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

      </div>
    </div>
  )
}