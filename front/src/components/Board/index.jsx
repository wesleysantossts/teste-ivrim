import React, { useState, useEffect } from 'react';
import produce from 'immer';

import { loadLists } from '../../services/api';

import BoardContext from './context';

import List from '../List';

import { Container } from './styles';
import api from '../../config/api';
import { capitalizeWords } from '../../utils/cards';

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data);
  const [updateList, setUpdateList] = useState(false);
  
  const columns = [
    {title: 'a fazer', position: 0, creatable: true, cards: []},
    {title: 'em progresso', position: 1, creatable: false, cards: []},
    {title: 'concluido', position: 2, creatable: false, cards: []},
  ];

  function move(fromList, toList, from, to) {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];
      if(dragged.id){
        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
        
        updateTaskStatus(dragged.id, toList);
      }
    }))
  }

  async function getTasks () {
    try {
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
      
      setLists(taskNormalized);
      setUpdateList(true);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    getTasks();
  }, [updateList]);

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => <List key={list.status} index={index} data={list} />)}
      </Container>
    </BoardContext.Provider>
  );
}
