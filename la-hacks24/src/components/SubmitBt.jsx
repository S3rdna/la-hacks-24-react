import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function SubmitBt({ onClick }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <Button
        sx={{ backgroundColor: '#F38084', margin: 'auto' }}
        variant="contained"
        endIcon={<SendIcon />}
        onClick={onClick} // Handle the click event with the provided onClick function
      >
        Done
      </Button>
    </div>
  );
}
