import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TaskProvider from "./task";

export default function Provider({children}) {
  return (
    <DndProvider backend={HTML5Backend}>
      <TaskProvider>
        {children}
      </TaskProvider>
    </DndProvider>
  )
}