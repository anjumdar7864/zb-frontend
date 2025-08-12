import Assets from '@/assets'
import React from 'react'

const SuccessComp = ({closeFunc}) => {
    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "206px", justifyContent: "center" }}>
                <div style={{ width: "100px", height: "100px", display: "flex", justifyContent: "center", borderRadius: "100%", backgroundColor: "#C6E9D6", alignItems: "center" }}>
                    <img src={Assets.Images.sealCheck} width={'44px'} height={'44px'} />

                </div>
                <div style={{ fontSize: "18px", fontWeight: 600, lineHeight: "26px", color: "#012635", marginTop: "20px" }}>
                    File add successfully!
                </div>
            </div>
            <div>
                <div onClick={closeFunc} style={{ backgroundColor: "#00BD82", borderRadius: "8px", color: "white", width: "100px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", margin: "auto" , cursor:"pointer" }}>Done</div>
            </div>
        </div>
    )
}

export default SuccessComp
