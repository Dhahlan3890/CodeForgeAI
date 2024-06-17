import {Typography} from "@material-tailwind/react";
import BackgroundBlogCard from "./card_item";

function WhyCode () {
    return (
        <>
        <Typography
        variant="h1"
        color="black"
        className="mb-12 text-2xl md:text-3xl lg:text-4xl"
        >
            Why CodeForgeAI
            </Typography>
        <div id="card-set-container">
        <div id="card-set">
            <BackgroundBlogCard Heading="Make Your new Projects within a minute." Name="All you need is a screenshot" Url='https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcGVyfGVufDB8fDB8fHww'/>
            <BackgroundBlogCard Heading="No need to worry about Designing Anymore." Name="All you need is a screenshot" Url='https://plus.unsplash.com/premium_photo-1664461662767-41fe84f7748d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d2ViJTIwZGV2ZWxvcGVyfGVufDB8fDB8fHww'/>
            <BackgroundBlogCard Heading="Modify your code with the power of AI." Name="All you need is a screenshot" Url='https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlYiUyMGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D'/>
            <BackgroundBlogCard Heading="Design your Website as where you are." Name="All you need is a screenshot" Url='https://plus.unsplash.com/premium_photo-1675008166610-deb4c5c62ddc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHdlYiUyMGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D'/>
            <BackgroundBlogCard Heading="Finish your Projects within the time." Name="All you need is a screenshot" Url='https://images.unsplash.com/photo-1553390774-b4822481c894?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdlYiUyMGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D'/>
        </div>
        </div>
        </>
    );
}

export default WhyCode;


