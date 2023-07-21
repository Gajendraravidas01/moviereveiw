import React, { useState } from 'react'
// import { data } from '../data'
import Rating from '@mui/material/Rating';
import '../App.css'
import { useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { movieref } from '../Fairbase/firebase';
import { getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Card = () => {
    const[data, setData] = useState([]);
    const[loading,setLoading] = useState(false);
  
    useEffect(() => {
        async function getdata(){
            setLoading(true);
            const _data = await getDocs(movieref);
            _data.forEach((doc) => {
                setData((prev) => [...prev,{...(doc.data()), id : doc.id}])
            })
            setLoading(false);
        }
        getdata();
    },[])  

    return (
        <div className='flex justify-around flex-wrap m-5 mt-10'>
        {
            loading ? <div className=" w-full flex justify-center items-center"><ThreeDots/></div>:
                data.map((element,index) => {
                    return( <Link to={`/detail/${element.id}`}>
                        <div key={index} className='bg-gray-300 mt-10 box-border w-auto p-2 hover:-translate-y-4 transition-all duration-300 ease-in-out'>
                            <img className=' w-300'  src={element.Image} alt="" />
                            <div className="moviediscription p-3 box-border text-black text-lg font-semibold">
                                <h1 >{element.Title}</h1>
                                <h1 >{element.Year}</h1>
                                <Rating name="read-only" value={element.Rating/element.Rated} readOnly key={index} />
                            </div>
                        </div>
                        </Link>
                    )
                })
        }
        </div>
    )
}

export default Card