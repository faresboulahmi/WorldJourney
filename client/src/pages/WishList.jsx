import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TourCard from '../components/TourCard.jsx'
import Swal from 'sweetalert2';
import { clear } from '../redux/wishList/wishListSlice.js';
import { url } from '../url.js';
export default function WishList() {
  const {wishList} = useSelector((state) => state.wishList);
  const {currentUser} = useSelector((state) => state.user)
  const dispatch = useDispatch()

const clearWish = async () => {
  try {
    const res = await fetch(`${url}/api/admin/update/${currentUser._id}` , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        ...currentUser,
        wishList: [],
      }),
    });
    const data = res.json();
  } catch (error) {
    console.log(error)
  }
}
const swalDelete = () => {
  Swal.fire({
    text: "are you sure delete this comment ",
    showCancelButton: true,
    cancelButtonColor: "#4086F4",
    confirmButtonColor: "#FA7436",
  }).then((isConfirm) => {
    if (isConfirm.isConfirmed) {
      dispatch(clear());
      clearWish();
    }
  });
};

  return (
    <div className='m-auto max-w-6xl pt-10 '>
     <div className='flex flex-row flex-wrap gap-4 p-2 m-auto min-h-[60vh]'>
     {wishList.length > 0 && currentUser ?  (<div  className='flex flex-col w-full m-auto '>
     <div className='flex flex-row flex-wrap gap-4 p-2  justify-center'>
     {wishList.map((tour) => (<TourCard key={tour._id} tour={tour}/>))}
     </div>
      <button className='p-2 border-2 border-red-500 rounded-lg mx-auto my-8 text-red-500 hover:bg-red-500 hover:text-white font-semibold transition-all max-h-14 ' onClick={() => swalDelete()}>Delete all tour from wishList</button>
     </div>) : currentUser && !wishList.length  && ( 
      <div className='text-2xl text-slate-700 font-semibold m-auto my-20'>You don't have any tour your wishList  </div>
     )}
     </div>
    </div>
  )
}
