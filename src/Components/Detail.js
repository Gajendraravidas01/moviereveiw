import React, { useEffect, useState } from 'react'
import { Rating } from '@mui/material'
import { useParams } from 'react-router-dom'
import { doc ,getDoc} from 'firebase/firestore'
import { db } from '../Fairbase/firebase'
import { TailSpin } from 'react-loader-spinner'
import Review from './Review'


const Detail = () => {
    const{id} = useParams();
    const[loading, setLoading] = useState(false);
    const[data,setData] = useState({
        Title : "",
        Year : "",
        Image : "",
        Discription : "",
        Rating : 0,
        Rated : 0
    })
    useEffect(() => {
        async function getdata(){
            setLoading(true);
            const _doc = doc(db,"movies" , id);
            const _data = await getDoc(_doc);
            setData(_data.data());
            setLoading(false);
        }
        getdata();
    },[])
    
  return (
    <div className='flex justify-center  m-5 p-5 relative'>
        {
            loading ? <div className=" w-full flex justify-center items-center"><TailSpin/></div>:
            <React.Fragment>
                <img className='  sticky top-24 h-96' src={data.Image} alt="" />
                <div className='w-1/2 ml-5 text-4xl'>
                    <h1 className=' underline underline-offset-8 decoration-red-300'>{data.Title} <span className='text-lg '>({data.Year})</span> </h1>

                    <Rating name="read-only" value={data.Rating / data.Rated} readOnly className='mt-5'/>

                    <p className='text-lg mt-5'>{data.Discription}</p>
                    
                    <Review  id = {id} prevRating = {data.Rating} userRated = {data.Rated}/>
                </div>
            </React.Fragment>
        }
    </div>
  )
}

export default Detail