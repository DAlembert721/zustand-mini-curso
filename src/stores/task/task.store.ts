import { v4 as uuidV4 } from "uuid";
import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Task, TaskStatus } from "../../interfaces";
import { getDevtoolsOptions } from "../generators/devtools-options.generator";

interface TaskState {
  tasks: Record<string, Task>;
  draggingTaskId?: string;

  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;
  getTotalTasks: () => number;

  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<
  TaskState,
  [["zustand/devtools", never], ["zustand/immer", never]]
> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    "ABC-1": { id: "ABC-1", title: "Task 1", status: "open" },
    "ABC-2": { id: "ABC-2", title: "Task 2", status: "in-progress" },
    "ABC-3": { id: "ABC-3", title: "Task 3", status: "open" },
    "ABC-4": { id: "ABC-4", title: "Task 4", status: "open" },
  },
  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;
    return Object.values(tasks).filter((task) => task.status === status);
  },
  addTask: (title: string, status: TaskStatus) => {
    const newTask = {
      id: uuidV4(),
      title,
      status,
    };
    set(
      (state) => {
        state.tasks[newTask.id] = newTask;
      },
      false,
      get().addTask.name
    );
    //? Classic way
    /* set(
      (state) => ({
        tasks: {
          ...state.tasks,
          [newTask.id]: newTask,
        },
      }),
      false,
      get().addTask.name
    ); */

    //? Require lib immer
    /* set(
      produce((state: TaskState) => {
        state.tasks[newTask.id] = newTask;
      })
    ); */
  },
  getTotalTasks: () => {
    return Object.keys(get().tasks).length;
  },
  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId }, false, get().setDraggingTaskId.name);
  },
  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined }, false, get().removeDraggingTaskId.name);
  },
  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    set(
      (state) => {
        state.tasks[taskId] = {
          ...state.tasks[taskId],
          status,
        };
      },
      false,
      get().changeTaskStatus.name
    );
    /* const task = get().tasks[taskId];
    task.status = status; */
    /* set(
      (state) => ({
        tasks: {
          ...state.tasks,
          [taskId]: task,
        },
      }),
      false,
      get().changeTaskStatus.name
    ); */
  },
  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;
    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },
});

const storeName = "task-store";

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(immer(storeApi), { name: storeName }),
    getDevtoolsOptions(storeName)
  )
);
