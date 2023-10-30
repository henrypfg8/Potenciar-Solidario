import {useState, Fragment} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Avatar, Typography } from '@mui/material';

const DrawerSideBar = () => {
    const [state, setState] = useState({left: false,});
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
      const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
            <Typography variant='h1' sx={{
                fontSize : '1.3rem',
            }}>
                Panel de administración
            </Typography>
            <Avatar sx={{ width : 100, height : 100}}/>
        </Box>
      );
  return (
    <div>
    {['presiona aqui'].map((anchor) => (
      <Fragment key={anchor}>
        <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
         
        >
          {list(anchor)}
        </Drawer>
      </Fragment>
    ))}
  </div>
  )
}

export default DrawerSideBar