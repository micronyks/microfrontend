import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
//import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { SETTINGS } from '../core/constants/settings.constant';
import { ROUTE } from '../core/constants/route.constant';

import './navbar.component.css';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = [SETTINGS.LOGOUT];

const NavbarComponent: React.FC<{ navigateTo: (routeTo: string) => void, profileMenuClickHandler: (menuItem: string) => void, isAuthenticated: boolean }> = (props: any) => {
//   // const navigate = useNavigate();
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
//   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     console.log('open nav menu');
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//     console.log('open user menu');
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     console.log('Close nav menu');
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = (item: any) => {
//     setAnchorElUser(null);
//     props.profileMenuClickHandler(item);
//   };


//   const logoClickHandler = () => {
//     if (props.isAuthenticated) {
//       props.navigateTo(ROUTE.HEADER.DASHBOARD);
//     } else {
//       props.navigateTo(ROUTE.HEADER.LOGIN);
//     }
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             onClick={logoClickHandler}
//             className="logo_branding"
//             sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
//           >
//             WiDEUI
//           </Typography>

//           {props.isAuthenticated && <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>}


//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             className="logo_branding"
//             onClick={logoClickHandler}
//             sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
//           >
//             WiDEUI
//           </Typography>


//           {props.isAuthenticated && <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>}

//           {props.isAuthenticated && <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>}
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );

 return(
  <div>Header</div>
 )
 }
 export default NavbarComponent;
