import React, { useState, useEffect } from 'react';
import styles from './Notification.module.css';
import { FiSearch } from 'react-icons/fi';
import TableComponent from './NotificationTable';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1)

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay for debouncing

    // Cleanup the timeout on each render to avoid multiple timeouts
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Use debouncedSearchTerm to call your search function/API
  useEffect(() => {
    if (debouncedSearchTerm) {
        
      // Call the search function/API with debouncedSearchTerm
      console.log("Search Term:", debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <div className='pageHeaderLayout'>
        <div className={styles.InboxStyledTopLeft}>
          <h1 className='body1SemiBold textPrimeryColor'>Notification</h1>
        </div>
      </div>
      <div className={styles.filterContainer}>
        <div>
          <div className={styles.filter_right}>
            <div className={styles.searchContainer}>
              <FiSearch style={{ fontSize: '22px', color: '#012635' }} />
              <form
                onSubmit={(e) => {
                  e.preventDefault(); // ✅ Prevent page refresh
                }}
                autoComplete='off'
              >
                <input
                  autoComplete='off'
                  className={styles.SearchInput}
                  type='text'
                  placeholder='Search...'
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    if(setCurrentPage != 1){
                        setCurrentPage(1)
                    }
                }} // Set search term on change
                />
              </form>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => navigate('/notifications/create')}
            className='buttonHeight primeryBackground textWhiteColor body4Medium'
          >
            Create Notification
          </button>
        </div>
      </div>

      <TableComponent debouncedSearchTerm={debouncedSearchTerm} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </div>
  );
};

export default Notification;
