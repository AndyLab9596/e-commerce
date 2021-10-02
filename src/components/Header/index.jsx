import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import { AppBar, Avatar, Button, Dialog, DialogContent, Divider, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from '@mui/material/';
import { pink } from '@mui/material/colors';
import { Box } from '@mui/system';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
}

const Header = () => {
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openDialog, setOpenDialog] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);
    const loggedInUser = useSelector(state => state.user.current);
    const isLogged = !!loggedInUser.id;

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }
    const handleCloseDialog = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpenDialog(false)
        }
    }

    const handleLogoutClick = () => {
        dispatch(logout())
    }

    return (
        <Fragment>
            <AppBar position="static">
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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        E-commerce
                    </Typography>

                    {!isLogged && (
                        <Button color="inherit" onClick={handleOpenDialog}>Login</Button>
                    )}
                    {isLogged && (
                        <Fragment>
                            <IconButton color="inherit" onClick={handleClick}>
                                <AccountCircleIcon />
                            </IconButton>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
            <Dialog open={openDialog} onClose={(event, reason) => handleCloseDialog(event, reason)} >

                <IconButton sx={{ position: "absolute", top: "0", left: "5px" }}>
                    <CloseIcon sx={{ color: pink[500] }} onClick={handleCloseDialog} />
                </IconButton>

                <DialogContent>

                    {mode === MODE.REGISTER && (
                        <Fragment>
                            <Register handleCloseDialog={handleCloseDialog} />
                            <Box sx={{ textAlign: "center" }}>
                                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>Already have an account log in here</Button>
                            </Box>

                        </Fragment>
                    )}

                    {mode === MODE.LOGIN && (
                        <Fragment>
                            <Login handleCloseDialog={handleCloseDialog} />
                            <Box sx={{ textAlign: "center" }}>
                                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>Don't have an account register here</Button>
                            </Box>

                        </Fragment>
                    )}

                </DialogContent>
            </Dialog>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>

        </Fragment>
    );
};

export default Header;