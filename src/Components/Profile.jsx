// import React, { useRef, useState } from "react";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { addUserData } from "../Utils/UserSlice";

// function fileToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// }

// const Profile = () => {
//   const userData = useSelector((store) => store.user);
//   const nav = useNavigate();
//   const inputRef = useRef(null);
//   const [temp, setTemp] = useState("");
//   const dispatch = useDispatch();

//   // ✅ Guard (important)
//   if (!userData) {
//     return (
//       <div className="h-screen flex items-center justify-center text-xl font-semibold">
//         Loading...
//       </div>
//     );
//   }

//   async function onChangeHandler(e) {
//     if (!e.target.files?.[0]) return;

//     try {
//       const base64pic = await fileToBase64(e.target.files[0]);
//       setTemp(URL.createObjectURL(e.target.files[0]));

//       const res = await axios.patch(
//         `${import.meta.env.VITE_DOMAIN}/api/profile/${userData?._id}/profile-picture`,
//         { profilePicture: base64pic },
//         { withCredentials: true }
//       );

//       dispatch(addUserData(res.data.data));
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
//       <Navbar />

//       <div className="flex h-full">
//         <Sidebar />

//         <div className="w-[60vw] mx-auto px-6">
//           {/* Profile Header */}
//           <div className="flex items-center gap-16 mt-12">
//             {/* Profile Image */}
//             <input
//               onChange={onChangeHandler}
//               ref={inputRef}
//               type="file"
//               className="hidden"
//             />

//             <div className="flex justify-center w-1/4">
//               <img
//                 onClick={() => inputRef.current?.click()}
//                 className="h-[170px] w-[170px] rounded-full object-cover shadow-xl ring-4 ring-pink-300 cursor-pointer"
//                 src={
//                   temp ||
//                   userData?.profilePicture ||
//                   "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//                 }
//                 alt="profile"
//               />
//             </div>

//             {/* Profile Info */}
//             <div className="flex flex-col gap-5 w-3/4">
//               <div className="flex items-center gap-6">
//                 <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
//                   {userData?.firstName} {userData?.lastName}
//                 </p>

//                 <button
//                   onClick={() => nav("/profile/edit")}
//                   className="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 active:scale-95 transition"
//                 >
//                   Edit Profile
//                 </button>
//               </div>

//               {/* Stats */}
//               <div className="flex gap-10 text-base text-gray-700">
//                 <p>
//                   <span className="font-bold text-gray-900">
//                     {userData?.posts?.length || 0}
//                   </span>{" "}
//                   posts
//                 </p>

//                 <p>
//                   <span className="font-bold text-gray-900">
//                     {userData?.followers?.length || 0}
//                   </span>{" "}
//                   followers
//                 </p>

//                 <p>
//                   <span className="font-bold text-gray-900">
//                     {userData?.following?.length || 0}
//                   </span>{" "}
//                   following
//                 </p>
//               </div>

//               {/* Bio */}
//               <p className="text-sm leading-6 text-gray-800 max-w-md italic">
//                 {userData?.bio || "No bio available"}
//               </p>
//             </div>
//           </div>

//           {/* Posts Grid */}
//           <div className="grid grid-cols-3 gap-2 mt-14">
//             {userData?.posts?.length > 0 ? (
//               userData.posts.map((item, index) => (
//                 <div
//                   key={item?._id}
//                   className="relative group rounded-xl overflow-hidden shadow-md"
//                 >
//                   <img
//     className="h-[300px] w-full object-cover transform group-hover:scale-110 transition duration-500"
//     src={
//         item?.media?.[0] ||
//         "https://placehold.co/300x300/png"  // ✅ via.placeholder → placehold.co
//     }
//     alt={`post-${index}`}
// />

//                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-lg transition">
//                     ❤ {item?.likes?.length || 0} &nbsp; 💬{" "}
//                     {item?.comments?.length || 0}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-3 text-center text-lg font-semibold text-gray-600 mt-10">
//                 No posts yet
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;









