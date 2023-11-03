import React from 'react'

export default function Profile() {
  return (
    <>
        <div className='w-fill h-auto text-center pb-10 bg-slate-500'>
                <div className='ProfIcon pt-10 ml-[46%]'>
                    <img className="w-[150px] h-[150px] rounded-full" src={`https://api.multiavatar.com/${localStorage.getItem('UserName')}.svg`} alt="Rounded avatar" />

                </div>
                <div className='text-center'>
                    <p className='text-xl font-bold mt-5 capitalize'>{localStorage.getItem("UserName")}</p>
                    <p className='text-xl font-bold mt-5'>{localStorage.getItem("UserEmail")}</p>
                </div>
        </div>
        <div className='Add-Preferences'>

        </div>
    </>
  )
}
