import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../actions/taskActions";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const NewTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask({ title, description, priority }));
    navigate("/");
  };

  return (
    <Box display="flex" justifyContent="center">
      <form onSubmit={handleSubmit} style={{ width: "50%" }}>
        <Stack spacing={2} sx={{ mt: 4 }}>
          <Typography sx={{ pb: 2 }} variant="h3">
            Add Task
          </Typography>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
            variant="outlined"
            required
            fullWidth
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />

          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Priority"
            variant="outlined"
            style={{ width: "100%" }}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
          <Stack direction="row" spacing={2}>
            <Button
              type="reset"
              variant="contained"
              color="error"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Back
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Add Task
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default NewTask;
