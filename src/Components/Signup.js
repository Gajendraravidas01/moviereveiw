import React,{useState} from 'react'
import { Link} from 'react-router-dom'
import app from '../Fairbase/firebase'
import { getAuth, RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import swal from 'sweetalert';
import { TailSpin } from 'react-loader-spinner';
import { usersref } from '../Fairbase/firebase';
import { addDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs'
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app);
const Signup = () => {
 
  const navigate = useNavigate();
  const[form, setForm] = useState({
    name : "",
    mobile : "",
    password : ""
  })
  const[loading,setLoading] = useState(false)
  const[sendotp , setSendotp] = useState(false);
  const[otp, setOtp] = useState("");

  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        
      }
    }, auth);
  }

  const requestOTP  = () => {
    setLoading(true);
    generateRecaptha();
    let appVarifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth,`+91 ${form.mobile}`, appVarifier)
    .then(confirmationResult => {
      window.confirmationResult = confirmationResult;
      swal({
        text : "OTP sent",
        icon : "success",
        buttons : false,
        timer : 2000,
      });
      setSendotp(true);
      setLoading(false);
    }).catch((error) => {
      swal({
        text : 'something went wrong',
        icon : 'error',
        buttons : false,
        timer : 2000,
      })
      console.log(error);
    })
  }

  const varifyOTP =  () => {
    try{
      setLoading(true);
      window.confirmationResult.confirm(otp).then((result) => {
        uploaddata();
        swal({
          text : 'successfully registerd',
          icon : 'success',
          buttons : false,
          timer : 3000,
        });
        setLoading(false);
        navigate('/login');
      });
    }catch(error){
      swal({
        text : 'someting went wrong',
        icon : 'error',
        buttons : 'ok',
        timer : 3000,
      })
      console.log(error);
    }
  }

  const uploaddata = async () => {
    try{
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password, salt);
      await addDoc(usersref,{
        name : form.name,
        password : hash,
        mobile : form.mobile
      });
   }catch(error){
      console.log(error)
   }
  }

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      { sendotp ? 
        <div>
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-500">Sign up  your account</h2>
          </div>
          <div className='flex flex-col items-center'>
            <div className=" mt-5">
              <label for="otp" class="block text-sm font-medium leading-6 text-gray-500">OTP</label>
              <div class="mt-2">
                <input id="otp" name="email" type="text"  required 
                value={otp}
                onChange={(e) => {setOtp(e.target.value)}}
                class="block w-96 rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none pl-3"/>
              </div>
            </div>
            <div className='mt-10 w-96 '>
            <button onClick={varifyOTP} type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loading ?<TailSpin height={20} color='white'/> : "Confirm OTP"}</button>
            </div>
          </div>
        </div>
      :
      <div>
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-500">Sign up  your account</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div class="space-y-6" >
            <div>
              <label for="name" class="block text-sm font-medium leading-6 text-gray-500">Name</label>
              <div class="mt-2">
                <input id="name" name="email" type="text"  required 
                value={form.name}
                onChange={(e) => {setForm ({...form, name : e.target.value})}}
                class="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none pl-3"/>
              </div>
            </div>
            <div>
              <label for="mobile" class="block text-sm font-medium leading-6 text-gray-500">Mobile number</label>
              <div class="mt-2">
                <input id="mobile" name="email" type="text" 
                value={form.mobile}
                onChange={(e) => {setForm ({...form, mobile : e.target.value})}}
                required class="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none pl-3"/>
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
                autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none pl-3" />
              </div>
            </div>

            <div>
              <button onClick={requestOTP} type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{
                loading ?<TailSpin height={20} color='white'/>:"Send OTP"
              }</button>
            </div>
          </div>

          <p class="mt-10 text-center text-sm text-gray-500">
            already have account ?
            <Link to={"/login"} class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 text-base">login</Link>
          </p>
        </div>
      </div>
    }
    <div id="recaptha-container"></div>
    </div>

  )
}

export default Signup