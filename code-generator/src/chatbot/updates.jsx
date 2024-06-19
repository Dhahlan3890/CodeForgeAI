import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
    Typography,
  } from "@material-tailwind/react";
  import { HomeIcon, BellIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
   
  function Updates() {
    return (
      <div className="w-[32rem]">
        <Timeline>
          <TimelineItem>
            <TimelineConnector />
            <TimelineHeader>
              <TimelineIcon className="p-2">
                <HomeIcon className="h-4 w-4" />
              </TimelineIcon>
              <Typography variant="h5" color="blue-gray">
                CodeForgeAI V1.105
              </Typography>
            </TimelineHeader>
            <TimelineBody className="pb-8">
              <Typography color="gary" className="font-normal text-gray-600">
                The key to more success is to have a lot of pillows. Put it this way, it took me
                twenty five years to get these plants, twenty five years o
              </Typography>
            </TimelineBody>
          </TimelineItem>
          <TimelineItem>
            <TimelineConnector />
            <TimelineHeader>
              <TimelineIcon className="p-2">
                <BellIcon className="h-4 w-4" />
              </TimelineIcon>
              <Typography variant="h5" color="blue-gray">
                CodeForgeAI V1.1
              </Typography>
            </TimelineHeader>
            <TimelineBody className="pb-8">
              <Typography color="gary" className="font-normal text-gray-600">
                The key to more success is to have a lot of pillows. Put it this way, it took me
                twenty five years to get these plants, twenty five years 
              </Typography>
            </TimelineBody>
          </TimelineItem>
          <TimelineItem>
            <TimelineHeader>
              <TimelineIcon className="p-2">
                <CurrencyDollarIcon className="h-4 w-4" />
              </TimelineIcon>
              <Typography variant="h5" color="blue-gray">
                CodeForgeAI V1.0
              </Typography>
            </TimelineHeader>
            <TimelineBody>
              <Typography color="gary" className="font-normal text-gray-600">
                The key to more success is to have a lot of pillows. Put it this way, it took me
                twenty five years to get these plants, twenty five years of 
              </Typography>
            </TimelineBody>
          </TimelineItem>
        </Timeline>
      </div>
    );
  }

export default Updates;