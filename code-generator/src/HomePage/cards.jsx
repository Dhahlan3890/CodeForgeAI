import { Carousel, Typography} from "@material-tailwind/react";
import { Textarea, Button, IconButton } from "@material-tailwind/react";
import Card1 from "./assets/card1.jpg"
import Card2 from "./assets/card2.jpg"
import Card3 from "./assets/card3.jpg"
 
function CarouselTransition() {
  return (
    <Carousel transition={{ duration: 1 }} className="rounded-xl" autoplay="true" loop="true" id="slide">
        <div className="relative h-full w-full">
            <img
                src={Card1}
                alt="image 1"
                className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                <div className="w-3/4 text-center md:w-2/4">
                    <Typography
                    variant="h1"
                    color="white"
                    className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                    >
                    Spring Update
                    </Typography>
                    <Typography
                    variant="lead"
                    color="white"
                    className="mb-12 opacity-80"
                    >
                    Introducing Desiginer with more capabilities with just one click from a screenshot.
                    </Typography>
                    <div className="flex justify-center gap-2">
                    <Button size="lg" color="white">
                        Explore
                    </Button>
                    </div>
                </div>
            </div>
        </div>
        <div className="relative h-full w-full">
            <img
                src={Card2}
                alt="image 1"
                className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                <div className="w-3/4 text-center md:w-2/4">
                    <Typography
                    variant="h1"
                    color="white"
                    className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                    >
                    Ask Designer anything
                    </Typography>
                    <Typography
                    variant="lead"
                    color="white"
                    className="mb-12 opacity-80"
                    >
                    <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-white-900/10 bg-white-900/5 p-2">
                    <Textarea
                        
                        rows={1}
                        resize={true}
                        placeholder="Ask Anything"
                        className="min-h-full !border-0 focus:border-transparent"
                        containerProps={{
                        className: "grid h-full",
                        }}
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                    />
                    <div>
                        <IconButton variant="text" className="rounded-full" type="submit" color="white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                            />
                        </svg>
                        
                        </IconButton>
                    </div>
                    
                    </div>
                    </Typography>
                </div>
            </div>
        </div>
        <div className="relative h-full w-full">
            <img
                src={Card3}
                alt="image 1"
                className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                <div className="w-3/4 text-center md:w-2/4">
                    <Typography
                    variant="h1"
                    color="white"
                    className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                    >
                    Realtime Preview
                    </Typography>
                    <Typography
                    variant="lead"
                    color="white"
                    className="mb-12 opacity-80"
                    >
                    Now you can render your generated code realtime with the power of AI.
                    </Typography>
                    <div className="flex justify-center gap-2">
                    <Button size="lg" color="white">
                        Explore
                    </Button>
                    </div>
                </div>
            </div>
        </div>
    </Carousel>
  );
}

export default CarouselTransition;