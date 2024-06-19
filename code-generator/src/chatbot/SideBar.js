import React from "react";
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
import LogoAi from "../HomePage/assets/logo_web_ai.png";
import Updates from "./updates";
import Settings from "./settings";

function Sidebar({ history_store }) {
  const [open, setOpen] = React.useState(0);
  const [dialogSize, setDialogSize] = React.useState(null);
  const [dialogContent, setDialogContent] = React.useState(null);
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Card className={`h-fit min-h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/2 ${darkMode ? 'dark-mode' : ''}`}>
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src={LogoAi} alt="logo" style={{ width: "70px" }} />
        <Typography variant="h5" color={`${darkMode ? '#a0aec0' : 'blue-gray'}`}>
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
          <ListItem className={`p-0 ${darkMode ? 'text-white' : ''}`} selected={open === 2}>
            <AccordionHeader onClick={() => handleOpenAccordion(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography className={`mr-auto font-normal ${darkMode ? 'text-white' : ''}`}>
                Options
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1" color={`${darkMode ? 'white' : 'blue-gray'}`}>
            <List className="p-0">
              <ListItem onClick={() => handleOpenDialog(<Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} />)}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Settings
              </ListItem>
              <ListItem onClick={() => handleOpenDialog(<Updates />)}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Updates
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        {history_store && history_store.length > 0 ? (
          history_store.map((item, index) => (
            <ListItem key={index} color={`${darkMode ? 'white' : 'blue-gray'}`}>
              <ListItemPrefix>
                {!item.image && <p>no image</p>}
                {item.image && (
                  <div className="mt-4" id="image-preview">
                    <img src={item.image} alt="Uploaded" className="w-20 h-7 object-cover mt-4 rounded-md" />
                  </div>
                )}
              </ListItemPrefix>
              {item.result.substring(0, 50)}
              {item.result.length > 50 && '...'}
            </ListItem>
          ))
        ) : (
          <div color={`${darkMode ? 'white' : 'blue-gray'}`}>
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
        <DialogHeader >{dialogContent ? dialogContent.type.name : ''}</DialogHeader>
        <DialogBody >{dialogContent}</DialogBody>
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
