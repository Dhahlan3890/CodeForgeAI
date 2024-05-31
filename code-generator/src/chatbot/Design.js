import React from 'react';

function EmbeddedHtml({ htmlContent }) {
  // Check if htmlContent is not null or undefined
  const contentWithoutHtmlTags = htmlContent;

  return (
    <div>
      {/* Inject HTML content */}
      <div dangerouslySetInnerHTML={{ __html: contentWithoutHtmlTags }} />
    </div>
  );
}

export default EmbeddedHtml;
