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
  
  const status = [
    {title: 'a fazer', creatable: true, cards: []},
    {title: 'em progresso', creatable: false, cards: []},
    {title: 'concluido', creatable: false, cards: []},
  ];

  function move(fromList, toList, from, to) {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];
      if(dragged.id){
        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
      }
    }))
  }

  async function getTasks () {
    try {
      const {data: tasks} = await api.get("tasks");

      const taskNormalized = status.map((item, index) => {
        let cards = [];
        for(const task of tasks.data) {
          console.log("🚀 ~ taskNormalized ~ task:", task)
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
      
      console.log("🚀 ~ getTasks ~ taskNormalized:", taskNormalized)
      setLists(taskNormalized);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => <List key={list.status} index={index} data={list} />)}
      </Container>
    </BoardContext.Provider>
  );
}
