import React, { useState } from 'react'
import { AuthLayout } from '../../components/layouts/AuthLayout'
import {Link, useNavigate} from 'react-router-dom';
import { Input } from '../../components/inputs/input';
import { validateEmail } from '../../utils/helper';


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, SetError] = useState(null);

  const navigate = useNavigate();

  //handle loginform submit
  const handleLogin = async (e) =>{
e.preventDefault();

if(!validateEmail(email)) {
  SetError("Please enter a valid email adddress.");
  return;
}

if(!password){
  SetError("Please enter tyhe password");
  return;
}
SetError("")

//Login API call
  }

    return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black+'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          please enter your details to login
        </p>

<form onSubmit = {handleLogin}>
  <Input 
  value = {email}
  onChange={({target}) => setEmail(target.value)}
  label = "Email Address"
  placeholder = "abhi@example.com"
  type = "text"
   />

 <Input 
  value = {password}
  onChange={({target}) => setPassword(target.value)}
  label = "Password"
  placeholder = "Min 8 characters"
  type = "password"
   />

   {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
   <button type="submit" className='btn-primary'>
    LOGIN
   </button>
   <p className='text-[13px] text-slate-800 mt-3'>
    Don't have an account?{""}
    <Link className='font-medium text-primary underline' to="/signup">
    SIGNUP
    </Link>
   </p>

</form>                                                                                                                                                                                                            


      </div>
    </AuthLayout>
  )
}
