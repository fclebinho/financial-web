import React from 'react';
import {useDroppable} from '@dnd-kit/core';

interface DroppableProps {
	id: string 
	description?: string
}

export const Droppable: React.FC<DroppableProps> = ({ id, description, children }) => {
  const {isOver, setNodeRef} = useDroppable({ 
		id,
		data: {
			type: 'account',
			description
		} 
	});

  const style = {
    color: isOver ? '#E53E3E' : undefined,
  };
  
  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}