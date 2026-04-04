// import React, { useRef, useState } from "react";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { addUserData } from "../Utils/UserSlice";
// import imageCompression from "browser-image-compression";
// import { Trash2 } from "lucide-react";
// import PostModal from "./PostModal";

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
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [posts, setPosts] = useState(userData?.posts || []);

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
//       const compressedFile = await imageCompression(file, {
//         maxSizeMB: 1,
//         maxWidthOrHeight: 800,
//         useWebWorker: true,
//       });
//       setTemp(URL.createObjectURL(compressedFile));
//       const base64pic = await fileToBase64(compressedFile);
//       const res = await axios.patch(
//         `${import.meta.env.VITE_DOMAIN}/api/profile/${userData?._id}/profile-picture`,
//         { profilePicture: base64pic },
//         { withCredentials: true }
//       );
//       if (res?.data?.data) dispatch(addUserData(res.data.data));
//     } catch (err) {
//       alert("Image upload failed ❌");
//     }
//   }

//   const handleDelete = async (e, postId) => {
//     e.stopPropagation();
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_DOMAIN}/api/posts/${postId}`,
//         { withCredentials: true }
//       );
//       setPosts(posts.filter((p) => p._id !== postId));
//     } catch (err) {
//       console.log("Delete error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
//       <Navbar />

//       <div className="flex h-full">
//         <Sidebar />

//         {/* ✅ Mobile responsive main content */}
//         <div className="w-full md:w-[60vw] mx-auto px-4 md:px-6 pb-24 md:pb-6">

//           {/* PROFILE HEADER */}
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-16 mt-8 md:mt-12">
//             <input onChange={onChangeHandler} ref={inputRef} type="file" accept="image/*" className="hidden" />

//             {/* Profile Image */}
//             <div className="flex justify-center">
//               <img
//                 onClick={() => inputRef.current?.click()}
//                 className="h-[110px] w-[110px] md:h-[170px] md:w-[170px] rounded-full object-cover shadow-xl ring-4 ring-pink-300 cursor-pointer"
//                 src={temp || userData?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
//                 alt="profile"
//               />
//             </div>

//             {/* Profile Info */}
//             <div className="flex flex-col gap-4 w-full md:w-3/4 items-center md:items-start text-center md:text-left">
//               <p className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
//                 {userData?.firstName} {userData?.lastName}
//               </p>

//               {/* Stats */}
//               <div className="flex gap-6 md:gap-10 text-sm md:text-base text-gray-700">
//                 <p><span className="font-bold text-gray-900">{posts?.length || 0}</span> posts</p>
//                 <p><span className="font-bold text-gray-900">{userData?.followers?.length || 0}</span> followers</p>
//                 <p><span className="font-bold text-gray-900">{userData?.following?.length || 0}</span> following</p>
//               </div>

//               {/* Bio */}
//               <p className="text-sm leading-6 text-gray-800 max-w-md italic">
//                 {userData?.bio || "No bio available"}
//               </p>

//               {/* Buttons */}
//               <div className="flex gap-2 flex-wrap justify-center md:justify-start">
//                 <button
//                   onClick={() => nav("/profile/edit")}
//                   className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 active:scale-95 transition"
//                 >
//                   Edit Profile
//                 </button>
//                 <button
//                   onClick={() => nav("/profile/edit/password")}
//                   className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 active:scale-95 transition"
//                 >
//                   Change Password
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* POSTS GRID */}
//           <div className="grid grid-cols-3 gap-1 md:gap-2 mt-10 md:mt-14">
//             {posts?.length > 0 ? (
//               posts.map((item, index) => (
//                 <div
//                   key={item?._id || index}
//                   onClick={() => setSelectedPost(item)}
//                   className="relative group rounded-xl overflow-hidden shadow-md cursor-pointer"
//                 >
//                   <img
//                     className="h-[120px] md:h-[300px] w-full object-cover transform group-hover:scale-110 transition duration-500"
//                     src={item?.media?.[0] || "https://placehold.co/300x300/png"}
//                     alt={`post-${index}`}
//                   />
//                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-sm md:text-lg transition">
//                     ❤ {item?.likes?.length || 0} &nbsp; 💬 {item?.comments?.length || 0}
//                   </div>
//                   <button
//                     onClick={(e) => handleDelete(e, item._id)}
//                     className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition z-10"
//                   >
//                     <Trash2 size={12} />
//                   </button>
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

//       {selectedPost && (
//         <PostModal post={selectedPost} setUseModal={() => setSelectedPost(null)} />
//       )}
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
// import imageCompression from "browser-image-compression";
// import { Trash2 } from "lucide-react";
// import PostModal from "./PostModal";

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
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [posts, setPosts] = useState(userData?.posts || []);
//   const [deleteConfirm, setDeleteConfirm] = useState(null) // ✅ confirm state

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
//       const compressedFile = await imageCompression(file, {
//         maxSizeMB: 1,
//         maxWidthOrHeight: 800,
//         useWebWorker: true,
//       });
//       setTemp(URL.createObjectURL(compressedFile));
//       const base64pic = await fileToBase64(compressedFile);
//       const res = await axios.patch(
//         `${import.meta.env.VITE_DOMAIN}/api/profile/${userData?._id}/profile-picture`,
//         { profilePicture: base64pic },
//         { withCredentials: true }
//       );
//       if (res?.data?.data) dispatch(addUserData(res.data.data));
//     } catch (err) {
//       alert("Image upload failed ❌");
//     }
//   }

//   const handleDelete = async (postId) => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_DOMAIN}/api/posts/${postId}`,
//         { withCredentials: true }
//       );
//       setPosts(posts.filter((p) => p._id !== postId));
//       setDeleteConfirm(null)
//     } catch (err) {
//       console.log("Delete error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
//       <Navbar />

