import React, { useState, useEffect } from "react";
import { Textarea, Button, IconButton, Spinner } from "@material-tailwind/react";
import HtmlRenderer from './HtmlRenderer';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Codes from './codes';
import EmbeddedHtml from "./Design";

function CodeTab({ result1 , darkMode}) {
  const [result, setResult] = useState(result1);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (result1 !== null) {
      setResult(result1);
    }
  }, [result1]);

  const modifyResult = (data) => {
    setResult(data);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const ModifyCode = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/modify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: `Code:\n${result}\n\n\nTask : modify the code to ${text} and give the full modified code. Do not change the structure of code.` }),
      });

      const data = await response.json();
      if (response.ok) {
        modifyResult(data.result);
      //   if (data.result !== 'No HTML content found'){
      //     modifyResult(data.result);
      //   }
        
      // } else {
      //   setError(data.msg || 'Error analyzing text');
      }
    } catch (err) {
      setError('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to update result when result1 changes

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const elements = Array.from(document.querySelectorAll('.embedded-html > *'));
    const [removed] = elements.splice(result.source.index, 1);
    elements.splice(result.destination.index, 0, removed);

    const updatedHtmlContent = elements.map(el => el.outerHTML).join('');
    setResult(`<html><body>${updatedHtmlContent}</body></html>`);
  };

  const handleHtmlChange = (updatedHtml) => {
    setResult(updatedHtml);
  };

  const data = [
    {
      label: "Codes",
      value: "dashboard",
      icon: Square3Stack3DIcon,
      desc: <Codes result={result} />,
    },
    {
      label: "Design",
      value: "profile",
      icon: UserCircleIcon,
      desc: (
        <div id="design-area">
          <form  onSubmit={(e) => { e.preventDefault(); ModifyCode(); }}>
            <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
              <Textarea
                value={text}
                onChange={handleTextChange}
                rows={1}
                resize={true}
                placeholder="Modify Design"
                className="min-h-full !border-0 focus:border-transparent"
                containerProps={{
                  className: "grid h-full",
                }}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                disabled={loading}
              />
              <div>
                <IconButton variant="text" className="rounded-full" disabled={loading} type="submit">
                    {loading ? <Spinner /> : 
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                  }
                </IconButton>
              </div>
              {error && <div className="text-red-500">{error}</div>}
            </div>
            </form>
            <DragDropContext onDragEnd={onDragEnd}>
            <EmbeddedHtml htmlContent={result} />
          </DragDropContext>
          {/* <EmbeddedHtml htmlContent={result} /> */}
          {/* <HtmlRenderer generatedHtml={result} /> */}
        </div>
      ),
    },
  ];

  return (
    <Tabs value="dashboard" id="tab" className={`${darkMode ? 'dark-mode' : ''}`}>
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}

export default CodeTab;
