
import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import axiosInstance from "../../../Constarints/axios/userAxios";
import { userEndpoints } from "../../../Constarints/endpoints/userEndpoints";

interface PrivateRouteProps {
  children: ReactNode;
}

const UserBlock: React.FC<PrivateRouteProps> = ({ children }) => {
  const [isBlocked, setIsBlocked] = useState<boolean | null>(null);
  const user = localStorage.getItem('id');

  useEffect(() => {
    const verifyUserBlock = async () => {
      try {
        const result = await axiosInstance.post(userEndpoints.fetchUserData, { 
            id: user,
            loginUserId: ""
          });
        // Assuming the API returns a boolean or a specific field indicating if the user is blocked
        setIsBlocked(result.data.result.user_data._doc.isBlocked); // Adjust this based on your API response
        console.log(result.data.result.user_data._doc.isBlocked,"data in user block check &&&&&&&&&&&&")
      } catch (error) {
        console.error("Error verifying user block status:", error);
        setIsBlocked(true); // Assume user is blocked if there's an error
      }
    };

    if (user) {
      verifyUserBlock();
    } else {
      setIsBlocked(true); // Assume user is blocked if there's no user id
    }
  }, [user]);

  if (isBlocked === null) {
    return null; // or a loading spinner
  }

  return isBlocked ? <Navigate to='/*' /> : <>{children}</>;
};

export default UserBlock;

