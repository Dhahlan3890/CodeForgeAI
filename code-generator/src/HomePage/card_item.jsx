import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import PropTypes from 'prop-types';

function BackgroundBlogCard({ Heading, Name, Url }) {
  return (
    <Card
      shadow={true}
      className="relative grid h-[40rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="absolute inset-0 m-0 h-full w-full rounded-none"
        style={{ backgroundImage: `url(${Url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </CardHeader>
      <CardBody className="relative py-14 px-6 md:px-12">
        <Typography
          variant="h2"
          color="white"
          className="mb-6 font-medium leading-[1.5]"
        >
          {Heading}
        </Typography>
        <Typography variant="h5" className="mb-4 text-gray-400">
          {Name}
        </Typography>
      </CardBody>
    </Card>
  );
}

BackgroundBlogCard.propTypes = {
  Heading: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired,
  Url: PropTypes.string.isRequired,
};

BackgroundBlogCard.defaultProps = {
  Heading: 'Default Heading',
  Name: 'Default Name',
  Url: 'https://via.placeholder.com/150',
};

export default BackgroundBlogCard;
