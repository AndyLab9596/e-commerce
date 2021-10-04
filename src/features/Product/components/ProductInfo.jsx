import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import React, { Fragment } from 'react';
import FORM_MONEY from 'constants/formMoney';


const useStyles = makeStyles(theme => ({
    root: {

    },
    description: {

    },
    priceBox: {
        backgroundColor: "rgba(0,0,0,0.3)",
        padding: 8
    },
    salePrice: {
        fontSize: '22px',
        marginRight: '8px',
        fontWeight: 'bold',
    },
    originalPrice: {
        marginRight: '8px',
        textDecoration: 'line-through'
    },
    promotionPercent: {

    }
}))

const ProductInfo = ({ product = {} }) => {
    const classes = useStyles();
    const { id, category, salePrice, originalPrice, promotionPercent, shortDescription, name } = product;
    return (
        <Box className={classes.root}>
            <Typography component="h1" variant="h4" >{name}</Typography>
            <Typography variant="body2" className={classes.description} sx={{ margin: 2 }}>{shortDescription}</Typography>
            <Box className={classes.priceBox}>
                <Box component="span" className={classes.salePrice}>{FORM_MONEY(salePrice)}</Box>
                {promotionPercent > 0 && (
                    <Fragment>
                        <Box component="span" className={classes.originalPrice}>{FORM_MONEY(originalPrice)}</Box>
                        <Box component="span" className={classes.promotionPercent}>{promotionPercent}%</Box>
                    </Fragment>
                )}

            </Box>
        </Box>
    );
};

export default ProductInfo;