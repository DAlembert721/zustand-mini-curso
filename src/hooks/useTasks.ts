import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useShallow } from "zustand/react/shallow";
import { TaskStatus } from "../interfaces";
import { useTaskStore } from "../stores";

interface Options {
  status: TaskStatus;
}

export const useTasks = ({ status }: Options) => {
  const tasks = useTaskStore(
    useShallow((state) => state.getTaskByStatus(status))
  );
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const addTask = useTaskStore((state) => state.addTask);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const [onDragOver, setOnDragOver] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  };
  const handleAddTask = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: "Nueva Tarea",
      input: "text",
      inputLabel: "Nombre de la tarea",
      inputPlaceholder: "Ingrese el nombre de la tarea",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Debe ingresar el nombre de la tarea";
        }
      },
    });
    if (isConfirmed) {
      addTask(value, status);
    }
  };
  return {
    tasks,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    isDragging,
    onDragOver,
    handleAddTask,
  };
};
