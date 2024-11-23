import axios from "axios";

const API_URL = "http://localhost:8081";

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default {
  async getAllTasks(): Promise<Task[]> {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  },

  async addTask(task: Omit<Task, "id" | "completed">): Promise<Task> {
    const response = await axios.post(`${API_URL}/task`, task);
    return response.data;
  },

  async deleteTask(id: number): Promise<Record<"id", number>> {
    const response = await axios.delete(`${API_URL}/task/${id}`);
    return response.data;
  },

  async updateCompletedTask(id: number, isCompleted: boolean): Promise<Task> {
    const response = await axios.patch(`${API_URL}/task/${id}`, {
      completed: isCompleted,
    });
    return response.data;
  },
};
