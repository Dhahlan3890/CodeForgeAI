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
        <Typography variant="paragraph" className="mb-5">
          Embrace the darkness or bask in the light; with just a touch, you control the ambiance. Switch effortlessly between dark and light mode, and let your device reflect your style.
        </Typography>
        <div className="settings">
          <Typography variant="h5">
            Advanced AI
          </Typography>
          <Switch defaultChecked={advancedMode} onChange={toggleAdvancedMode} />
        </div>
        <Typography variant="paragraph" className="mb-5">
          Unlock the power of advanced AI for the ultimate experience. While it may be slower, the precision and accuracy are unparalleled. Elevate your platform use to new heights.
        </Typography>
      </div>
    );
  }
  
  export default Settings;
  