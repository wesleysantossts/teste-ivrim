import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';

import { capitalizeWords } from '../utils/cards';
import api from '../services/api';

export const TaskContext = createContext({});

function TaskProvider({ children }) {
  const columns = [
    {title: 'a fazer', position: 0, creatable: true, cards: []},
    {title: 'em progresso', position: 1, creatable: false, cards: []},
    {title: 'concluido', position: 2, creatable: false, cards: []},
  ];

  const [taskList, setTaskList] = useState(columns);
  const [watcher, setWatcher] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [modalType, setModalType] = useState('create');

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
            status: task.status,
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
      if (showModal) setShowModal(false);
    } catch (error) {
      setWatcher(false);
      console.error(error);
      toast.error('Não foi possível listar as tarefas. Entre em contato com o administrador.');
    }
  }

  async function createTask({ titulo, descricao, status = 'a fazer', event }) {
    event.preventDefault();
    try {
      if (
        !titulo ||
        !descricao
      ) throw Error('Deve conter \"Título\" e \"Descrição\"!');

      const payload = { titulo, descricao, status };
      const createdTask = await api.post('/task', payload);
      if (createdTask.status !== 200 || !createdTask.data) throw Error('Não foi possível criar essa tarefa!');

      getTasks();
      toast.success('Tarefa criada com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error(error.message ?? 'Não foi possível criar essa tarefa!');
    }
  }

  async function updateTask({id, payload, event}) {
    if (event) event.preventDefault();
    
    try {
      if (
        !id || 
        (typeof payload.status === null) || 
        (typeof payload.status == undefined)
      ) throw Error('Os campos \"id\" e \"status\" são obrigatórios');

      const filterStatus = columns
        .filter((item, index) => item.title === payload.status || item.position === payload.status);
      let normalizedStatus = 'a fazer';
      if (filterStatus.length > 0) normalizedStatus = filterStatus[0].title;
      
      const normalizedPayload = {
        ...payload,
        id: id ?? payload.id,
        status: normalizedStatus,
      };
      const updatedResponse = await api.put(`/task/${id}`, normalizedPayload);
      const {data: { data }} = updatedResponse;
      if (!data) throw Error("Nenhuma tarefa foi atualizada");

      setModalData('');
      getTasks();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTask(id) {
    try {
      const deleteResponse = await api.delete(`/task/${id}`);
      if (deleteResponse.status !== 200 || !deleteResponse.data) throw Error('Não foi possível deletar essa tarefa!');

      toast.success('Tarefa excluída com sucesso!');
      getTasks()
    } catch (error) {
      console.error(error);
      toast.error(error.message ?? 'Não foi possível deletar essa tarefa!');
    }
  }

  return (
    <TaskContext.Provider 
      value={{ 
        watcher,
        modalWatcher: {
          showModal, 
          setShowModal, 
          modalData, 
          setModalData,
          modalType,
          setModalType
        },
        data: {taskList, setTaskList}, 
        getTasks, 
        createTask,
        updateTask, 
        deleteTask 
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider;