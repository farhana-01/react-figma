import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Paper,
  Box,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever the task list changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle input change
  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  // Add new task to the list
  const addTask = () => {
    if (newTask.trim() === '' || tasks.some((task) => task.text === newTask)) {
      return; // Prevent adding empty or duplicate tasks
    }
    const newTaskObj = { text: newTask, completed: false };
    setTasks([...tasks, newTaskObj]);
    setNewTask(''); // Clear input field
  };

  // Remove task from the list
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#ce93d8', // Light pink background
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      {/* Card for ToDo input */}
      <Paper
        elevation={3}
        sx={{
          padding: '2rem',
          backgroundColor: '#ab47bc', // Light blue background for card
          borderRadius: '10px',
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: '1rem', color: '#333' }}>
          ToDo App
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}
        >
          <TextField
            label="Enter task"
            variant="outlined"
            value={newTask}
            onChange={handleInputChange}
            sx={{ width: '200px' }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#f50057', // Red button
              color: 'white',
              '&:hover': { backgroundColor: '#4a148c' }
            }}
            onClick={addTask}
          >
            Add +
          </Button>
        </Box>
      </Paper>

      {/* List of tasks */}
      <List sx={{ marginTop: '2rem', width: '100%', maxWidth: '400px' }}>
        {tasks.map((task, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              backgroundColor: '#e3f2fd', // White background for tasks
              borderRadius: '5px'
            }}
          >
            <Typography>{task.text}</Typography>
            <IconButton
              onClick={() => removeTask(index)}
              sx={{ color: '#ff6b6b' }} // Red delete button
            >
              <DeleteIcon />
            </IconButton>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default TodoApp;
