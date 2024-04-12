import React, { useEffect, useContext } from 'react';
import produce from 'immer';

import BoardContext from './context';

import List from '../List';

import { Container } from './styles';
import { TaskContext } from '../../context/task';
import Modal from '../Modal';

export default function Board() {
  const { 
    data, 
    modalWatcher: { modalData }, 
    updateTask, 
    getTasks 
  } = useContext(TaskContext);
  const { taskList: lists, setTaskList } = data;

  function move(fromList, toList, from, to) {
    setTaskList(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];
      if(dragged.id){
        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
        
        const normalizedPayload = {
          id: dragged.id,
          payload: {
            status: toList
          }
        };
        updateTask(normalizedPayload);
      }
    }))
  }

  useEffect(() => {
    getTasks()
  }, []);

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => {
          return <List key={index} index={index} data={list} />
        })}
      </Container>
      <Modal data={modalData} />
    </BoardContext.Provider>
  );
}
