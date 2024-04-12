import React, { useRef, useContext, Fragment } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import BoardContext from '../Board/context';

import { Container, Label } from './styles';
import { MdClear, MdOutlineMode } from 'react-icons/md';
import { TaskContext } from '../../context/task';

export default function Card({ data, index, listIndex, setter, showModal }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);
  const { deleteTask } = useContext(TaskContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  })

  dragRef(dropRef(ref));

  async function deleteCard() {
    try {
      await deleteTask(data.id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container ref={ref} isdragging={isDragging.toString()}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
        <div className='close-btn'>
          <button type='button' onClick={deleteCard}>
            <MdClear size={18} color={'#ccc'} />
          </button>
        </div>
      </header>
      <p><strong>{data.title}</strong></p>
      <p>{data.content}</p>
      <div className='footer-card'>
        {data.user && <img src={data.user} alt="" />}
        <div className='edit-btn'>
          <button 
            onClick={() => {
              const normalizedData = {
                id: data.id,
                titulo: data.title,
                descricao: data.content,
                status: data.status,
              };
              setter(normalizedData)
              showModal(true)
            }}
          >
            <MdOutlineMode size={18} color={'white'} />
          </button>
        </div>
      </div>
    </Container>
  );
}
