import React from 'react'
import VideoList from './VideoList'
import Assets from '@/assets'

const VideoContainer = () => {
    const list = [
        {
            title: "How to Choose Your Phone Number",
            discription: "In this video, let’s explore how to gather and record information during a phone call.",
            duration: "Duration: 3 min 12",
            image: Assets.Images.videoList1
        },
        {
            title: "How to Dial a Phone Number",
            discription: "In this video, let’s explore how to use three live call features that will make your job a lot easier and help you deliver excellent customer service.",
            duration: "Duration: 3 min 12",
            image: Assets.Images.videoList2
        },
        {
            title: "How to Find Caller Information",
            discription: "In this video, let’s walk through how to transfer a call to the relevant person.",
            duration: "Duration: 3 min 12",
            image: Assets.Images.videoList4
        },
        {
            title: "How to Log Information During a Call",
            discription: "In this video, let’s explore how to gather and record information during a phone call.",
            duration: "Duration: 3 min 12",
            image: Assets.Images.videoList1
        },
        {
            title: "How to Record, Mute, and Hold a Call",
            discription: "In this video, let’s explore how to use three live call features that will make your job a lot easier and help you deliver excellent customer service.",
            duration: "Duration: 3 min 12",
            image: Assets.Images.videoList5
        },
        {
            title: "How to Transfer a Live Call",
            discription: "In this video, let’s walk through how to transfer a call to the relevant person.",
            duration: "Duration: 3 min 12",
            image: Assets.Images.videoList6
        } , 
        {
            title: "How to Call Multiple People at Once",
            discription: "In this video, let’s walk through how to transfer a call to the relevant person.",
            duration: "Duration: 3 min 12",
            image: Assets.Images.videoList7
        }
    ]
    return (
        <div style={{width:"100%" , display:"flex" , flexDirection:"column" , alignItems:"center"}}>
            <VideoList list={list} title={"Phone App videos"} />
            <VideoList list={list} title={"Dashboard videos"} />
            <VideoList list={list} title={"Product webinars"} />
        </div>
    )
}

export default VideoContainer
