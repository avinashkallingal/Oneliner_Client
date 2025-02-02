// import * as React from "react";
// import AspectRatio from "@mui/joy/AspectRatio";
// import Box from "@mui/joy/Box";
// import Button from "@mui/joy/Button";
// import Card from "@mui/joy/Card";
// import CardContent from "@mui/joy/CardContent";
// import Typography from "@mui/joy/Typography";
// import Sheet from "@mui/joy/Sheet";
// import axiosInstance from "../../../Constarints/axios/userAxios";
// import { useNavigate } from "react-router-dom";
// import ProfilePostCard from "./ProfilePostCard";
// import Grid from "@mui/material/Grid";
// // import { Paper } from "@mui/material";
// // import { styled } from "@mui/material/styles";
// import { toast } from "sonner";
// import { userEndpoints } from "../../../Constarints/endpoints/userEndpoints";
// import { postEndpoints } from "../../../Constarints/endpoints/postEndpoints";
// import { IUser } from "../../../Interfaces/Iuser";

// export default function UserCard({ id }) {
//   console.log(id,"^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
//   // interface User {
//   //   id?: number;
//   //   username?: string;
//   //   email?: string;
//   //   gender?: string;
//   //   isBlocked?: boolean;
//   //   followers?: string[];
//   //   followings?: string[];
//   //   profilePicture?: string;
//   // }

//   const defaultUser: IUser = {
//     _id: undefined,
//     username: "",
//     name: "",
//     email: "",
//     about: "",
//     password: "",
//     gender: "",
//     language: "",
//     profilePicture: "",
//     followers: [],
//     followings: [],
//     isOnline: false,
//     isAdmin: false,
//     desc: "",
//     isBlocked: false,
//     created_at: undefined,
//   };

//   const navigate = useNavigate();

//   const [user, setUser] = React.useState<IUser>(defaultUser);
//   const [post, setPost] = React.useState<any>([]);
//   const [followFlag,setFollowFlag]=React.useState<boolean>(true)
//   const [followersCount,setFollowersCount]=React.useState<number>(0)
//   const [followingCount,setFollowingCount]=React.useState<number>(0)
//   const userId = localStorage.getItem("id");

//   React.useEffect(() => {
//     const fetchData = async () => {
//       const result = await axiosInstance.post(
//         userEndpoints.fetchUserData,
//         { id: id ,loginUserId:userId}
//       );
//       // console.log(result.data.result.user_data._doc.followers.length, "data count from user fetch");
//       console.log(result.data," result of useeffect fetch data")
//       if (result.data.success) {
//         setUser(result.data.result.user_data._doc);
//         setFollowersCount(result.data.result.user_data._doc.followers.length)
//         setFollowingCount(result.data.result.user_data._doc.followings.length)
//         console.log(result.data.result.user_data._doc,"&&&&&&&&&&&&&&&&user data")
//         console.log(result.data.result.user_data.loginUserFollowings,"$%%$%$%$%$%$%$%$%$%$%$%$$$$$$$$$$$$$$$$")

//         if (result.data.result.user_data.loginUserFollowings) {
//           const found = result.data.result.user_data.loginUserFollowings.filter((val:any)=>val.toString()==result.data.result.user_data._doc._id?.toString())
//           console.log(found," filter )()()()()()(")
//           if (found&&found.length>0) {
//             setFollowFlag(false)
//           } else {
//             setFollowFlag(true)
//           }
//         }
//         console.log(followFlag," follow flag current state")
//       }

//       const resultPost = await axiosInstance.get(
//         postEndpoints.getUserPosts(id)
//       );
//       console.log(resultPost.data.data, " data of user posts");
//       if (resultPost.data.success) {
//         setPost(resultPost.data.data);
//       }
//     };
//     fetchData();
//   }, []);
//   const editAction = () => {
//     navigate("/userProfileEdit");
//   };

//   // const Item = styled(Paper)(({ theme }) => ({
//   //   backgroundColor: "#fff",
//   //   ...theme.typography.body2,
//   //   padding: theme.spacing(0.5),
//   //   textAlign: "center",
//   //   color: theme.palette.text.secondary,
//   //   ...theme.applyStyles("dark", {
//   //     backgroundColor: "#1A2027",
//   //   }),
//   // }));

//   const userCheck = () => {
//     return id == userId;
//   };
//   // const followCheck = () => {
//   //   if (user.followings) {
//   //     const found = user.followings.filter((val: any) => val == id);
//   //     if (found) {
//   //       return true;
//   //     } else {
//   //       return false;
//   //     }
//   //   }
//   // };

