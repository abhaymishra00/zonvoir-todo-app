import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../actions/taskActions";
import styled from "styled-components";
import {
  Card,
  IconButton,
  Radio,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Delete, DriveFileRenameOutline } from "@mui/icons-material";

const priority_colors = {
  low: "#229954",
  medium: "#F39C12",
  high: "#E74C3C",
};

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [completed, setCompleted] = useState(task.completed);

  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateTask(task._id, { title, description, priority, completed }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
    setIsDeleting(false);
  };

  const handleToggleComplete = () => {
    setCompleted(!completed);
    dispatch(updateTask(task._id, { ...task, completed: !completed }));
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleOpenDeleteDialog = () => {
    setIsDeleting(true);
  };
  const handleCloseDeleteDialog = () => {
    setIsDeleting(false);
  };

  return (
    <Card
      sx={{
        mb: 1,
        borderLeft: "4px solid",
        borderLeftColor: priority_colors[priority],
      }}
    >
      <Stack p={2}>
        <Stack direction="row" alignItems="center" justifyContent="flex-start">
          <Radio
            onClick={handleToggleComplete}
            value="outlined"
            checked={task.completed}
            label="Outlined"
            variant="outlined"
          />
          <Typography
            variant="h5"
            style={{
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </Typography>
          {!task.completed && (
            <IconButton
              color="success"
              onClick={handleEdit}
              aria-label="Update TODO Item"
            >
              <DriveFileRenameOutline />
            </IconButton>
          )}

          <IconButton
            color="error"
            onClick={handleOpenDeleteDialog}
            aria-label="Delete TODO Item"
          >
            <Delete />
          </IconButton>
        </Stack>
        <Typography>{task.description}</Typography>

        <Dialog open={isEditing} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Update Task</DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="Title"
                variant="outlined"
                required
              />

              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
                required
              />

              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                label="Priority"
                variant="outlined"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
              <Stack direction="row" spacing={2}></Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleClose}>
              Back
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save Task
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={isDeleting} onClose={handleCloseDeleteDialog}>
          <DialogTitle id="alert-dialog-title">Delete Task</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete task?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDeleteDialog}
              variant="contained"
              color="success"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Card>
  );
};

export default TaskItem;
