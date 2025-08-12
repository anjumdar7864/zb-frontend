// LoaderComp.jsx

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Papa from 'papaparse';
import { toast } from 'react-hot-toast';

const LoaderComp = ({ type = false, fileData, mappedData, fileName, onProcessingComplete }) => {
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    let isMounted = true;
    let processingComplete = false;

    const processFile = async () => {
      try {
        // Process the file data
        const newFileData = fileData.map((obj) => {
          const newObj = {};
          for (const key in mappedData) {
            if (mappedData[key]) {
              newObj[key] = obj[mappedData[key]] || '';
            }
          }
          return newObj;
        });

        const csv = Papa.unparse(newFileData, {
          error: () => {
            toast.error('Something went wrong. Please try again!');
            if (isMounted) onProcessingComplete(null);
          },
        });

        let body = new FormData();
        const newFileName = fileName.replace(/\.(xlsx|xls)$/i, '.csv');
        body.append(
          'file',
          new Blob([csv], { type: 'text/csv' }),
          newFileName || 'data.csv'
        );

        // Simulate processing time if needed
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (isMounted) {
          processingComplete = true;
          onProcessingComplete(body);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) onProcessingComplete(null);
      }
    };

    processFile();

    // Update the progress bar over time
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (processingComplete) {
          return 100;
        } else if (oldProgress >= 99) {
          return 99; // Pause at 99% until processing is complete
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 99);
      });
    }, 500);

    return () => {
      clearInterval(timer);
      isMounted = false;
    };
  }, [fileData, mappedData, fileName, onProcessingComplete]);

  return (
    <div style={{ padding: !type ? '32px 20px' : '', width: type && '265px',width:'100%' }}>
      <Box sx={{ width: '100%' }}>
        <LinearProgress
          sx={{
            height: type ? '12px' : '16px',
            backgroundColor: '#F0F0F0',
            borderRadius: type ? '12px' : '16px',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#00BD82',
              borderRadius: type ? '12px' : '16px',
            },
          }}
          variant="determinate"
          value={progress}
        />
      </Box>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px',
          color: '#012635',
          fontWeight: 500,
          fontSize: '18px',
          lineHeight: '26px',
        }}
      >
        Please wait a few minutes data is Uploading...
      </div>
    </div>
  );
};

export default LoaderComp;
