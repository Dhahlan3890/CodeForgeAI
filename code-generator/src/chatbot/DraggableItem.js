// DraggableItem.js
import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';
import './DraggableItem.css';

const DraggableItem = ({ id, left, top, children, onMove, onEdit }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COMPONENT,
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.COMPONENT,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const newLeft = Math.round(item.left + delta.x);
      const newTop = Math.round(item.top + delta.y);
      onMove(item.id, newLeft, newTop);
    },
  });

  const [isEditable, setIsEditable] = useState(false);
  const contentRef = useRef(null);

  const handleDoubleClick = () => {
    setIsEditable(true);
  };

  const handleBlur = () => {
    setIsEditable(false);
    onEdit(id, contentRef.current.innerHTML);
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ left, top, position: 'absolute', opacity: isDragging ? 0.5 : 1 }}
      className="draggable"
      onDoubleClick={handleDoubleClick}
    >
      <div
        contentEditable={isEditable}
        ref={contentRef}
        onBlur={handleBlur}
        suppressContentEditableWarning={true}
      >
        {children}
      </div>
    </div>
  );
};

export default DraggableItem;