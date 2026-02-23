// import React, { useContext, useState } from 'react'
// import { AuthLayout } from '../../components/layouts/AuthLayout'
// import { Link, useNavigate} from 'react-router-dom';
// import { Input } from '../../components/inputs/Input';
// import { validateEmail } from '../../utils/helper';

// import { axiosInstance } from '../../utils/axiosInsatce';
// import { API_PATHS } from '../../utils/apiPaths';
// import { uploadimage } from '../../utils/uploadImage';
// import { UserContext } from '../../context/userContext';

// import { ProfilePhotoSelector } from '../../components/inputs/ProfilePhotoSelector';

// export const SignUp = () => {
//   const [profilePic, setprofilePic] = useState(null);
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password,setPassword] = useState("");
  
//   const [error, SetError] = useState(null);

//   const {updateUser} = useContext(UserContext);

//   const navigate = useNavigate();

//   //Handle signup form submit

//   const handleSignUp = async (e) =>{
//     e.preventDefault();

//     let profileImageUrl = "";

//     if(!fullName) {
//       SetError("Please enter your name")
//       return;
//     }

//     if(!validateEmail(email)){
//       SetError("Please enter a valid email address")
//       return;

//     }

//     if(!password){
//       SetError("Please enter the password")
//     return;

//   }

//   SetError("")

//   //sighn up api call
// try {

//   //upload image if present
//   if(profilePic) {
//     const imageUploadRes = await uploadimage(profilePic)
//     profileImageUrl = imageUploadRes.imageUrl || ""
//   }
//   const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
//     fullName,
//     email,
//     password,
//     profileImageUrl,
//   });

//   const { token, user } = response.data;

//   // if(token) {
//   //   localStorage.setItem("token",token)
//   //   updateUser(user)
//   //   navigate("/dashboard")
//   // }

//   alert("Signup successful! Please login.");
// navigate("/login");

// } catch (error) {
//   if(error.response && error.response.data.message) {
//     SetError(error.response.data.message)
//   }else{
//     SetError("Something went wrong.please try again")
//   }
// }
// }

//     return (
//     <AuthLayout>
//       <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center '>
//         <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
//         <p className='text-xs text-slate-700 mt-[5px] mb-6'>
//           Join us today by entering your details below.
//         </p>

//         <form onSubmit={handleSignUp}>

//           <ProfilePhotoSelector image={profilePic} setImage={setprofilePic}/>

//           <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

// <Input 
// value={fullName}
// onChange={({ target }) => setFullName(target.value)}
// label="Full Name"
// placeholder="Jhone"
// type="text"
// />

// <Input 
//   value = {email}
//   onChange={({target}) => setEmail(target.value)}
//   label = "Email Address"
//   placeholder = "abhi@example.com"
//   type = "text"
//    />

// <div className='col-span-2'>
//  <Input 
//   value = {password}
//   onChange={({target}) => setPassword(target.value)}
//   label = "Password"
//   placeholder = "Min 8 characters"
//   type = "password"
//   autoComplete="new-password"
//    />
//    </div>

//           </div>

// {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
//    <button type="submit" className='btn-primary'>
//     SIGN UP
//    </button>
//    <p className='text-[13px] text-slate-800 mt-3'>
//    Already have an account?{""}
//     <Link className='font-medium text-primary underline' to="/login">
//     LOGIN
//     </Link>
//    </p>


//         </form>

//       </div>
//     </AuthLayout>
//   )
// }










export const SignUp = () => {
  const [profilePic, setprofilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, SetError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) return SetError("Please enter your name");
    if (!validateEmail(email)) return SetError("Please enter a valid email address");
    if (!password) return SetError("Please enter the password");

    SetError("");

    try {
      if (profilePic) {
        const imageUploadRes = await uploadimage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      SetError(error.response?.data?.message || "Something went wrong. Please try again");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-center min-h-screen">
        
        <h3 className="text-lg sm:text-xl font-semibold text-black">
          Create an Account
        </h3>

        <p className="text-xs sm:text-sm text-slate-700 mt-1 mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp} className="space-y-4">

          {/* Profile Image */}
          <div className="flex justify-center md:justify-start">
            <ProfilePhotoSelector image={profilePic} setImage={setprofilePic} />
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
            />

            <div className="md:col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
                autoComplete="new-password"
              />
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-xs">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            SIGN UP
          </button>

          {/* Login Link */}
          <p className="text-xs sm:text-sm text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-blue-600 underline" to="/login">
              LOGIN
            </Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  );
};
