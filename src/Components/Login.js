import React ,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {query, where, getDocs } from 'firebase/firestore'
import { usersref } from '../Fairbase/firebase';
import { Appstate } from "../App";
import bcrypt from 'bcryptjs'
import swal from "sweetalert";
import { useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';


const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const[loading,setLoading] = useState(false);
  const[form, setForm] = useState({
    mobile : "",
    password : ""
  })

  const  login = async () => {
    setLoading(true);
    try{
      const quer = query(usersref,where('mobile' , '==', form.mobile));
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if(isUser){
          useAppstate.setLogin(true);
          useAppstate.setUserName(_data.name);
          swal({
            text : "Logged In", 
            icon : "success",
            buttons : false,
            timer : 2000,
          });
          navigate('/')
        }else{
          swal({
            text : "invalid userId or password",
            icon : "error",
            buttons : false,
            timer : 2000,
          });
        }
      })
 
    }catch(error){
      swal({
        text : error.message,
        icon : "error",
        buttons : false,
        timer : 2000,
      });
    }
    setLoading(false);
  }

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-500">login to your account</h2>
        </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6" >
        <div>
          <label for="mobile" class="block text-sm font-medium leading-6 text-gray-500">Mobile number</label>
          <div class="mt-2">
            <input id="mobile"  type="text"  required 
            value={form.mobile}
            onChange={(e) => {setForm ({...form, mobile : e.target.value})}}
            class="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none p-3"/>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-500">Password</label>

          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" 
            value={form.password}
            onChange={(e) => {setForm ({...form, password : e.target.value})}}
            autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none p-3"/>
          </div>
        </div>

        <div>
          <button onClick={login} type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loading ? <TailSpin height={20} color='white'/> : "Login"}</button>
        </div>
      </div>

      <p class="mt-10 text-center  text-gray-500 text-lg">
        Not have an account?
        <Link to={"/signup"} class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">sign up</Link>
      </p>
    </div>
</div>
  )
}

export default Login