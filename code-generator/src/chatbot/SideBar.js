import React, { useContext, useState, useEffect } from "react";
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

function Sidebar({ fetchChatHistory, history_store, darkMode, toggleDarkMode, advancedMode, toggleAdvancedMode, handleHistoryClick, handleDeleteHistory }) {
  const [open, setOpen] = useState(0);
  const [dialogSize, setDialogSize] = useState(null);
  const [dialogContent, setDialogContent] = useState(null);
  const [imageUrls, setImageUrls] = useState({}); // State to store base64 image URLs

  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);

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

  // Function to convert binary image data to base64
  const convertImageToBase64 = async (imageData) => {
    if (!imageData) return null;

    // If the image data is already a base64 string, return it directly
    if (typeof imageData === 'string' && imageData.startsWith('data:')) {
      return imageData;
    }

    // If the image data is binary (e.g., ArrayBuffer or Uint8Array), convert it to base64
    if (imageData instanceof ArrayBuffer || imageData instanceof Uint8Array) {
      const blob = new Blob([imageData], { type: 'image/jpeg' }); // Adjust MIME type as needed
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    }

    // If the image data is a Blob or File, convert it to base64
    if (imageData instanceof Blob || imageData instanceof File) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(imageData);
      });
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(imageData);
      });
    }

    // If the image data is in an unsupported format, return null
    console.log('Image is in an unsupported format');
    return null;
  };

  // Process image data for history items
  useEffect(() => {
    const processImages = async () => {
      const urls = {};
      for (const item of history_store) {
        if (item.image) {
          const base64Url = await convertImageToBase64(item.image.imageData);
          urls[item.id] = base64Url;
        }
      }
      setImageUrls(urls);
    };

    processImages();
  }, [history_store]);

  return (
    <Card className={`h-fit min-h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/2 ${darkMode ? 'dark-mode' : ''}`}>
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src={LogoAi} alt="logo" style={{ width: "70px" }} />
        <Typography variant="h5" className={`${darkMode ? 'text-blue-gray-100' : ''}`}>
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
                <Cog6ToothIcon className={`h-5 w-5 ${darkMode ? 'text-blue-gray-100' : ''}`} />
              </ListItemPrefix>
              <Typography className={`mr-auto font-normal ${darkMode ? 'text-blue-gray-100' : ''}`}>
                Options
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem onClick={() => handleOpenDialog(<Profile />)}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className={`h-3 w-5 ${darkMode ? 'text-blue-gray-100' : ''}`} />
                </ListItemPrefix>
                <Typography className={`mr-auto font-normal ${darkMode ? 'text-blue-gray-100' : ''}`}>
                  Profile
                </Typography>
              </ListItem>
              <ListItem onClick={() => handleOpenDialog(<Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} advancedMode={advancedMode} toggleAdvancedMode={toggleAdvancedMode} />)}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className={`h-3 w-5 ${darkMode ? 'text-blue-gray-100' : ''}`} />
                </ListItemPrefix>
                <Typography className={`mr-auto font-normal ${darkMode ? 'text-blue-gray-100' : ''}`}>
                  Settings
                </Typography>
              </ListItem>
              <ListItem onClick={() => handleOpenDialog(<Updates />)}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className={`h-3 w-5 ${darkMode ? 'text-blue-gray-100' : ''}`} />
                </ListItemPrefix>
                <Typography className={`mr-auto font-normal ${darkMode ? 'text-blue-gray-100' : ''}`}>
                  Updates
                </Typography>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem onClick={handleLogout} color={`${darkMode ? 'white' : 'blue-gray'}`}>
          <ListItemPrefix>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-5 ${darkMode ? 'text-blue-gray-100' : ''}`}>
              <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clipRule="evenodd" />
            </svg>
          </ListItemPrefix>
          <Typography className={`mr-auto font-normal ${darkMode ? 'text-blue-gray-100' : ''}`}>
            LogOut
          </Typography>
        </ListItem>
        <hr className="my-2 border-blue-gray-50" />
        {history_store && history_store.length > 0 ? (
          history_store.map((item, index) => (
            <ListItem key={index} color={`${darkMode ? 'white' : 'blue-gray'}`} onClick={() => handleHistoryClick(index)}>
              <ListItemPrefix>
                {!item.image && <p>no image</p>}
                {item.image && imageUrls[item.id] && (
                  <div className={`mt-4 ${darkMode ? 'border-blue-gray-100' : ''}`} id="image-preview">
                    <img src={imageUrls[item.id]} alt="Uploaded" className={`w-20 h-7 object-cover mt-4 rounded-md ${darkMode ? 'text-blue-gray-100' : ''}`} />
                  </div>
                )}
              </ListItemPrefix>
              <div className={`mr-auto font-normal ${darkMode ? 'text-blue-gray-100' : ''}`}>
                {item.result.substring(item.result.indexOf('<title>') + 7, item.result.indexOf('</title>'))}
              </div>
              <Button
                variant="text"
                color="blue-gray"
                onClick={() => handleDeleteHistory(item.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
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