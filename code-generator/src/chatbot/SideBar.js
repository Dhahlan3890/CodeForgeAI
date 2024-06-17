import React from "react";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import AuthService from '../authService';
import LogoAi from "../HomePage/assets/logo_web_ai.png"
 
function Sidebar({history_store}) {
  const [openNav, setOpenNav] = React.useState(false);
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/');
  };
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const navigate = useNavigate();

  const UpgradeClick = () => {
    navigate('/upgrade'); // Navigate to the About page
  };
 
  return (
    <Card className="h-fit min-h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/2">
      <div className="mb-2 flex items-center gap-4 p-4">
      <img src={LogoAi} alt="nature" style={{width:"70px"}} />
        <Typography variant="h5" color="blue-gray">
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
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Options
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Settings
              </ListItem>
              <ListItem>
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
                  <ListItem key={index}>
                    <ListItemPrefix>
                    {!item.image && (
                      <p>no image</p>
                        )}
                    {item.image && (
                      <div className="mt-4" id="image-preview">
                        <img src={item.image} alt="Uploaded" className="w-20 h-7 object-cover mt-4 rounded-md" />
                        </div>
                        )}
                    </ListItemPrefix>
                    {item.result.substring(0,50)}
                    {item.result.length > 50 && '...'}
                    
                  </ListItem>
                  
                ))
              ) : (
                <p>No history available</p>
              )}
      </List>
      <Alert open={openAlert} className="mt-auto" onClose={() => setOpenAlert(false)}>
        <CubeTransparentIcon className="mb-4 h-12 w-12" />
        <Typography variant="h6" className="mb-1">
          Upgrade to PRO
        </Typography>
        <Typography variant="small" className="font-normal opacity-80">
          Upgrade to Material Tailwind PRO and get even more components, plugins, advanced features
          and premium.
        </Typography>
        <div className="mt-4 flex gap-3">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="font-medium opacity-80"
            onClick={() => setOpenAlert(false)}
          >
            Dismiss
          </Typography>
          <Typography as="a" href="#" variant="small" className="font-medium" onClick={UpgradeClick}>
            Upgrade Now
          </Typography>
        </div>
      </Alert>
    </Card>
  );
}

export default Sidebar;