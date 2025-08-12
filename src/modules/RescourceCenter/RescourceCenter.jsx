import React from 'react'
import ResourceTop from './ResourceTop'
import Components from '@/components'
import ProductNews from './ProductNews'
import VideoContainer from './VideoContainer'

const RescourceCenter = () => {
    return (
        <div>
            <Components.Common.HeaderSite />
            <ResourceTop />
            <ProductNews />
            <VideoContainer />
            <Components.Common.Footer />
        </div>
    )
}

export default RescourceCenter
