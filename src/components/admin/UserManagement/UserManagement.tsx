import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';

type User = {
  id: number;
  email: string;
  gender: string;
  isBlocked: boolean;
};

const initialUsers: User[] = [
  { id: 1, email: 'user1@example.com', gender: 'Male', isBlocked: false },
  { id: 2, email: 'user2@example.com', gender: 'Female', isBlocked: false },
  { id: 3, email: 'user3@example.com', gender: 'Male', isBlocked: false },
  { id: 4, email: 'user4@example.com', gender: 'Female', isBlocked: false },
];

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const toggleBlockUser = (id: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isBlocked: !user.isBlocked } : user
      )
    );
  };

  return (
    <Box p={3} sx={{width:"100vh"}}>
      <Typography variant="h5" mb={2}>
        User List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary">
                    View Details
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={user.isBlocked ? 'secondary' : 'error'}
                    onClick={() => toggleBlockUser(user.id)}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;
