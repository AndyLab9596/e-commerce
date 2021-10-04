import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import React, { useMemo } from 'react';
import { Chip } from '@mui/material';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        margin: '16px 0',
        listStyleType: 'none',

        '& > li': {
            margin: 0,
            padding: 8
        }
    }

})

const FILTER_LIST = [
    {
        id: 1,
        getLabel: () => 'Giao hàng miễn phí',
        // Chỉ active khi isFreeShip: true
        isActive: filters => filters.isFreeShip,
        // giao hàng miễn phí luôn luôn show
        isVisible: () => true,
        isRemovable: false,
        // vì là isRemovable: false => onRemove sẽ ko làm gì hết
        onRemove: () => { },
        // vì nó ko remove đc nên sẽ ấn toggle active và inactive được
        onToggle: filters => {
            const newFilters = { ...filters };
            if (newFilters.isFreeShip) {
                delete newFilters.isFreeShip
            } else {
                newFilters.isFreeShip = true
            }
            return newFilters
        },
    },
    {
        id: 2,
        getLabel: () => 'Có khuyến mãi',
        // visible là hiện lên mà hiện lên là có active 
        isActive: () => true,
        // cú pháp Object.keys(filters).includes('isPromotion) có thể thực hiện khi ta không cần quan tâm đến giá trị đúng sai của key, 
        // chỉ cần biết là keys có tồn tại trong object filters
        // isVisible: (filters) => Object.keys(filters).includes('isPromotion'),
        isVisible: filters => filters.isPromotion,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            delete newFilters.isPromotion;
            return newFilters;
        },
        onToggle: () => { },
    },
    {
        id: 3,
        getLabel: (filters) => `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
        isActive: () => true,
        // nó sẽ visible khi cả 2 salePrice_gte và salePrice_lte có giá trị và lớn hơn 0
        // lấy ra được object keys mới giải quyết vấn đê nó có tồn tại
        // isVisible: (filters) => Object.keys(filters).includes('salePrice_lte') && Object.keys(filters).includes('salePrice_gte'),
        isVisible: (filters) => filters.salePrice_gte > 0 && filters.salePrice_lte > 0,

        isRemovable: true,
        onRemove: filters => {
            const newFilters = { ...filters };
            delete newFilters.salePrice_gte;
            delete newFilters.salePrice_lte;
            return newFilters;
        },
        onToggle: () => { },
    },
    // {
    //     id: 4,
    //     getLabel: filters => 'Danh mục',
    //     isActive: () => true,
    //     isVisible: filters => true,
    //     isRemovable: true,
    //     onRemove: filters => { },
    //     onToggle: filters => { },
    // }
]

const FilterViewer = ({ filters = {}, onChange = null }) => {
    console.log(filters)
    const classes = useStyles();

    const visibleFilters = useMemo(() => {
        return FILTER_LIST.filter(filter => filter.isVisible(filters))
    }, [filters])

    return (
        <Box component="ul" className={classes.root}>
            {visibleFilters.map(filter => (
                <li key={filter.id}>
                    <Chip
                        size="small"
                        label={filter.getLabel(filters)}
                        color={filter.isActive(filters) ? 'primary' : 'default'}
                        //  clickable ko remove được thì mới click đc
                        clickable={!filter.isRemovable}
                        onClick={filter.isRemovable ? null : () => {
                            if (!onChange) return
                            const newFilters = filter.onToggle(filters);
                            onChange(newFilters)
                        }}
                        onDelete={filter.isRemovable ? () => {
                            if (!onChange) return
                            const newFilters = filter.onRemove(filters);
                            onChange(newFilters)
                        } : null}
                    />
                </li>
            ))}
        </Box>
    );
};

export default FilterViewer;