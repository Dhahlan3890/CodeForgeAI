

import React, { useEffect, useRef } from 'react';

const EmbeddedHtml = ({ htmlContent }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();
  }, [htmlContent]);

  return (
    <iframe
      ref={iframeRef}
      title="Html Content"
      width="100%"
      height="400vh"
      style={{ border: '1px solid #ccc', marginTop: '20px', borderRadius: '20px'}}
    />
  );
};

export default EmbeddedHtml;

