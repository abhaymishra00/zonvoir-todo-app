import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, updateOrder } from "../actions/taskActions";
import TaskItem from "./TaskItem";
import {
  Container,
  Typography,
  List,
  Divider,
  Stack,
  TextField,
  Button,
  Card,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskList = () => {
  let tasks = useSelector((state) => state.tasks.tasks);

  const [query, setQuery] = useState("");
  const [taskList, setTaskList] = useState(tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  useEffect(() => {
    let mQuery = query.toLowerCase();

    if (mQuery === "") {
      setTaskList(tasks);
    } else {
      setTaskList(
        tasks.filter(
          (item) =>
            item.title.toLowerCase().includes(mQuery) ||
            item.description.toLowerCase().includes(mQuery)
        )
      );
    }
  }, [query, tasks]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedTaskList = Array.from(taskList);
    const [removed] = reorderedTaskList.splice(result.source.index, 1);
    reorderedTaskList.splice(result.destination.index, 0, removed);

    setTaskList(reorderedTaskList);
    dispatch(updateOrder(reorderedTaskList));
  };

  if (!Array.isArray(taskList)) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography marginTop={4} variant="h4" component="h1" gutterBottom>
        TODOs
      </Typography>

      <Divider />

      <Stack py={2} direction="row" useFlexGap spacing={2}>
        <TextField
          size="small"
          fullWidth
          variant="outlined"
          label="Search"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          sx={{ width: "125px" }}
          size="small"
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/new")}
        >
          Add item
        </Button>
      </Stack>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {taskList.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskItem key={task._id} task={task} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>

      {taskList.length === 0 && (
        <Card sx={{ p: 2 }}>
          <Typography>Empty List</Typography>
        </Card>
      )}
    </Container>
  );
};

export default TaskList;
