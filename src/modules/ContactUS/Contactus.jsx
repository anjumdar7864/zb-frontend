import React, { useRef, useState } from 'react'
import styles from './ContactUs.module.css'
import Assets from '@/assets'
import Components from '@/components'
import CustomizedCheckbox from '@/components/common/CustumizeCheckbox/CustumizeCheckbox'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { commonAPICall } from '@/services/api/common'
import { ENDPOINTS, REQUEST_TYPES } from '@/utils/constant/url'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const EmailValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name can't be longer than 50 characters"),

    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

    phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be only digits")
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number can't be longer than 15 digits")
        .required("Phone number is required"),

    message: Yup.string()
        .required("Message is required")
        // .min(10, "Message must be at least 10 characters")
        .max(500, "Message can't be longer than 500 characters"),
});

const Contactus = () => {
    const [curruntImg, setCurruntImg] = useState(Assets.Images.contactImage1)
    const [countryCode, setCountryCode] = useState(1)
    const [isChecked, setIsChecked] = useState(0)

    const navigate = useNavigate()
    const conRef = useRef(null)

    const [phoneNumber, setPhoneNumber] = useState("")
    const list = [
        { title: "Sales Enquiry" },
        { title: "Customer Support" },
        { title: "Customer Feedback" },
        { title: "Press" },
        { title: "Other" },
    ]
    console.log("check phone number", phoneNumber);

    const locationList = [
        {
            title: "Los Angeles",
            discription: "11 Rue Saint-Georges, ",
            discription2: "75009 Paris, Los Angeles",
            number: "+33 1 76 36 06 95",
            img: Assets.Images.contactImage1,
        },
        {
            title: "Berlin",
            discription: "Neue Schônhauserstraße 3-5 ",
            discription2: "10178 Berlin, Germany",
            number: "+49 30 30808459",
            img: Assets.Images.contactImage2,
        },
        {
            title: "Cairo",
            discription: "José Abascal Street, 45, ",
            discription2: "3rd floor 28003 Madrid, Cairo",
            number: "+34 911 23 96 09",
            img: Assets.Images.contactImage3,
        },
        {
            title: "Cebu",
            discription: "17 St Helen's Pl Cebu, UK",
            discription2: "",
            number: "+44 20 3318 7154",
            img: Assets.Images.contactImage4,
        },
        {
            title: "Islamabad",
            discription: "11 Rue Saint-Georges,",
            discription2: " 75009 Paris, France",
            number: "+33 1 76 36 06 95",
            img: Assets.Images.contactImage5,
        },
        {
            title: "NewDelhi",
            discription: "Level 13/6 Bligh St, ",
            discription2: " New Delhi , India",
            number: "+91 91265 38278",
            img: Assets.Images.contactImage6,
        },
    ]

    const handleChangeFunc = (index) => {
        // console.log("checkkkkkkkk" , index);
        
        setIsChecked(index)
    }
    const scrollTo = () => {
    
    
    
        if (conRef.current) {
        
          conRef.current.scrollIntoView({ behavior: "smooth" });
        }
      };
    return (
        <div>
            <Components.Common.HeaderSite />
            <div ref={conRef} className={styles.top}>
                <div className={styles.imgContainer}>
                    <img className={styles.BackgroundImg} src={Assets.Images.ContactUSBack} width={'100%'} height={'100%'} />

                </div>

                <div className={styles.contantContainer}>

                    <div className={styles.topLeft}>
                        <div className={styles.phoneTitle}>
                            <div style={{ textAlign: "center", fontSize: "38px", fontWeight: 600, color: "white" }}>Get in touch</div>
                            <div style={{ textAlign: "center", fontSize: "18px", fontWeight: 400, color: "white" }}>We’ve built a stable foundation you can <br /> trust to carry all your conversations</div>
                        </div>
                        <div className={styles.formContainer}>
                            <div className={styles.title}>

                                <div className={styles.topTitle} >Get in touch</div>
                                <div className={styles.topDis} >Need to get in touch with the team? We're all ears.</div>
                            </div>
                            <Formik
                                initialValues={{ name: "", email: "", phoneNumber: "", message: "" }}
                                validationSchema={EmailValidationSchema}
                                onSubmit={async (values, { setSubmitting, resetForm }) => {
                                    console.log("Submitted values:", values);

                                    const result = values.phoneNumber.toString().replace(countryCode.toString(), '');
                                    const payload = {
                                        name: values.name,
                                        email: values.email,
                                        phoneNumber: result,
                                        message: values.message,
                                        feedback: "for tst",
                                    }

                                    try {
                                        const { data, isError, message, sessionExpired } = await commonAPICall(
                                            REQUEST_TYPES.POST,
                                            `${ENDPOINTS.Contact_US}`,
                                            payload
                                        );


                                        if (isError) {

                                            toast.error(message);
                                            return toast.error(message);
                                        }

                                        toast.success("Email has been sent successfully.");
                                        resetForm()

                                    } catch (error) {

                                        toast.error(message);
                                        console.log(error);
                                    }



                                    setSubmitting(false);
                                }}
                            >
                                {({ isSubmitting, handleChange, values, errors, setFieldValue }) => {






                                    return (
                                        <Form>
                                            <div  className={styles.form}>
                                                <Components.Common.InputWithError
                                                    placeholder="Name"
                                                    name={`name`}
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    style={{
                                                        backgroundColor: `rgba(255, 255, 255, 0.1)`,
                                                        color: "white",
                                                        border: "none",
                                                        borderRadius: "0.8rem",
                                                        padding: "19px 20px",
                                                        fontSize: "18px",
                                                        height: "64px"
                                                    }}
                                                    error={errors.name}
                                                />
                                                <Components.Common.InputWithError
                                                    placeholder="Email"
                                                    name={`email`}
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    style={{
                                                        backgroundColor: `rgba(255, 255, 255, 0.1)`,
                                                        color: "white",
                                                        border: "none",
                                                        borderRadius: "0.8rem",
                                                        padding: "19px 20px",
                                                        fontSize: "18px",
                                                        height: "64px"
                                                    }}
                                                    error={errors.email}
                                                />

                                                <Components.Common.MyInputPhone
                                                    placeholder="Phone No"
                                                    name='phoneNumber'
                                                    value={values.phoneNumber}
                                                    // onChange={(phone) =>setPhoneNumber( phone)}
                                                    onChange={(phone) => { setFieldValue("phoneNumber", phone) }}
                                                    type="phone"
                                                    style={{
                                                        backgroundColor: `rgba(255, 255, 255, 0.1)`,
                                                        color: "white",
                                                        width: "100%",
                                                        border: "none",
                                                        borderRadius: "0.8rem",
                                                        height: "64px",
                                                        fontSize: "18px",
                                                    }}
                                                    error={errors.phoneNumber}
                                                />
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                                                    {
                                                        list.map((data, i) => {
                                                            return <CustomizedCheckbox checked={isChecked == i ? true : false} title={data.title} keyIndex={i} handleChangeFunc={handleChangeFunc} />
                                                        })
                                                    }

                                                </div>
                                                <textarea placeholder="Message" name="message" onChange={handleChange} value={values.message} style={{ backgroundColor: `rgba(255, 255, 255, 0.1)`, color: "white", border: "none", borderRadius: "0.8rem", padding: "19px 20px", fontSize: "18px", height: "123px", outline: "none" }} />
                                                <div style={{ paddingTop: "20px" }}>
                                                    <button disabled={isSubmitting || !!errors.email || !values.email} type='submit' className={styles.submitButton}>Contact Us</button>
                                                </div>
                                            </div>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>

                    </div>
                    <div className={styles.topRight}>
                        <img
                            // width={'486px'}
                            // height={'662px'}
                            width={"100%"}
                            style={{ maxWidth: "486px" }}
                            src={Assets.Images.contactUsPerson}
                        />

                    </div>
                </div>
            </div>
            <div className={styles.middle}>
                <div className={styles.middleTitle}>Our offices</div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className={styles.middleContainer}>
                        <div>
                            {
                                locationList.map((data, i) => {
                                    return <div className={styles.locationContainer} key={i}>
                                        <div className={styles.locationLeft}>
                                            <div className={styles.locationImg}>
                                                <img src={data.img} width={'64px'} height={'64px'} />
                                            </div>

                                            <div className={styles.locationTitle}>{data.title}</div>
                                        </div>

                                        <div>
                                            <div className={styles.break}>
                                                <div className={styles.locationDiscription}>{data.discription}</div>
                                                <div className={styles.locationDiscription}>{data.discription2}</div>
                                            </div>

                                            <div className={styles.locationNumber}>{data.number}</div>
                                        </div>

                                    </div>

                                })
                            }
                        </div>
                        <div className={styles.middleRight}>
                            <img src={curruntImg} width={"100%"} />
                        </div>
                    </div>
                </div>

            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "48px 16px" }}>
                <div style={{ backgroundImage: `url(${Assets.Images.bg})` }} className={styles.bottom}>
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", gap: "24px" }}>
                        <div><img src='./icons/Brand-logo.svg' /></div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", flexDirection: "column", textAlign: "center" }}>
                            <div className={styles.bottomTitle}>Ready to build better conversations?</div>
                            <div style={{ fontSize: "18px", fontWeight: 500, lineHeight: "26px", color: "white" }}>Zeit Blast runs on the device you're using right now.</div>

                        </div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <button onClick={() => navigate("/pricing")} className={styles.startButton}>Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
            <Components.Common.Footer />

        </div>
    )
}

export default Contactus
