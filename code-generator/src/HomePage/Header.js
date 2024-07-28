import React from "react";
import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import CarouselTransition from "./cards";
import Footer from "./Footer";
import WhyCode from "./Why_code";
import Inspire from "./inspire";
import LogoAi from "./assets/logo_web_ai.png"
 
function Header() {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navigate = useNavigate();

  const LoginClick = () => {
    navigate('/login'); // Navigate to the About page
  };

  const SignUpClick = () => {
    navigate('/signup'); // Navigate to the About page
  };
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#whycode" className="flex items-center">
          Benifits
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#inspire" className="flex items-center">
          CodeForgeAI
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#footer" className="flex items-center">
          Contact Us
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="https://ai.google.dev/gemini-api/docs" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );
 
  return (
    <div className="-m-0 max-h-[768px] w-[calc(100%)] ">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4" id="header">
      <img src={LogoAi} alt="nature" id="logo-header" />
        <div className="flex items-center justify-between text-blue-gray-900">
          <div></div>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Button
                variant="text"
                size="sm"
                className="hidden lg:inline-block"
                onClick={LoginClick}
              >
                <span>Log In</span>
              </Button>
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
                onClick={SignUpClick}
              >
                <span>Sign up</span>
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="" onClick={LoginClick}>
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="" onClick={SignUpClick}>
              <span>Sign up</span>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
      <div className="mx-auto max-w-[calc(100%-2rem)] py-12 mb-12 overflow-hidden">
        <CarouselTransition />
      </div>
      <div id="whycode">
        <WhyCode />
      </div>
      <div id="inspire">
      <Inspire />
      </div>
      <div id="footer">
      <Footer />
      </div>
    </div>
  );
}

export default Header;