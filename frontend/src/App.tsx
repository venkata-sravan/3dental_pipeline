import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button, Box,
} from '@mui/material';
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import CreateJob from './components/CreateJob';
import ListJobs from './components/ListJobs';
import UpdateJob from './components/UpdateJob';
import DeleteJob from './components/DeleteJob';

const App = () => {
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Job Queue Management</Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ marginBottom: '20px' }}>
            <Button component={Link} to="/create" variant="contained" color="primary"  sx={{ margin: '10px' }}>
              Add Job
            </Button>
            <Button component={Link} to="/list" variant="contained" color="primary"  sx={{ margin: '10px' }}>
              Show Jobs
            </Button>
          </Box>
        </Container>
        <Routes>
          <Route path="/create" Component={CreateJob} />
          <Route path="/list" Component={ListJobs} />
          <Route path="/update/:id" Component={UpdateJob} />
          <Route path="/delete/:id" Component={DeleteJob} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
