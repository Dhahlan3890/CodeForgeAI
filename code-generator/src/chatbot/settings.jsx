import {
    Typography,
    Switch,
  } from "@material-tailwind/react";

  
  function Settings({ darkMode, toggleDarkMode, advancedMode, toggleAdvancedMode }) {
    return (
      <div className="max-w-[32rem]">
        <div className="settings">
          <Typography variant="h5" >
            Dark Mode
          </Typography>
          <Switch defaultChecked={darkMode} onChange={toggleDarkMode}  />
        </div>
        <div className="settings">
          <Typography variant="h5">
            Advanced AI
          </Typography>
          <Switch defaultChecked={advancedMode} onChange={toggleAdvancedMode} />
        </div>
      </div>
    );
  }
  
  export default Settings;
  