//       <div className="flex h-full">
//         <Sidebar />

//         <div className="w-full md:w-[60vw] mx-auto px-4 md:px-6 pb-24 md:pb-6">

//           {/* PROFILE HEADER */}
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-16 mt-8 md:mt-12">
//             <input onChange={onChangeHandler} ref={inputRef} type="file" accept="image/*" className="hidden" />

//             <div className="flex justify-center">
//               <img
//                 onClick={() => inputRef.current?.click()}
//                 className="h-[110px] w-[110px] md:h-[170px] md:w-[170px] rounded-full object-cover shadow-xl ring-4 ring-pink-300 cursor-pointer"
//                 src={temp || userData?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
//                 alt="profile"
//               />
//             </div>

//             <div className="flex flex-col gap-4 w-full md:w-3/4 items-center md:items-start text-center md:text-left">
//               <p className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
//                 {userData?.firstName} {userData?.lastName}
//               </p>

//               <div className="flex gap-6 md:gap-10 text-sm md:text-base text-gray-700">
//                 <p><span className="font-bold text-gray-900">{posts?.length || 0}</span> posts</p>
//                 <p><span className="font-bold text-gray-900">{userData?.followers?.length || 0}</span> followers</p>
//                 <p><span className="font-bold text-gray-900">{userData?.following?.length || 0}</span> following</p>
//               </div>

//               <p className="text-sm leading-6 text-gray-800 max-w-md italic">
//                 {userData?.bio || "No bio available"}
//               </p>

//               <div className="flex gap-2 flex-wrap justify-center md:justify-start">
//                 <button
//                   onClick={() => nav("/profile/edit")}
//                   className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 active:scale-95 transition"
//                 >
//                   Edit Profile
//                 </button>
//                 <button
//                   onClick={() => nav("/profile/edit/password")}
//                   className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 active:scale-95 transition"
//                 >
//                   Change Password
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* POSTS GRID */}
//           <div className="grid grid-cols-3 gap-1 md:gap-2 mt-10 md:mt-14">
//             {posts?.length > 0 ? (
//               posts.map((item, index) => (
//                 <div
//                   key={item?._id || index}
//                   onClick={() => setSelectedPost(item)}
//                   className="relative group rounded-xl overflow-hidden shadow-md cursor-pointer"
//                 >
//                   <img
//                     className="h-[120px] md:h-[300px] w-full object-cover transform group-hover:scale-110 transition duration-500"
//                     src={item?.media?.[0] || "https://placehold.co/300x300/png"}
//                     alt={`post-${index}`}
//                   />

//                   {/* Like/Comment overlay */}
//                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-sm md:text-lg transition">
//                     ❤ {item?.likes?.length || 0} &nbsp; 💬 {item?.comments?.length || 0}
//                   </div>

//                   {/* ✅ Delete button — desktop hover + mobile always visible */}
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       setDeleteConfirm(item._id)
//                     }}
//                     className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition z-10
//                     opacity-100 md:opacity-0 md:group-hover:opacity-100"  // ✅ mobile pe hamesha visible
//                   >
//                     <Trash2 size={12} />
//                   </button>
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