//   const handleFollow=async()=>{
//     const result=await axiosInstance.put(
//       userEndpoints.follow,
//       { followId: id,userId:userId }
//     );
//     if(result.data.success){

//       setFollowFlag(false)
//       setFollowersCount((prev)=>prev + 1)
//       console.log(result.data,"  data of follow from back end ********************")

//       // toast.info("follow done")

//     }else{
//       toast.info("follow error")
//     }
//   }

//   const handleUnfollow=async()=>{
//     const result=await axiosInstance.put(
//       userEndpoints.unFollow,
//       { followId: id,userId:userId }
//     );
//     if(result.data.success){
//       setFollowFlag(true)
//       setFollowersCount((prev)=>prev - 1)
//       console.log(result.data,"  data of follow from back end ********************")

//     }else{
//       toast.info("unfollow error")
//     }
//   }

//   return (
//     <>
//       <Box
//         sx={{
//           width: "80%",
//           position: "relative",

//           marginTop: "12vh",
//         }}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             display: "block",
//           }}
//         />
//         <Card
//           orientation="horizontal"
//           sx={{
//             width: "100%",
//             flexWrap: "wrap",
//             [`& > *`]: {
//               "--stack-point": "500px",
//               minWidth:
//                 "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
//             },
//             // make the card resizable for demo
//             overflow: "auto",
//             resize: "horizontal",
//           }}
//         >
//           <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
//             <img
//               src={user.profilePicture}
//               srcSet={user.profilePicture}
//               loading="lazy"
//               alt=""
//             />
//           </AspectRatio>
//           <CardContent>
//             <Typography sx={{ fontSize: "xl", fontWeight: "lg" }}>
//               {user.username}
//             </Typography>
//             <Typography
//               level="body-sm"
//               textColor="text.tertiary"
//               sx={{ fontWeight: "lg" }}
//             >
//               {user.about}
//             </Typography>
//             <Typography
//               level="body-sm"
//               textColor="text.tertiary"
//               sx={{ fontWeight: "sm" }}
//             >
//               Email:{user.email}
//             </Typography>

//             <Typography
//               level="body-sm"
//               textColor="text.tertiary"
//               sx={{ fontWeight: "sm" }}
//             >
//               Gender:{user.gender}
//             </Typography>

//             <Typography
//               level="body-sm"
//               textColor="text.tertiary"
//               sx={{ fontWeight: "sm" }}
//             >
//               Language:{user.language}
//             </Typography>
//             <Sheet
//               sx={{
//                 bgcolor: "background.level1",
//                 borderRadius: "sm",
//                 p: 1.5,
//                 my: 1.5,
//                 display: "flex",
//                 gap: 2,
//                 "& > div": { flex: 1 },
//               }}
//             >
//               <div>
//                 <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
//                   Posts
//                 </Typography>
//                 <Typography sx={{ fontWeight: "lg" }}>0</Typography>
//               </div>
//               <div>
//                 <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
//                   Follower
//                 </Typography>
//                 <Typography sx={{ fontWeight: "lg" }}>
//                   {/* {user.followers?.length ?? 0} */}
//                   {followersCount??0}
//                 </Typography>
//               </div>
//               <div>
//                 <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
//                   Following
//                 </Typography>
//                 <Typography sx={{ fontWeight: "lg" }}>
//                   {/* {user.followings?.length ?? 0} */}
//                   {followingCount??0}
//                 </Typography>
//               </div>
//             </Sheet>
//             {!userCheck() ? (
//               <Box
//                 sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}
//               >
//                 {followFlag?(<Button variant="outlined" color="neutral" onClick={handleFollow}>
//                     Follow
//                   </Button>):(<Button variant="outlined" color="danger" onClick={handleUnfollow}>
//                     Unfollow
//                   </Button>)}
//               {/* {!followHide&&
//                   <Button variant="outlined" color="danger" onClick={handleUnfollow}>
//                     Unfollow
//                   </Button>
//                 } */}
//               </Box>
//             ) : (
//               <Button variant="solid" color="primary" onClick={editAction}>
//                 Edit
//               </Button>
//             )}
//           </CardContent>
//         </Card>

//         <Grid container spacing={2}>
//           {post.map((post, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <ProfilePostCard  posts={[post]} />{" "}
//               {/* Pass individual post to ProfilePostCard */}
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </>
//   );
// }

