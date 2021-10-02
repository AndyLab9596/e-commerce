import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, Dialog, DialogActions, DialogContent, IconButton, Toolbar, Typography } from '@mui/material/';
import Register from 'features/Auth/components/Register';
import React, { Fragment, useState } from 'react';

const Header = () => {

    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => {
        setOpenDialog(true)
    }
    const handleCloseDialog = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpenDialog(false)
        }
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

                    <Button color="inherit" onClick={handleOpenDialog}>Register</Button>
                </Toolbar>
            </AppBar>
            <Dialog open={openDialog} onClose={(event, reason) => handleCloseDialog(event, reason)} >

                <DialogContent>
                    <Register handleCloseDialog={handleCloseDialog} />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>

        </Fragment>
    );
};

export default Header;