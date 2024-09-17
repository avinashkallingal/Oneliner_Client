import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import axios from 'axios';
import axiosInstance from '../../../Constarints/axios/userAxios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store/Store';



export default function UserCard() {
  interface User {
    id?: number;
    username?: string;
    email?: string;
    gender?: string;
    isBlocked?: boolean;
    followers?:string[];
    followings?:string[];
    profilePicture?:string;
  
  }
  // const email = useSelector((state: RootState) => state.userAuth?.userData?.email);
 
  const navigate=useNavigate()
  const initialData=[{username:"avinash"}]

  const email=localStorage.getItem("email")
  // const email:string="avinashkallingal@gmail.com"
  const [user,setUser]=React.useState<User[]>([]);

  
    React.useEffect(() => {
     const fetchData=async()=>{
        const result=await axiosInstance.post("http://localhost:4000/fetchUserData",{email:email})
        console.log(result.data.result.user_data,"data from user fetch")
        if(result.data.success){
          setUser(result.data.result.user_data)
        }
     }
     fetchData();
    }, [])
    const editAction=()=>{
      navigate("/userProfileEdit")
    }
    
  return (
    <Box
      sx={{
        width: '80%',
        position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
        marginTop:"-25vh"
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          display: 'block',           
         
         
          
        }}
      />
      <Card
        orientation="horizontal"
        sx={{
          width: '100%',
          flexWrap: 'wrap',
          [`& > *`]: {
            '--stack-point': '500px',
            minWidth:
              'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
          },
          // make the card resizable for demo
          overflow: 'auto',
          resize: 'horizontal',
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
          <Typography sx={{ fontSize: 'xl', fontWeight: 'lg' }}>
            {user.username}
          </Typography>
          <Typography
            level="body-sm"
            textColor="text.tertiary"
            sx={{ fontWeight: 'lg' }}
          >
            {user.about}
          </Typography>
          <Typography
            level="body-sm"
            textColor="text.tertiary"
            sx={{ fontWeight: 'sm' }}
          >
          Email:{user.email}           
          </Typography>
          <Typography
            level="body-sm"
            textColor="text.tertiary"
            sx={{ fontWeight: 'sm' }}
          >
            Gender:{user.gender}
          </Typography>
          
          <Typography
            level="body-sm"
            textColor="text.tertiary"
            sx={{ fontWeight: 'sm' }}
          >
          
            Language:{user.language}
          </Typography>
          <Sheet
            sx={{
              bgcolor: 'background.level1',
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex',
              gap: 2,
              '& > div': { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                Posts
              </Typography>
              <Typography sx={{ fontWeight: 'lg' }}>0</Typography>
            </div>
            <div>
              <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                Followers
              </Typography>
              <Typography sx={{ fontWeight: 'lg' }}>{user.followers?.length??0}</Typography>
            </div>
            <div>
              <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
               Following
              </Typography>
              <Typography sx={{ fontWeight: 'lg' }}>{user.followings?.length??0}</Typography>
            </div>
          </Sheet>
          <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            <Button variant="outlined" color="neutral">
              Followers
            </Button>
            <Button variant="outlined" color="neutral">
              Following
            </Button>
            <Button variant="solid" color="primary" onClick={editAction}>
              Edit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

