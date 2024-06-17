import React, { useState, useEffect } from 'react';
import DraggableItem from './DraggableItem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Recursive function to render HTML structure
const renderHtml = (node, moveComponent, editComponent) => {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const children = Array.from(node.childNodes).map((child, index) => (
    <React.Fragment key={index}>
      {renderHtml(child, moveComponent, editComponent)}
    </React.Fragment>
  ));

  return (
    <DraggableItem
      key={node.outerHTML}
      id={node.outerHTML}
      left={node.style.left ? parseInt(node.style.left) : 0}
      top={node.style.top ? parseInt(node.style.top) : 0}
      onMove={moveComponent}
      onEdit={editComponent}
    >
      {React.createElement(node.tagName.toLowerCase(), {
        dangerouslySetInnerHTML: { __html: node.innerHTML }
      }, children)}
    </DraggableItem>
  );
};

const HtmlRenderer = ({ generatedHtml }) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(generatedHtml, 'text/html');
    setComponents(Array.from(doc.body.childNodes));
  }, [generatedHtml]);

  const moveComponent = (id, left, top) => {
    setComponents(prevComponents =>
      prevComponents.map(component =>
        component.outerHTML === id ? { ...component, left, top } : component
      )
    );
  };

  const editComponent = (id, content) => {
    setComponents(prevComponents =>
      prevComponents.map(component =>
        component.outerHTML === id ? { ...component, innerHTML: content } : component
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ position: 'relative' }}>
        {components.map((component, index) => renderHtml(component, moveComponent, editComponent))}
      </div>
    </DndProvider>
  );
};

export default HtmlRenderer;
