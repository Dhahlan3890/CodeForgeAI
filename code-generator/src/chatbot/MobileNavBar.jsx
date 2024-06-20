import React from "react";
import {
  IconButton,
  Drawer,
} from "@material-tailwind/react";

import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import Sidebar from "./SideBar";
 
function MobileNav(history, darkMode, toggleDarkMode, AdvancedMode, toggleAdvancedMode) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
 
  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Sidebar history_store={history} darkMode={darkMode} toggleDarkMode={toggleDarkMode} AdvancedMode={AdvancedMode} toggleAdvancedMode={toggleAdvancedMode}/>
      </Drawer>
    </>
  );
}


export default MobileNav;