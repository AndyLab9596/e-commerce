import { Link } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',

        padding: 0,
        listStyleType: 'none',

        '& > li': {
            padding: 16,
        },

        '& > li > a': {
            color: 'rgba(0,0,0,0.3)',

        },

        '& > li > a.active': {
            color: 'rgba(0,0,0,1)',
            textDecoration: 'underline',
            fontWeight: 500
        }
    },

})

const ProductMenu = () => {
    const classes = useStyles()
    const { url } = useRouteMatch();


    return (
        <Box component="ul" className={classes.root}>
            <li>
                <Link component={NavLink} exact to={url}>
                    Description
                </Link>
            </li>
            <li>
                <Link component={NavLink} exact to={`${url}/additional`}>
                    Additional Information
                </Link>
            </li>
            <li>
                <Link component={NavLink} exact to={`${url}/reviews`}>
                    Review
                </Link>
            </li>
        </Box>
    );
};

export default ProductMenu;