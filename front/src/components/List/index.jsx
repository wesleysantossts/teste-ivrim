import React, { Fragment, useContext, useState } from 'react';

import { MdAdd } from 'react-icons/md';

import Card from '../Card';
import Fake from '../Card/fake';

import { Container } from './styles';
import Modal from '../Modal';
import { TaskContext } from '../../context/task';

export default function List({ data, index: listIndex }) {
  const [modalData, setModalData] = useState(null);
  const [toggleModal, setToggleModal] = useState(false);
  const { modalWatcher } = useContext(TaskContext);
  const { showModal, setShowModal } = modalWatcher;

  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button 
            className='creatable' 
            type='button' 
            onClick={() => {
              setModalData(null);
              setShowModal(!showModal)
            }}
          >
            <MdAdd size={24} color="#FFF" />
          </button>
        )}
      </header>

      <ul style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
        {data.cards.map((card, index) => (
          <Fragment key={card.id}>
            <Card 
              listIndex={listIndex}
              index={index} 
              data={card}
              setter={setModalData}
              showModal={setShowModal}
            />
          </Fragment>
        ))}
        <Fake index={data.cards.length} listIndex={listIndex}/>
        <Modal data={modalData} />
      </ul>
    </Container>
  );
}