//       {/* ✅ Delete Confirm Modal */}
//       {deleteConfirm && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">
//             <p className="text-lg font-semibold text-gray-800 mb-2">Delete Post?</p>
//             <p className="text-sm text-gray-500 mb-6">Yeh post permanently delete ho jayegi!</p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setDeleteConfirm(null)}
//                 className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleDelete(deleteConfirm)}
//                 className="flex-1 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {selectedPost && (
//         <PostModal post={selectedPost} setUseModal={() => setSelectedPost(null)} />
//       )}
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
// import imageCompression from "browser-image-compression";
// import { Trash2 } from "lucide-react";
// import PostModal from "./PostModal";
// import ToggleSwitch from "./PrivacyBtn"; // ✅ ADD KIYA

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
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [posts, setPosts] = useState(userData?.posts || []);
//   const [deleteConfirm, setDeleteConfirm] = useState(null);

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
//       const compressedFile = await imageCompression(file, {
//         maxSizeMB: 1,
//         maxWidthOrHeight: 800,
//         useWebWorker: true,
//       });
//       setTemp(URL.createObjectURL(compressedFile));
//       const base64pic = await fileToBase64(compressedFile);
//       const res = await axios.patch(
//         `${import.meta.env.VITE_DOMAIN}/api/profile/${userData?._id}/profile-picture`,
//         { profilePicture: base64pic },
//         { withCredentials: true }
//       );
//       if (res?.data?.data) dispatch(addUserData(res.data.data));
//     } catch (err) {
//       alert("Image upload failed ❌");
//     }
//   }

//   const handleDelete = async (postId) => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_DOMAIN}/api/posts/${postId}`,
//         { withCredentials: true }
//       );
//       setPosts(posts.filter((p) => p._id !== postId));
//       setDeleteConfirm(null);
//     } catch (err) {
//       console.log("Delete error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
//       <Navbar />

//       <div className="flex h-full">
//         <Sidebar />

//         <div className="w-full md:w-[60vw] mx-auto px-4 md:px-6 pb-24 md:pb-6">

//           {/* PROFILE HEADER */}
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-16 mt-8 md:mt-12">
//             <input onChange={onChangeHandler} ref={inputRef} type="file" accept="image/*" className="hidden" />

//             <div className="flex justify-center">
//               <img
//                 onClick={() => inputRef.current?.click()}
//                 className="h-[110px] w-[110px] md:h-[170px] md:w-[170px] rounded-full object-cover shadow-xl ring-4 ring-pink-300 cursor-pointer"
//                 src={temp || userData?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
//                 alt="profile"
//               />
//             </div>

//             <div className="flex flex-col gap-4 w-full md:w-3/4 items-center md:items-start text-center md:text-left">
//               <p className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
//                 {userData?.firstName} {userData?.lastName}
//               </p>

//               <div className="flex gap-6 md:gap-10 text-sm md:text-base text-gray-700">
//                 <p><span className="font-bold text-gray-900">{posts?.length || 0}</span> posts</p>
//                 <p><span className="font-bold text-gray-900">{userData?.followers?.length || 0}</span> followers</p>
//                 <p><span className="font-bold text-gray-900">{userData?.following?.length || 0}</span> following</p>
//               </div>

//               <p className="text-sm leading-6 text-gray-800 max-w-md italic">
//                 {userData?.bio || "No bio available"}
//               </p>

//               <div className="flex gap-2 flex-wrap justify-center md:justify-start">
//                 <button
//                   onClick={() => nav("/profile/edit")}
//                   className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 active:scale-95 transition"
//                 >
//                   Edit Profile
//                 </button>
//                 <button
//                   onClick={() => nav("/profile/edit/password")}
//                   className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 active:scale-95 transition"
//                 >
//                   Change Password
//                 </button>
//               </div>

//               {/* ✅ PRIVATE ACCOUNT BUTTON ADD KIYA */}
//               <div className="w-full mt-4 bg-white/80 backdrop-blur-md p-3 rounded-xl shadow">
//                 <ToggleSwitch label="Private Account" />
//               </div>

//             </div>
//           </div>

//           {/* POSTS GRID */}
//           <div className="grid grid-cols-3 gap-1 md:gap-2 mt-10 md:mt-14">
//             {posts?.length > 0 ? (
//               posts.map((item, index) => (
//                 <div
//                   key={item?._id || index}
//                   onClick={() => setSelectedPost(item)}
//                   className="relative group rounded-xl overflow-hidden shadow-md cursor-pointer"
//                 >
//                   <img
//                     className="h-[120px] md:h-[300px] w-full object-cover transform group-hover:scale-110 transition duration-500"
//                     src={item?.media?.[0] || "https://placehold.co/300x300/png"}
//                     alt={`post-${index}`}
//                   />

//                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-sm md:text-lg transition">
//                     ❤ {item?.likes?.length || 0} &nbsp; 💬 {item?.comments?.length || 0}
//                   </div>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       setDeleteConfirm(item._id)
//                     }}
//                     className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition z-10
//                     opacity-100 md:opacity-0 md:group-hover:opacity-100"
//                   >
//                     <Trash2 size={12} />
//                   </button>
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

//       {deleteConfirm && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">
//             <p className="text-lg font-semibold text-gray-800 mb-2">Delete Post?</p>
//             <p className="text-sm text-gray-500 mb-6">Yeh post permanently delete ho jayegi!</p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setDeleteConfirm(null)}
//                 className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleDelete(deleteConfirm)}
//                 className="flex-1 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {selectedPost && (
//         <PostModal post={selectedPost} setUseModal={() => setSelectedPost(null)} />
//       )}
//     </div>
//   );
// };

