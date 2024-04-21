import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar({ name }) {
  return (
    <div className="stretch">

      
    <Box style={{marginTop: 0}} className="stretch" sx={{ flexGrow: 1 }}>
      <AppBar position="relative" sx={{backgroundColor: '#F38084', opacity: 0.7}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          <Button color="inherit">{name}</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  );
}