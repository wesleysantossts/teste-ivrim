import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Container, modalStyle } from './styles';
import Input from '../Form/Input';
import Select from '../Form/Select';
import Button from '../Form/Button';

ReactModal.setAppElement('#root');

export default function Modal({toggle, data}) {
  const [formValue, setFormValue] = useState({
    titulo: '',
    description: '',
    status: 'a fazer'
  });
  const {toggleModal, setToggleModal} = toggle;

  const status = [
    {name: 'A Fazer', value: 'a fazer', default: true},
    {name: 'Em Progresso', value: 'em progresso', default: true},
    {name: 'Concluido', value: 'concluido', default: true},
  ];
  
  return (
    <ReactModal
      isOpen={toggleModal}
      onRequestClose={() => setToggleModal(false)}
      shouldCloseOnOverlayClick={true}
      contentLabel='Criar e Editar conteúdo'
      onverlayClassname='modal-overlay'
      className='modal-content'
      style={modalStyle}
    >
      <Container>
        <div className='close-btn'>

        </div>
        {!!data ? (
          <form onSubmit={() => {}}>
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
          <form onSubmit={() => {}}>
            <p className='title'>Nova Tarefa</p>
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
            <Button text='Criar' />
          </form>
        )}
      </Container>
    </ReactModal>
  )
}