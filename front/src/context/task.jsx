import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { capitalizeWords } from '../utils/cards';
import api from '../config/api';

export const TaskContext = createContext({});

function TaskProvider({ children }) {
  const columns = [
    {title: 'a fazer', position: 0, creatable: true, cards: []},
    {title: 'em progresso', position: 1, creatable: false, cards: []},
    {title: 'concluido', position: 2, creatable: false, cards: []},
  ];

  const [taskList, setTaskList] = useState(columns);
  const [watcher, setWatcher] = useState(false);

  async function getTasks() {
    try {
      setWatcher(false);
      const {data: tasks} = await api.get("tasks");

      const taskNormalized = columns.map((item, index) => {
        let cards = [];
        for(const task of tasks.data) {
          const taskNormalized = {
            id: task.id,
            title: task.titulo,
            content: task.descricao,
            labels: ['#7159c1'],
          user: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/profile.png'
          };

          if (item.title === task.status) cards.push(taskNormalized);
        }
        
        return {
          ...item,
          title: capitalizeWords(item.title),
          cards
        }
      })
      
      setTaskList(taskNormalized);
      setWatcher(true);
    } catch (error) {
      setWatcher(false);
      console.log(error);
      toast.error('Não foi possível listar as tarefas. Entre em contato com o administrador.');
    }
  }

  async function updateTaskStatus(id, status) {
    try {
      if (!id && !status) throw Error('Os campos \"id\" e \"status\" são obrigatórios');

      const payload = { 
        status: columns.filter((item, index) => item.position === status)[0].title 
      };
      const updatedResponse = await api.put(`/task/${id}`, payload);
      const {data: { data }} = updatedResponse;
      if (!data) throw Error("Nenhuma tarefa foi atualizada");

      getTasks();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTask(id) {
    try {
      const deleteResponse = await api.delete(`/task/${id}`);
      if (deleteResponse.statusCode !== 200 && !deleteResponse.data) toast.error('Não foi possível deletar essa tarefa!');

      toast.success('Tarefa excluída com sucesso!');
      getTasks()
    } catch (error) {
      console.log(error);
      toast.error('Não foi possível deletar essa tarefa!');
    }
  }

  useEffect(() => {
    getTasks()
  }, [taskList]);

  return (
    <TaskContext.Provider 
      value={{ 
        watcher,
        data: {taskList, setTaskList}, 
        getTasks, 
        updateTaskStatus, 
        deleteTask 
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider;