import {Typography, Button} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

function Inspire() {
  const navigate = useNavigate();

  const LoginClick = () => {
    navigate('/login'); // Navigate to the About page
  };

  const SignUpClick = () => {
    navigate('/signup'); // Navigate to the About page
  };
  return (
    <div>
      <div className="inset-0 grid h-full w-full place-items-center bg-white" id="inspire">
                <div className="w-3/4 text-center md:w-2/4">
                    <Typography
                    variant="h1"
                    color="black/75"
                    className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                    >
                    Instant answers. Greater productivity. Endless inspiration.
                    </Typography>
                    <Typography
                    variant="lead"
                    color="black/75"
                    className="mb-12 opacity-80"
                    >
                    Now you can render your generated code realtime with the power of AI.
                    </Typography>
                    <div className="flex justify-center gap-2">
                    <Button size="lg" color="black/75" id="codeforge-button" onClick={SignUpClick}>
                        Try CodeForgeAI 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
</svg>

                    </Button>
                    </div>
                </div>
            </div>
    </div>
  );
}

export default Inspire;