// import React, { useRef, useState } from "react";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { addUserData } from "../Utils/UserSlice";

// function fileToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// }

// const Profile = () => {
//   const userData = useSelector((store) => store.user);
//   const nav = useNavigate();
//   const inputRef = useRef(null);
//   const [temp, setTemp] = useState("");
//   const dispatch = useDispatch();

//   // ✅ Important Guard
//   if (!userData) {
//     return (
//       <div className="h-screen flex items-center justify-center text-xl font-semibold">
//         Loading...
//       </div>
//     );
//   }

//   async function onChangeHandler(e) {
//     if (!e.target.files?.[0]) return;

//     try {
//       const base64pic = await fileToBase64(e.target.files[0]);

//       setTemp(URL.createObjectURL(e.target.files[0]));

//       const res = await axios.patch(
//         `${import.meta.env.VITE_DOMAIN}/api/profile/${userData._id}/profile-picture`,
//         { profilePicture: base64pic },
//         { withCredentials: true }
//       );

//       dispatch(addUserData(res.data.data));
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
//       <Navbar />

//       <div className="flex h-full">
//         <Sidebar />

//         <div className="w-[60vw] mx-auto px-6">
//           {/* PROFILE HEADER */}
//           <div className="flex items-center gap-16 mt-12">
//             <input
//               onChange={onChangeHandler}
//               ref={inputRef}
//               type="file"
//               className="hidden"
//             />

//             {/* Profile Image */}
//             <div className="flex justify-center w-1/4">
//               <img
//                 onClick={() => inputRef.current?.click()}
//                 className="h-[170px] w-[170px] rounded-full object-cover shadow-xl ring-4 ring-pink-300 cursor-pointer"
//                 src={
//                   temp ||
//                   userData?.profilePicture ||
//                   "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//                 }
//                 alt="profile"
//               />
//             </div>

//             {/* Profile Info */}
//             <div className="flex flex-col gap-5 w-3/4">
//               <div className="flex items-center gap-6">
//                 <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
//                   {userData?.firstName} {userData?.lastName}
//                 </p>
//               </div>

//               {/* Stats */}
//               <div className="flex gap-10 text-base text-gray-700">
//                 <p>
//                   <span className="font-bold text-gray-900">
//                     {userData?.posts?.length || 0}
//                   </span>{" "}
//                   posts
//                 </p>

//                 <p>
//                   <span className="font-bold text-gray-900">
//                     {userData?.followers?.length || 0}
//                   </span>{" "}
//                   followers
//                 </p>

//                 <p>
//                   <span className="font-bold text-gray-900">
//                     {userData?.following?.length || 0}
//                   </span>{" "}
//                   following
//                 </p>
//               </div>

//               {/* Bio */}
//               <p className="text-sm leading-6 text-gray-800 max-w-md italic">
//                 {userData?.bio || "No bio available"}
//               </p>

//               {/* Buttons */}
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => nav("/profile/edit")}
//                   className="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 active:scale-95 transition"
//                 >
//                   Edit Profile
//                 </button>

//                 <button
//                   onClick={() => nav("/profile/edit/password")}
//                   className="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 active:scale-95 transition"
//                 >
//                   Change Password
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* POSTS GRID */}
//           <div className="grid grid-cols-3 gap-2 mt-14">
//             {userData?.posts?.length > 0 ? (
//               userData.posts.map((item, index) => (
//                 <div
//                   key={item._id}
//                   className="relative group rounded-xl overflow-hidden shadow-md"
//                 >
//                   <img
//                     className="h-[300px] w-full object-cover transform group-hover:scale-110 transition duration-500"
//                     src={
//                       item?.media?.[0] ||
//                       "https://placehold.co/300x300/png"
//                     }
//                     alt={`post-${index}`}
//                   />

//                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-lg transition">
//                     ❤ {item?.likes?.length || 0} &nbsp; 💬{" "}
//                     {item?.comments?.length || 0}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-3 text-center text-lg font-semibold text-gray-600 mt-10">
//                 No posts yet
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;










