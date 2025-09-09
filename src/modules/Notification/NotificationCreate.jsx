import React, { useMemo, useState } from 'react';
import styles from './CreateNotification.module.css';
import { addNotification, REQUEST_TYPES } from '@/utils/constant/url';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { commonAPICall } from '@/services/api/common';
import { useDispatch } from 'react-redux';
import { logOut } from '@/store/actions';

export default function CreateNotification() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    category: '',
    types: { email: false, popup: false },
    title: '',
    description: '',
    ctaTitle: '',
    ctaLink: 'http://Lorem Ipsum is simply dummy text',
  });
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({ title: false, description: false, category: false });

  const onChange = (key, value) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    if (['title', 'description', 'category'].includes(key)) {
      const isEmpty = String(value ?? '').trim().length === 0;
      setErrors((previous) => ({ ...previous, [key]: isEmpty }));
    }
  };
  const onCheck = (key) => setForm((previous) => ({ ...previous, types: { ...previous.types, [key]: !previous.types[key] } }));
  const navigate = useNavigate();

  const previewText = useMemo(() => form.title?.trim() || 'Please add your title', [form.title]);
  const previewSub = useMemo(() => {
    if (form.description?.trim()) return form.description;
    if (form.types.email) return 'Email Notification request sent!';
    if (form.types.popup) return 'Popup Notification ready';
    return '';
  }, [form.description, form.types]);

  const validate = () => {
    const newErrors = {
      title: String(form.title ?? '').trim().length === 0,
      description: String(form.description ?? '').trim().length === 0,
      category: String(form.category ?? '').trim().length === 0,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fill all required fields.');
      return;
    }
    SendNotification();
  };

  const SendNotification = async (value = 'password') => {
    try {
      setLoader(true);
      const payload = {
        title: form?.title,
        description: form?.description,
        category: form?.category,
      };

      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.POST,
        addNotification(),
        payload
      );
      setLoader(false);
      if(data?.title){
        navigate('/notifications');
        toast.success('Notification sent successfully.');
      }
   

      if (sessionExpired) {
        // sessionStorage.clear()
        dispatch(logOut());
        navigate('/Login');
      }
      if (isError) {
        return toast.error(message);
      }

      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        //  className={styles.InboxStyledTop}
        className='pageHeaderLayout'
      >
        <div className={styles.InboxStyledTopLeft}>
          <h1
            //  className={styles.InboxStyledTopLeftH1}
            className='body1SemiBold textPrimeryColor'
          >Create notification</h1>
        </div>
      </div>
      <div className={styles.pageWrapper}>
        <main className={styles.mainGrid}>
          <form onSubmit={submit} className={styles.formContainer} noValidate>
            <div className={styles.card}>
              <div style={{marginTop:"0px"}} className={styles.formSection}>
                <label className={`body3Medium textPrimeryColor`}>Notification information</label>
              </div>

              <div className={styles.formSection}>
                <label className={`body4Medium textPrimeryColor`}>Category</label>
                <div className={styles.inputWrapper}>
                  <select
                    value={form.category}
                    onChange={(e) => onChange('category', e.target.value)}
                    style={{ zIndex: 1 }} 
                    className={`${styles.selectInput} body4Regular textPrimeryColor ${errors.category ? styles.errorInput : ''}`}
                  >
                    <option value=''>Select</option>
                    <option value='general'>General</option>
                    <option value='Warning'>Warning</option>
                    <option value='Alert'>Alert</option>
                  </select>
                </div>
              </div>

         

              <div className={styles.formSection}>
                <label className={`body4Medium textPrimeryColor`}>Notification Title</label>
                <input
                  value={form.title}
                  maxLength={30}
                  onChange={(e) => onChange('title', e.target.value)}
                  placeholder='Enter Notification Title'
                  className={`${styles.textInput} body4Regular textPrimeryColor ${errors.title ? styles.errorInput : ''}`}
                />
              </div>

              <div className={styles.formSection}>
                <label className={`body4Medium textPrimeryColor`}>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => onChange('description', e.target.value)}
                  rows={4}
                  maxLength={200}
                  placeholder='Enter Description'
                  className={`${styles.textarea} body4Regular textPrimeryColor ${errors.description ? styles.errorInput : ''}`}
                />
              </div>

      
              <div className={styles.formActions}>
                <button onClick={() => navigate(-1)} type='button' className={`${styles.button} ${styles.buttonCancel} body4Medium textPrimeryColor`}>
                  Cancel
                </button>
                <button type='submit' disabled={loader} className={`${styles.button} ${styles.buttonSubmit} body4Medium textWhiteColor`}>
                  {loader ? 'Creating...' : 'Create'}
                </button>
              </div>
            </div>
          </form>

          <div style={{ width: '100%', maxWidth: '600px',  minHeight:"470px" ,  display: 'flex', flexDirection: 'column' , backgroundColor:"white" , border:"solid 1px #E0E0E0" , borderRadius:"8px" }}>
            <div style={{}}>
              <div
                style={{
                  padding: '16px 24px',
                  fontSize: '14px',
                  lineHeight: '22px',
                  fontWeight: 500,
                  color: '#012635',
                }}
              >
                Preview
              </div>
              <div
                style={{
                  padding: '24px',
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  minHeight: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  maxWidth:"550px"
                }}
              >
                <div
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '16px',
                    width: '100%',
                    margin: '0 auto',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    boxShadow: '0 10px 13px rgba(0,0,0,0.1)',
                  }}
                >
                  {form?.category == 'Warning' ? (
                    <svg width='48' height='48' viewBox='0 0 24 24' fill='none' style={{ marginBottom: '12px' }}>
                      <circle cx='12' cy='12' r='10' fill='#FFF3CD' stroke='#FFC107' strokeWidth='2' />
                      <path d='M12 7v6' stroke='#FFC107' strokeWidth='2' strokeLinecap='round' />
                      <circle cx='12' cy='16' r='1' fill='#FFC107' />
                    </svg>
                  ) : form?.category == 'Alert' ? (
                    <svg width='48' height='48' viewBox='0 0 24 24' fill='none' style={{ marginBottom: '12px' }}>
                      <circle cx='12' cy='12' r='10' fill='#FEE2E2' stroke='#EF4444' strokeWidth='2' />
                      <path d='M12 8v4' stroke='#EF4444' strokeWidth='2' strokeLinecap='round' />
                      <circle cx='12' cy='16' r='1' fill='#EF4444' />
                    </svg>
                  ) : (
                    <svg width='48' height='48' viewBox='0 0 24 24' fill='none' style={{ marginBottom: '12px' }}>
                      <circle cx='12' cy='12' r='10' fill='#D1FAE5' stroke='#10B981' strokeWidth='2' />
                      <path d='M8 12l3 3 5-6' stroke='#10B981' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                  )}

                  <div
                    style={{
                      fontSize: '20px',
                      lineHeight: '28px',
                      fontWeight: 500,
                      color: '#012635',
                      marginBottom: '8px',
                      textAlign: 'center',
                    }}
                  >
                    {previewText || 'Warning'}
                  </div>

                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontWeight: 400,
                      color: '#535151',
                      textAlign: 'center',
                      marginBottom: '16px',
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word', 
                    }}
                  >
                    {previewSub || 'Please be aware of this important notification.'}
                  </p>

                  <button
                    style={{
                      backgroundColor: '#00BD82',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontWeight: 500,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function MailIllustration({ className = '' }) {
  return (
    <svg className={className} width='160' height='120' viewBox='0 0 320 240' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='40' y='60' width='240' height='120' rx='12' fill='#FFECD6' />
      <path d='M56 72l104 64L264 72' stroke='#F59E0B' strokeWidth='6' fill='none' strokeLinecap='round' />
      <circle cx='248' cy='164' r='18' fill='#FFB4B4' />
      <path d='M248 156v16m-8-8h16' stroke='#D23B3B' strokeWidth='4' strokeLinecap='round' />
      <circle cx='88' cy='172' r='6' fill='#A78BFA' />
      <circle cx='108' cy='52' r='4' fill='#A7F3D0' />
      <circle cx='142' cy='40' r='3' fill='#93C5FD' />
      <circle cx='198' cy='44' r='5' fill='#FDE68A' />
    </svg>
  );
}
