import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@mui/material'
import { reviewref,db } from '../Fairbase/firebase';
import { addDoc,doc,updateDoc,query,where,getDocs} from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router';


const Review = ({id ,prevRating,userRated }) => {
    const useAppstate = useContext(Appstate);
    const navigate = useNavigate();
    const[rating,setRating] = useState(0);
    const[loading,setLoading] = useState(false);
    const[reviewlaoding, setreviewLoading] = useState(false);
    const[form , setForm ] = useState("");
    const[data,setData] = useState([]);
    const[added, setNewadded] = useState(0);
    
    const sendreview = async () => {
        setLoading(true);
        try{
            if(useAppstate.login){

                await addDoc(reviewref,{
                    Movieid : id,
                    Rating : rating,
                    Name : useAppstate.username,
                    Thought :form ,
                    Timestamp : new Date().getTime()
                })

                const ref = doc(db,"movies",id);
                await updateDoc(ref, {
                    Rating : prevRating + rating,
                    Rated : userRated + 1
                })

                setRating(0);
                setForm("");
                setNewadded(added + 1);
                swal({
                    title : "successfully send !",
                    icon : "success",
                    button : false,
                    timer : 2000
                })
            }else{
                navigate('/login')
            }
            }catch(error){
            swal({
                title : "failed !",
                icon : "error",
                button : false,
                timer : 2000
            })
        }
        setLoading(false);
    }

    useEffect(() => {
        async function getData(){
            setreviewLoading(true);
            let quer = query(reviewref,where('Movieid', '==',id))
            const querySnapshot = await getDocs(quer);
            querySnapshot.forEach((doc) => {
                setData((prev) => [...prev,doc.data()])
            })
            setreviewLoading(false);  
        }
        getData();
    },[added])
  return (
    <div className='w-full mt-3 border-t-4 pt-3'>    
        <Rating
            className=' bg-gray-500 rounded-lg'
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
            setRating(newValue);
        }}/>
        <input value={form} type="text" className='w-full bg-gray-700 text-lg h-10 p-3 rounded-t-lg border-gray-700 outline-none' placeholder='share your review with us.. ' onChange={(e) => setForm(e.target.value)}/>


        <button className='bg-green-500 h-10 w-full rounded-b-lg text-lg hover:bg-green-600 flex justify-center items-center' onClick={sendreview}> {loading ? <TailSpin height={25} color='white'  /> :'share'}</button>

        {
            reviewlaoding ?<div className='flex justify-center'><ThreeDots  /></div> : 
            <div>
                {
                    data.map((e,i) => {
                        return(
                            <div key={i} className=" bg-gray-800 mt-5  border-b">
                                <div  className='flex  mt-5 items-center pl-3  underline underline-offset-4'>
                                    <h1  className=' text-blue-400 text-lg'>{e.Name}</h1>
                                    <div className=" ml-4 pl-3"><h1  className=' text-white text-sm'>({new Date(e.Timestamp).toLocaleString()})</h1></div>
                                </div>
                                <Rating
                                    className=' bg-gray-800 rounded-lg pl-3'
                                    name="simple-controlled"
                                    value={e.Rating}/>
                                <div className="text-lg pl-3">{e.Thought}</div>
                            </div>
                        )
                    })
                }
            </div>
        }
    </div>
  )
}

export default Review