// import React, { useRef, useState } from "react";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { addUserData } from "../Utils/UserSlice";

// function fileToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.readAsDataURL(file);

//     reader.onload = () => resolve(reader.result);

//     reader.onerror = (error) => reject(error);
//   });
// }

// const Profile = () => {
//   const userData = useSelector((store) => store.user);
//   const nav = useNavigate();
//   const inputRef = useRef(null);
//   const [temp, setTemp] = useState("");
//   const dispatch = useDispatch();

//   // Loading guard
//   if (!userData) {
//     return (
//       <div className="h-screen flex items-center justify-center text-xl font-semibold">
//         Loading...
//       </div>
//     );
//   }

//   async function onChangeHandler(e) {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     try {
//       const base64pic = await fileToBase64(file);

//       // preview image
//       setTemp(URL.createObjectURL(file));

//       const res = await axios.patch(
//         `${import.meta.env.VITE_DOMAIN}/api/profile/${userData?._id}/profile-picture`,
//         { profilePicture: base64pic },
//         { withCredentials: true }
//       );

//       if (res?.data?.data) {
//         dispatch(addUserData(res.data.data));
//       }
//     } catch (err) {
//       console.log("Image Upload Error:", err);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
//       <Navbar />

//       <div className="flex h-full">
//         <Sidebar />

//         <div className="w-[60vw] mx-auto px-6">

//           {/* PROFILE HEADER */}
//           <div className="flex items-center gap-16 mt-12">

//             <input
//               onChange={onChangeHandler}
//               ref={inputRef}
//               type="file"
//               className="hidden"
//             />

//             {/* Profile Image */}
//             <div className="flex justify-center w-1/4">
//               <img
//                 onClick={() => inputRef.current?.click()}
//                 className="h-[170px] w-[170px] rounded-full object-cover shadow-xl ring-4 ring-pink-300 cursor-pointer"
//                 src={
//                   temp ||
//                   userData?.profilePicture ||
//                   "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//                 }
//                 alt="profile"
//               />
//             </div>

//             {/* Profile Info */}
//             <div className="flex flex-col gap-5 w-3/4">

//               <div className="flex items-center gap-6">
//                 <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
//                   {userData?.firstName} {userData?.lastName}
//                 </p>
//               </div>

//               {/* Stats */}
//               <div className="flex gap-10 text-base text-gray-700">

//                 <p>
//                   <span className="font-bold text-gray-900">
//                     {userData?.posts?.length || 0}
//                   </span>{" "}
//                   posts
//                 </p>

//                 <p>
//                   <span className="font-bold text-gray-900">
//                     {userData?.followers?.length || 0}
//                   </span>{" "}
//                   followers
//                 </p>

//                 <p>
//                   <span className="font-bold text-gray-900">
//                     {userData?.following?.length || 0}
//                   </span>{" "}
//                   following
//                 </p>

//               </div>

//               {/* Bio */}
//               <p className="text-sm leading-6 text-gray-800 max-w-md italic">
//                 {userData?.bio || "No bio available"}
//               </p>

//               {/* Buttons */}
//               <div className="flex gap-2">

//                 <button
//                   onClick={() => nav("/profile/edit")}
//                   className="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 active:scale-95 transition"
//                 >
//                   Edit Profile
//                 </button>

//                 <button
//                   onClick={() => nav("/profile/edit/password")}
//                   className="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 active:scale-95 transition"
//                 >
//                   Change Password
//                 </button>

//               </div>

//             </div>
//           </div>

//           {/* POSTS GRID */}
//           <div className="grid grid-cols-3 gap-2 mt-14">

//             {userData?.posts?.length > 0 ? (
//               userData.posts.map((item, index) => (
//                 <div
//                   key={item?._id || index}
//                   className="relative group rounded-xl overflow-hidden shadow-md"
//                 >

