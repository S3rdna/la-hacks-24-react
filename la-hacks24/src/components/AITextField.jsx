import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function AITextField() {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" style={{ fontSize: 25, minHeight: '64px' }}>
      What is your spice tolerance on a level of 1-10?
    </Alert>
    
  );
}
