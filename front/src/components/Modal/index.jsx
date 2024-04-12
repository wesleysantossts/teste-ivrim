import React, { useContext, useState } from 'react';
import ReactModal from 'react-modal';
import { Container, modalStyle } from './styles';
import Input from '../Form/Input';
import Select from '../Form/Select';
import Button from '../Form/Button';
import { TaskContext } from '../../context/task';

ReactModal.setAppElement('#root');

export default function Modal({ data }) {
  const { modalWatcher, createTask, updateTask } = useContext(TaskContext);
  // const [modalData, setModalData] = useState(modalData);
  const { modalData, setModalData, showModal, setShowModal } = modalWatcher;
  console.log("🚀 ~ Modal ~ modalData:", modalData)

  const status = [
    { name: 'A Fazer', value: 'a fazer', default: true },
    { name: 'Em Progresso', value: 'em progresso', default: false },
    { name: 'Concluido', value: 'concluido', default: false },
  ];

  const inputEditList = [
    { type: 'text', label: 'Titulo', value: modalData.titulo, formState: { modalData, setModalData }, keyValue: 'titulo' },
    { type: 'text', label: 'Descrição', value: modalData.descricao, formState: { modalData, setModalData }, keyValue: 'descricao' },
  ];
  const inputNewTaskList = [
    { type: 'text', label: 'Titulo', value: modalData.titulo, formState: { modalData, setModalData }, keyValue: 'titulo' },
    { type: 'text', label: 'Descrição', value: modalData.descricao, value: modalData.descricao, formState: { modalData, setModalData }, keyValue: 'descricao' },
  ];

  return (
    <ReactModal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      shouldCloseOnOverlayClick={true}
      contentLabel='Criar e Editar conteúdo'
      onverlayClassname='modal-overlay'
      className='modal-content'
      style={modalStyle}
    >
      <Container>
        <div className='close-btn'>

        </div>
        {data ? (
          <form
            method='post'
            onSubmit={(e) => {
              const normalizedData = { ...modalData };
              updateTask({ id: data.id, payload: normalizedData, event: e })
            }}
          >
            <p className='title'>Editar Tarefa</p>
            {inputEditList.map((item, index) => <Input key={index} {...item} />)}
            <Select
              label='Status'
              options={status}
              value={modalData.status}
              formState={{ modalData, setModalData }}
              keyValue='status'
            />
            <Button text='Editar' />
          </form>
        ) : (
          <form
            method='post'
            onSubmit={(e) => createTask({ ...modalData, event: e })}
          >
            <p className='title'>Nova Tarefa</p>
            {inputNewTaskList.map((item, index) => <Input key={index} {...item} />)}
            <Select
              label='Status'
              options={status}
              val
              formState={{ modalData, setModalData }}
              keyValue='status'
            />
            <Button text='Criar' />
          </form>
        )}
      </Container>
    </ReactModal>
  )
}