//                   <img
//                     className="h-[300px] w-full object-cover transform group-hover:scale-110 transition duration-500"
//                     src={
//                       item?.media?.[0] ||
//                       "https://placehold.co/300x300/png"
//                     }
//                     alt={`post-${index}`}
//                   />

//                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-lg transition">
//                     ❤ {item?.likes?.length || 0} &nbsp; 💬 {item?.comments?.length || 0}
//                   </div>

//                 </div>
//               ))
//             ) : (
//               <div className="col-span-3 text-center text-lg font-semibold text-gray-600 mt-10">
//                 No posts yet
//               </div>
//             )}

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;








import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/axiosInstance";
import { addUserData } from "../Utils/UserSlice";
import imageCompression from "browser-image-compression";

// 🔥 convert to base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const Profile = () => {
  const userData = useSelector((store) => store.user);
  const nav = useNavigate();
  const inputRef = useRef(null);
  const [temp, setTemp] = useState("");
  const dispatch = useDispatch();

  if (!userData) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  async function onChangeHandler(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 🔥 AUTO COMPRESS
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1, // max 1MB
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });

      // preview
      setTemp(URL.createObjectURL(compressedFile));

      // convert to base64
      const base64pic = await fileToBase64(compressedFile);

      const res = await axiosInstance.patch(
        `/api/profile/${userData?._id}/profile-picture`,
        { profilePicture: base64pic },
        { withCredentials: true }
      );

      if (res?.data?.data) {
        dispatch(addUserData(res.data.data));
      }
    } catch (err) {
      console.log("Image Upload Error:", err);
      alert("Image upload failed ❌");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      <Navbar />

      <div className="flex h-full">
        <Sidebar />

        <div className="w-[60vw] mx-auto px-6">
          {/* PROFILE HEADER */}
          <div className="flex items-center gap-16 mt-12">
            <input
              onChange={onChangeHandler}
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
            />

            {/* Profile Image */}
            <div className="flex justify-center w-1/4">
              <img
                onClick={() => inputRef.current?.click()}
                className="h-[170px] w-[170px] rounded-full object-cover shadow-xl ring-4 ring-pink-300 cursor-pointer"
                src={
                  temp ||
                  userData?.profilePicture ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="profile"
              />
            </div>

            {/* Profile Info */}
            <div className="flex flex-col gap-5 w-3/4">
              <div className="flex items-center gap-6">
                <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
                  {userData?.firstName} {userData?.lastName}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-10 text-base text-gray-700">
                <p>
                  <span className="font-bold text-gray-900">
                    {userData?.posts?.length || 0}
                  </span>{" "}
                  posts
                </p>

                <p>
                  <span className="font-bold text-gray-900">
                    {userData?.followers?.length || 0}
                  </span>{" "}
                  followers
                </p>

                <p>
                  <span className="font-bold text-gray-900">
                    {userData?.following?.length || 0}
                  </span>{" "}
                  following
                </p>
              </div>

              {/* Bio */}
              <p className="text-sm leading-6 text-gray-800 max-w-md italic">
                {userData?.bio || "No bio available"}
              </p>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => nav("/profile/edit")}
                  className="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 active:scale-95 transition"
                >
                  Edit Profile
                </button>

                <button
                  onClick={() => nav("/profile/edit/password")}
                  className="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 active:scale-95 transition"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* POSTS GRID */}
          <div className="grid grid-cols-3 gap-2 mt-14">
            {userData?.posts?.length > 0 ? (
              userData.posts.map((item, index) => (
                <div
                  key={item?._id || index}
                  className="relative group rounded-xl overflow-hidden shadow-md"
                >
                  <img
                    className="h-[300px] w-full object-cover transform group-hover:scale-110 transition duration-500"
                    src={
                      item?.media?.[0] ||
                      "https://placehold.co/300x300/png"
                    }
                    alt={`post-${index}`}
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-lg transition">
                    ❤ {item?.likes?.length || 0} &nbsp; 💬{" "}
                    {item?.comments?.length || 0}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-lg font-semibold text-gray-600 mt-10">
                No posts yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;