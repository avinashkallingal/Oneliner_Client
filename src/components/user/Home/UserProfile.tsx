import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import axios from "axios";
import axiosInstance from "../../../Constarints/axios/userAxios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store/Store";
import ProfilePostCard from "./ProfilePostCard";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { toast } from "sonner";

export default function UserCard({ id }) {
  interface User {
    id?: number;
    username?: string;
    email?: string;
    gender?: string;
    isBlocked?: boolean;
    followers?: string[];
    followings?: string[];
    profilePicture?: string;
  }
  // const email = useSelector((state: RootState) => state.userAuth?.userData?.email);

  const navigate = useNavigate();
  const initialData = [{ username: "avinash" }];

  const email = localStorage.getItem("email");
  // const email:string="avinashkallingal@gmail.com"
  const [user, setUser] = React.useState<User[]>([]);
  const [post, setPost] = React.useState<any>([]);
  const [followHide,setFollowHide]=React.useState<boolean>()
  const userId = localStorage.getItem("id");

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axiosInstance.post(
        "http://localhost:4000/fetchUserData",
        { id: id ,loginUserId:userId}
      );
      console.log(result.data.result.user_data._doc, "data from user fetch");
      if (result.data.success) {
        setUser(result.data.result.user_data._doc);
        console.log(result.data.result.user_data.loginUserFollowings,"$%%$%$%$%$%$%$%$%$%$%$%$$$$$$$$$$$$$$$$")
        if (result.data.result.user_data.loginUserFollowings) {
          const found = result.data.result.user_data.loginUserFollowings.filter((val:any)=>val==userId)
          console.log(found," filter )()()()()()(")
          if (found) {
            setFollowHide(true)
          } else {
            setFollowHide(false)
          }
        }else{
        setFollowHide(false)
        }
      }

      const resultPost = await axiosInstance.get(
        `http://localhost:4000/post/getUserPosts?id=${id}`
      );
      console.log(resultPost.data.data, " data of user posts");
      if (resultPost.data.success) {
        setPost(resultPost.data.data);
      }
    };
    fetchData();
  }, []);
  const editAction = () => {
    navigate("/userProfileEdit");
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));
 
  const userCheck = () => {
    return id == userId;
  };
  const followCheck = () => {
    if (user.followings) {
      const found = user.followings.filter((val: any) => val == id);
      if (found) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleFollow=async()=>{
    const result=await axiosInstance.put(
      "http://localhost:4000/follow",
      { followId: id,userId:userId }
    );
    if(result.data.success){
      
      setFollowHide(true)
      console.log(result.data,"  data of follow from back end ********************")
      
      toast.info(followHide)
    
    }else{
      toast.info("follow error")
    }
  }

  const handleUnfollow=async()=>{
    const result=await axiosInstance.put(
      "http://localhost:4000/unFollow",
      { followId: id,userId:userId }
    );
    if(result.data.success){
      setFollowHide(false)
      console.log(result.data,"  data of follow from back end ********************")
     
    }else{
      toast.info("unfollow error")
    }
  }

  return (
    <>
      <Box
        sx={{
          width: "80%",
          position: "relative",

          marginTop: "12vh",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            display: "block",
          }}
        />
        <Card
          orientation="horizontal"
          sx={{
            width: "100%",
            flexWrap: "wrap",
            [`& > *`]: {
              "--stack-point": "500px",
              minWidth:
                "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
            },
            // make the card resizable for demo
            overflow: "auto",
            resize: "horizontal",
          }}
        >
          <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
            <img
              src={user.profilePicture}
              srcSet={user.profilePicture}
              loading="lazy"
              alt=""
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
            <Typography
              level="body-sm"
              textColor="text.tertiary"
              sx={{ fontWeight: "sm" }}
            >
              Email:{user.email}
            </Typography>

            <Typography
              level="body-sm"
              textColor="text.tertiary"
              sx={{ fontWeight: "sm" }}
            >
              Gender:{user.gender}
            </Typography>

            <Typography
              level="body-sm"
              textColor="text.tertiary"
              sx={{ fontWeight: "sm" }}
            >
              Language:{user.language}
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
              <div>
                <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                  Posts
                </Typography>
                <Typography sx={{ fontWeight: "lg" }}>0</Typography>
              </div>
              <div>
                <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                  Follower
                </Typography>
                <Typography sx={{ fontWeight: "lg" }}>
                  {user.followers?.length ?? 0}
                </Typography>
              </div>
              <div>
                <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                  Following
                </Typography>
                <Typography sx={{ fontWeight: "lg" }}>
                  {user.followings?.length ?? 0}
                </Typography>
              </div>
            </Sheet>
            {!userCheck() ? (
              <Box
                sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}
              >
                {followHide&&<Button variant="outlined" color="neutral" onClick={handleFollow}>
                    Follow
                  </Button>}
              {!followHide&&
                  <Button variant="outlined" color="danger" onClick={handleUnfollow}>
                    Unfollow
                  </Button>
                }
              </Box>
            ) : (
              <Button variant="solid" color="primary" onClick={editAction}>
                Edit
              </Button>
            )}
          </CardContent>
        </Card>

        <Grid container spacing={2}>
          {post.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProfilePostCard posts={[post]} />{" "}
              {/* Pass individual post to ProfilePostCard */}
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