// import * as React from "react";
import React, { useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import axiosInstance from "../../../Constarints/axios/userAxios";
import { useNavigate } from "react-router-dom";
import ProfilePostCard from "./ProfilePostCard";
import Grid from "@mui/material/Grid";
import { toast } from "sonner";
import { userEndpoints } from "../../../Constarints/endpoints/userEndpoints";
import { postEndpoints } from "../../../Constarints/endpoints/postEndpoints";
import { IUser } from "../../../Interfaces/Iuser";
import UsersListModal from "./UserListModal";

function UserCard({ id }) {
  const navigate = useNavigate();

  const defaultUser: IUser = {
    _id: undefined,
    username: "",
    name: "",
    email: "",
    about: "",
    password: "",
    gender: "",
    language: "",
    profilePicture: "",
    followers: [],
    followings: [],
    isOnline: false,
    isAdmin: false,
    desc: "",
    isBlocked: false,
    created_at: undefined,
  };

  const [user, setUser] = useState<IUser>(defaultUser);
  const [post, setPost] = useState<any[]>([]);
  const [view, setView] = useState<"posts" | "savedPosts">("posts"); // Toggle between "posts" and "savedPosts"
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [followFlag, setFollowFlag] = useState<boolean>(true);
  const [followersListOpen, setFollowersListOpen] = useState<boolean>(false);
  const [followersListData, setFollowersListData] = useState<boolean>(false);
  const [followingsListOpen, setFollowingsListOpen] = useState<boolean>(false);
  const [followingsListData, setFollowingsListData] = useState<boolean>(false);

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosInstance.post(userEndpoints.fetchUserData, {
        id,
        loginUserId: userId,
      });

      if (result.data.success) {
        const userData = result.data.result.user_data._doc;
        setUser(userData);
        setFollowersCount(userData.followers.length);
        setFollowingCount(userData.followings.length);

        if (result.data.result.user_data.loginUserFollowings) {
          const isFollowing =
            result.data.result.user_data.loginUserFollowings.some(
              (val: any) => val.toString() === userData._id?.toString()
            );
          setFollowFlag(!isFollowing);
        }
      }

      await fetchPosts();
    };

    fetchData();
  }, []);

  const handleFollowers = async () => {
    setFollowersListOpen(true);
    console.log(userId, " user id from the  localstorage $$$$$$$$$$$$$");
    const result = await axiosInstance.get(userEndpoints.fetchFollowers, {
      params: { userId: id },
    });

    if (result.data.success) {
      console.log(
        result.data.followers_data,
        " this is the followers data #################"
      );
      setFollowersListData(result.data.followers_data);
    }
  };

  const handleFollowings = async () => {
    setFollowingsListOpen(true);
    console.log(userId, " user id from the  localstorage $$$$$$$$$$$$$");
    const result = await axiosInstance.get(userEndpoints.fetchFollowings, {
      params: { userId: id },
    });

    if (result.data.success) {
      console.log(
        result.data.followings_data,
        " this is the followings data #################"
      );
      setFollowingsListData(result.data.followings_data);
    }
  };

  const handleCloseFollowers = () => {
    setFollowersListOpen(false);
  };
  const handleCloseFollowings = () => {
    setFollowingsListOpen(false);
  };

  const fetchPosts = async () => {
    const resultPost = await axiosInstance.get(postEndpoints.getUserPosts(id));
    console.log(resultPost.data.data, "data on regullar fetch !!!!!!!!");
    if (resultPost.data.success) {
      setPost(resultPost.data.data);
      console.log("555555555555555555555555555");
    }
  };

  const fetchSavedPosts = async () => {
    try {
      const result = await axiosInstance.get(userEndpoints.getSavedPosts, {
        params: { userId: id },
      });
      if (result.data.success) {
        console.log(result.data.posts, " result form axios fetch");

        setPost(result.data.posts); // Update post state with saved posts
      } else {
        toast.error("error fetching saved posts");
        // setPost(result.data.posts);
      }
    } catch (error) {
      console.error("Error fetching saved posts:", error);
      console.log(error, "error in fetching post");
      toast.error("Failed to fetch saved postsghtrrt.");
    }
  };
  console.log("66666666666666666666666666666");
  const handleFollow = async () => {
    const result = await axiosInstance.put(userEndpoints.follow, {
      followId: id,
      userId,
    });
    if (result.data.success) {
      setFollowFlag(false);
      setFollowersCount((prev) => prev + 1);
    } else {
      toast.error("Error following user");
    }
  };

  console.log("77777777777777777777777777777777777");
  const handleUnfollow = async () => {
    const result = await axiosInstance.put(userEndpoints.unFollow, {
      followId: id,
      userId,
    });
    if (result.data.success) {
      setFollowFlag(true);
      setFollowersCount((prev) => prev - 1);
    } else {
      toast.error("Error unfollowing user");
    }
  };

  const userCheck = () => id === userId;

  console.log("8888888888888888888888888888888888");

  return (
    <>
      <Box
        sx={{
          width: "80%",
          position: "relative",
          marginTop: "12vh",
        }}
      >
        <Card
          orientation="horizontal"
          sx={{
            width: "100%",
            flexWrap: "wrap",
            overflow: "auto",
            resize: "horizontal",
          }}
        >
          <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
            <img
              src={user.profilePicture}
              srcSet={user.profilePicture}
              loading="lazy"
              alt="User Profile"
            />
          </AspectRatio>
          <CardContent>
            <Typography sx={{ fontSize: "xl", fontWeight: "lg" }}>
              {user.username}
            </Typography>
            <Typography
              level="body-sm"
              textColor="text.tertiary"
              sx={{ fontWeight: "lg" }}
            >
              {user.about}
            </Typography>
            <Typography level="body-sm" textColor="text.tertiary">
              Email: {user.email}
            </Typography>
            <Typography level="body-sm" textColor="text.tertiary">
              Gender: {user.gender}
            </Typography>
            <Typography level="body-sm" textColor="text.tertiary">
              Language: {user.language}
            </Typography>
            <Sheet
              sx={{
                bgcolor: "background.level1",
                borderRadius: "sm",
                p: 1.5,
                my: 1.5,
                display: "flex",
                gap: 2,
                "& > div": { flex: 1 },
              }}
            >
              {followersListOpen && (
                <UsersListModal
                  open={followersListOpen}
                  title="Followers List"
                  listData={followersListData}
                  onClose={handleCloseFollowers}
                />
              )}

              {followingsListOpen && (
                <UsersListModal
                  open={followingsListOpen}
                  title="Followings List"
                  listData={followingsListData}
                  onClose={handleCloseFollowings}
                />
              )}

              <div>
                <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                  Posts
                </Typography>
                <Typography sx={{ fontWeight: "lg" }}>{post.length}</Typography>
              </div>
              <div>
                <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                  Followers
                </Typography>
                <Typography
                  sx={{ fontWeight: "lg" }}
                  onClick={() => handleFollowers()}
                >
                  {followersCount ?? 0}
                </Typography>
              </div>
              <div>
                <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                  Followings
                </Typography>
                <Typography
                  sx={{ fontWeight: "lg" }}
                  onClick={() => handleFollowings()}
                >
                  {followingCount ?? 0}
                </Typography>
              </div>
              {/* <div>
                <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                  Following
                </Typography>
                <Typography sx={{ fontWeight: "lg" }}>
                  {followingCount ?? 0}
                </Typography>
              </div> */}
            </Sheet>
            {!userCheck() ? (
              <Box
                sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}
              >
                {followFlag ? (
                  <Button
                    variant="outlined"
                    color="neutral"
                    onClick={handleFollow}
                  >
                    Follow
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="danger"
                    onClick={handleUnfollow}
                  >
                    Unfollow
                  </Button>
                )}
              </Box>
            ) : (
              <Button
                variant="solid"
                color="primary"
                onClick={() => navigate("/userProfileEdit")}
              >
                Edit
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Buttons for toggling posts */}
        <Box sx={{ display: "flex", gap: 2, my: 2 }}>
          <Button
            variant={view === "posts" ? "solid" : "outlined"}
            onClick={() => {
              setView("posts");
              fetchPosts();
            }}
          >
            Posts
          </Button>
          {userId==id?
            (<Button
              variant={view === "savedPosts" ? "solid" : "outlined"}
              onClick={() => {
                setView("savedPosts");
                fetchSavedPosts();
              }}
            >
              Saved Posts
            </Button>):null
          }
        </Box>

        {/* Post Grid */}
        <Grid container spacing={2}>
          {(Array.isArray(post) ? post : post).map((post1, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProfilePostCard posts={post1} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
// Wrap with React.memo and export as default
export default React.memo(UserCard);
