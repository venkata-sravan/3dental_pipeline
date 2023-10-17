import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material';
import {useNavigate} from "react-router-dom";

// Define the type for the job object
interface Job {
  id: number;
  date: string;
  user: string;
  platform: string;
  extrude: string; // Adjust this type as needed
  add_jig: string; // Adjust this type as needed
  trim_line: string; // Adjust this type as needed
  do_segment: boolean;
  trim_percentage: string;
  smoothing_deviation: string;
  back_smoothing_deviation: string;
  offset: string;
}

const ListJobs = () => {
    const [jobs, setJobs] = useState<Job[]>([]);

    const navigate = useNavigate();

  const handleUpdate = (id: number) => {
      navigate(`/update/${id}`);
  };

  const handleDelete = (id: number) => {
      navigate(`/delete/${id}`);
  };
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get<Job[]>('http://localhost:8000/jobs');
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchJobs();
    }, []);


  return (
    <div>
      <h2>List of Jobs</h2>
      {jobs.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Platform</TableCell>
                <TableCell>Extrude</TableCell>
                <TableCell>Add Jig</TableCell>
                <TableCell>Trim Line</TableCell>
                <TableCell>Do Segment</TableCell>
                <TableCell>Trim Percentage</TableCell>
                <TableCell>Smoothing Deviation</TableCell>
                <TableCell>Back Smoothing Deviation</TableCell>
                <TableCell>Offset</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job, index) => (
                <TableRow key={index}>
                  <TableCell>{job.date}</TableCell>
                  <TableCell>{job.user}</TableCell>
                  <TableCell>{job.platform}</TableCell>
                  <TableCell>{job.extrude ? 'Yes': 'No'}</TableCell>
                  <TableCell>{job.add_jig ? 'Yes': 'No'}</TableCell>
                  <TableCell>{job.trim_line ? 'Yes': 'No'}</TableCell>
                  <TableCell>{job.do_segment ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{job.trim_percentage}</TableCell>
                  <TableCell>{job.smoothing_deviation}</TableCell>
                  <TableCell>{job.back_smoothing_deviation}</TableCell>
                  <TableCell>{job.offset}</TableCell>
                  <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleUpdate(job.id)}
                      >
                        Update
                      </Button>
                </TableCell>
                <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleDelete(job.id)}
                      >
                        Delete
                      </Button>
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No jobs to display</p>
      )}
    </div>
  );
};

export default ListJobs;
