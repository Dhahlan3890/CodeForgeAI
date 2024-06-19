import {
    Typography,
    Switch,
  } from "@material-tailwind/react";
  
  function Settings({ darkMode, toggleDarkMode }) {
    return (
      <div className="w-[32rem]">
        <div className={`settings ${darkMode ? 'text-white' : ''}`}>
          <Typography variant="h5" >
            Dark Mode
          </Typography>
          <Switch defaultChecked={darkMode} onChange={toggleDarkMode}  />
        </div>
        <div className="settings">
          <Typography variant="h5">
            Advanced AI
          </Typography>
          <Switch />
        </div>
      </div>
    );
  }
  
  export default Settings;
  