import React, {useContext} from "react";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import AuthService from '../authService';
import AuthContext from "../context/AuthContext";
import LogoAi from "../HomePage/assets/logo_web_ai.png";
import Updates from "./updates";
import Settings from "./settings";
import Profile from "./Profile";

function Sidebar({ fetchChatHistory, history_store, darkMode, toggleDarkMode, advancedMode, toggleAdvancedMode, handleHistoryClick, handleDeleteHistory}) {
  const [open, setOpen] = React.useState(0);
  const [dialogSize, setDialogSize] = React.useState(null);
  const [dialogContent, setDialogContent] = React.useState(null);
  // const [darkMode, setDarkMode] = React.useState(false);

  const navigate = useNavigate();

  const {logoutUser} = useContext(AuthContext)

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const handleOpenAccordion = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleOpenDialog = (content) => {
    setDialogContent(content);
    setDialogSize("md");
  };

  const handleCloseDialog = () => {
    setDialogSize(null);
  };

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  // };

  return (
    <Card className={`h-fit min-h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/2 ${darkMode ? 'dark-mode' : ''}`}>
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src={LogoAi} alt="logo" style={{ width: "70px" }} />
        <Typography variant="h5" className={`${darkMode ? 'text-blue-gray-100' : ''}`} >
          CodeForgeAI
        </Typography>
      </div>
      <List>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpenAccordion(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <Cog6ToothIcon className={`h-5 w-5 ${darkMode ? 'text-blue-gray-100' : ''}`}  />
              </ListItemPrefix>
              <Typography className={`mr-auto font-normal ${darkMode ? 'text-blue-gray-100' : ''}`} >
                Options
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem onClick={() => handleOpenDialog(<Profile/>)}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className={`h-3 w-5 ${darkMode ? 'text-blue-gray-100' : ''}`} />
                </ListItemPrefix>
                <Typography className={`mr-auto font-normal ${darkMode ? 'text-blue-gray-100' : ''}`} >
                Profile
              </Typography>
              </ListItem>
              <ListItem onClick={() => handleOpenDialog(<Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} advancedMode={advancedMode} toggleAdvancedMode={toggleAdvancedMode} />)}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className={`h-3 w-5 ${darkMode ? 'text-blue-gray-100' : ''}`} />
                </ListItemPrefix>
                <Typography className={`mr-auto font-normal ${darkMode ? 'text-blue-gray-100' : ''}`} >
                Settings
              </Typography>
              </ListItem>
              <ListItem onClick={() => handleOpenDialog(<Updates />)}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className={`h-3 w-5 ${darkMode ? 'text-blue-gray-100' : ''}`} />
                </ListItemPrefix>
                <Typography className={`mr-auto font-normal ${darkMode ? 'text-blue-gray-100' : ''}`} >
                Updates
              </Typography>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem onClick={handleLogout} color={`${darkMode ? 'white' : 'blue-gray'}`}>
              <ListItemPrefix>
              <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-5 ${darkMode ? 'text-blue-gray-100' : ''}`}>
                <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clipRule="evenodd" />
              </svg>

              </ListItemPrefix>
              <Typography className={`mr-auto font-normal ${darkMode ? 'text-blue-gray-100' : ''}`} >
                LogOut
                </Typography>
            </ListItem>
            <hr className="my-2 border-blue-gray-50" />
        {history_store && history_store.length > 0 ? (
          history_store.map((item, index) => (
            <ListItem key={index} color={`${darkMode ? 'white' : 'blue-gray'}`} onClick={() => handleHistoryClick(index)}>
              <ListItemPrefix>
                {!item.image && <p>no image</p>}
                {item.image && (
                  <div className={`mt-4 ${darkMode ? 'border-blue-gray-100' : ''}`} id="image-preview">
                    <img src={item.image.image} alt="Uploaded" className={`w-20 h-7 object-cover mt-4 rounded-md ${darkMode ? 'text-blue-gray-100' : ''}`} />
                  </div>
                )}
              </ListItemPrefix>
              <div className={`mr-auto font-normal ${darkMode ? 'text-blue-gray-100' : ''}`}>
                
              {item.result.substring(0, 50)}
              {item.result.length > 50 && '...'}
              </div>
              
              <Button
                variant="text"
                color="blue-gray"
                onClick={() => handleDeleteHistory(item.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </Button>
            </ListItem>
          
          ))
        ) : (
          <div className={`mr-auto font-normal ${darkMode ? 'text-blue-gray-100' : ''}`}>
            <p>No history available</p>
          </div>
        )}
      </List>
      <Dialog
        open={dialogSize !== null}
        size={dialogSize}
        handler={handleCloseDialog}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader color="blue-gray-100">{dialogContent ? dialogContent.type.name : ''}</DialogHeader>
        <DialogBody className="text-blue-gray-900">{dialogContent}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCloseDialog}
            className="mr-1"
          >
            <span>Ok</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
}

export default Sidebar;
