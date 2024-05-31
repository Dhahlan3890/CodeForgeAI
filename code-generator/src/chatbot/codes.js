import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Button,
    Popover,
  PopoverHandler,
  PopoverContent,
  } from "@material-tailwind/react";
  import React, { useState } from 'react';
  import { IconButton } from "@material-tailwind/react";
  import Message from '../Login/Message';

  
   
  function Codes({result}) {
    const [message, setMessage] = useState('');

    const handleCopy = () => {
      if (result) {
        navigator.clipboard.writeText(result).then(() => {
          setMessage('Code copied');
        }).catch(err => {
          
          setMessage('Something wrong', err);
        });
      }
    };
  
  //   const data = [
  //     {
  //       label: "HTML",
  //       value: "html",
  //       desc: (
  //           <div>
  //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  //             <h3>Generated Code:</h3>
  //             <button onClick={handleCopy} >
  //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  //               <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  //             </svg>
  //             </button>
              
  //           </div>
  //           <pre 
  //             id="code" 
  //             style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
  //           >
  //             {result || 'No result yet'}
  //           </pre>
  //         </div>
  //       ),
  //     },
  //     {
  //       label: "CSS",
  //       value: "css",
  //       desc: `Because it's about motivating the doers. Because I'm here
  //       to follow my dreams and inspire other people to follow their dreams, too.`,
  //     },
  //     {
  //       label: "Javascript",
  //       value: "vue",
  //       desc: `We're not always in the position that we want to be at.
  //       We're constantly growing. We're constantly making mistakes. We're
  //       constantly trying to express ourselves and actualize our dreams.`,
  //     },
  //   ];
   
  //   return (
  //     <Tabs value="html" orientation="vertical" id="tabs">
  //       <TabsHeader className="w-32">
  //         {data.map(({ label, value }) => (
  //           <Tab key={value} value={value}>
  //             {label}
  //           </Tab>
  //         ))}
  //       </TabsHeader>
  //       <TabsBody>
  //         {data.map(({ value, desc }) => (
  //           <TabPanel key={value} value={value} className="py-0" layoutId="code-space" id = "code-text">
  //             {desc}
  //           </TabPanel>
  //         ))}
  //       </TabsBody>
  //     </Tabs>
  //   );
  // }

      return (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Generated Code:</h3>
            <Popover placement="left" >
              <PopoverHandler onClick={handleCopy}>
              <button>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
              </PopoverHandler>
              <PopoverContent>
                  {message && <Message message={message} />}
              </PopoverContent>
            </Popover>
            
              
           </div>
           <pre 
             id="code" 
             style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
           >
              {result || 'No result yet'}
            </pre>
          </div>
      );
    }

export default Codes;