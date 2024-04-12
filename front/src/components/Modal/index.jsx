import React, { useContext, useState } from 'react';
import ReactModal from 'react-modal';
import { Container, modalStyle } from './styles';
import Input from '../Form/Input';
import Select from '../Form/Select';
import Button from '../Form/Button';
import { TaskContext } from '../../context/task';

ReactModal.setAppElement('#root');

export default function Modal({data}) {
  const [formValue, setFormValue] = useState({
    titulo: '',
    descricao: '',
    status: 'a fazer'
  });
  const { modalWatcher, createTask } = useContext(TaskContext);
  const { showModal, setShowModal } = modalWatcher;

  const status = [
    {name: 'A Fazer', value: 'a fazer', default: true},
    {name: 'Em Progresso', value: 'em progresso', default: false},
    {name: 'Concluido', value: 'concluido', default: false},
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
          <form method='post' onSubmit={() => {}}>
            <p className='title'>Editar Tarefa</p>
            <Input 
              type='text' 
              label='Titulo' 
              setter={setFormValue} 
              keyValue='title' 
            />
            <Input 
              type='text' 
              label='Descrição' 
              setter={setFormValue} 
              keyValue='description' 
            />
            <Select label='Status' options={status} />
            <Button text='Editar' />
          </form>
        ):(
          <form method='post' onSubmit={(e) => createTask({...formValue, event: e})}>
            <p className='title'>Nova Tarefa</p>
            <Input 
              type='text' 
              label='Titulo' 
              setter={setFormValue} 
              keyValue='titulo' 
            />
            <Input 
              type='text' 
              label='Descrição' 
              setter={setFormValue} 
              keyValue='descricao' 
            />
            <Select label='Status' options={status} />
            <Button text='Criar' />
          </form>
        )}
      </Container>
    </ReactModal>
  )
}