// export default Profile;















import React, { useRef, useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUserData } from "../Utils/UserSlice";
import imageCompression from "browser-image-compression";
import { Trash2 } from "lucide-react";
import PostModal from "./PostModal";
import ToggleSwitch from "./PrivacyBtn";

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
  const [selectedPost, setSelectedPost] = useState(null);
  
  // ✅ FIX: Posts ko sync mein rakhne ke liye empty array se start karein
  const [posts, setPosts] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // ✅ NEW: Jab bhi Redux (userData) update ho, local posts state update ho jaye
  useEffect(() => {
    if (userData?.posts) {
      setPosts(userData.posts);
    }
  }, [userData]);

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
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });
      setTemp(URL.createObjectURL(compressedFile));
      const base64pic = await fileToBase64(compressedFile);
      const res = await axios.patch(
        `${import.meta.env.VITE_DOMAIN}/api/profile/${userData?._id}/profile-picture`,
        { profilePicture: base64pic },
        { withCredentials: true }
      );
      if (res?.data?.data) dispatch(addUserData(res.data.data));
    } catch (err) {
      alert("Image upload failed ❌");
    }
  }

  const handleDelete = async (postId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_DOMAIN}/api/posts/${postId}`,
        { withCredentials: true }
      );
      // Local state filter
      setPosts(prev => prev.filter((p) => p._id !== postId));
      setDeleteConfirm(null);
      
      // Optional: Refresh Redux too
      // dispatch(removePost(postId)); 
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      <Navbar />

      <div className="flex h-full">
        <Sidebar />

        <div className="w-full md:w-[60vw] mx-auto px-4 md:px-6 pb-24 md:pb-6">
          
          {/* PROFILE HEADER */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-16 mt-8 md:mt-12">
            <input onChange={onChangeHandler} ref={inputRef} type="file" accept="image/*" className="hidden" />

            <div className="flex justify-center">
              <img
                onClick={() => inputRef.current?.click()}
                className="h-[110px] w-[110px] md:h-[170px] md:w-[170px] rounded-full object-cover shadow-xl ring-4 ring-pink-300 cursor-pointer hover:opacity-90 transition"
                src={temp || userData?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt="profile"
              />
            </div>

            <div className="flex flex-col gap-4 w-full md:w-3/4 items-center md:items-start text-center md:text-left">
              <p className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
                {userData?.firstName} {userData?.lastName}
              </p>

              <div className="flex gap-6 md:gap-10 text-sm md:text-base text-gray-700">
                <p><span className="font-bold text-gray-900">{posts?.length || 0}</span> posts</p>
                <p><span className="font-bold text-gray-900">{userData?.followers?.length || 0}</span> followers</p>
                <p><span className="font-bold text-gray-900">{userData?.following?.length || 0}</span> following</p>
              </div>

              <p className="text-sm leading-6 text-gray-800 max-w-md italic">
                {userData?.bio || "No bio available"}
              </p>

              <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                <button
                  onClick={() => nav("/profile/edit")}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 active:scale-95 transition"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => nav("/profile/edit/password")}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 active:scale-95 transition"
                >
                  Change Password
                </button>
              </div>

              {/* PRIVATE ACCOUNT TOGGLE */}
              <div className="w-full mt-4 bg-white/80 backdrop-blur-md p-3 rounded-xl shadow">
                <ToggleSwitch label="Private Account" />
              </div>
            </div>
          </div>

          {/* POSTS GRID */}
          <div className="grid grid-cols-3 gap-1 md:gap-2 mt-10 md:mt-14">
            {posts && posts.length > 0 ? (
              posts.map((item, index) => (
                <div
                  key={item?._id || index}
                  onClick={() => setSelectedPost(item)}
                  className="relative group rounded-xl overflow-hidden shadow-md cursor-pointer aspect-square"
                >
                  <img
                    className="h-full w-full object-cover transform group-hover:scale-110 transition duration-500"
                    src={item?.media?.[0] || "https://placehold.co/300x300/png"}
                    alt={`post-${index}`}
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-sm md:text-lg transition">
                    ❤ {item?.likes?.length || 0} &nbsp; 💬 {item?.comments?.length || 0}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm(item._id);
                    }}
                    className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-20 text-lg font-semibold text-gray-500">
                No posts yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">
            <p className="text-lg font-semibold text-gray-800 mb-2">Delete Post?</p>
            <p className="text-sm text-gray-500 mb-6">Yeh post permanently delete ho jayegi!</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POST DETAIL MODAL */}
      {selectedPost && (
        <PostModal post={selectedPost} setUseModal={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

export default Profile;