import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const Buttons = ({ selectedCategory, onCategoryChange, categories }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
      <ButtonGroup variant="outlined" aria-label="category filter buttons" color="primary">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'contained' : 'outlined'}
            onClick={() => onCategoryChange(category)}
            sx={{
              textTransform: 'capitalize', // looks cleaner
              fontWeight: selectedCategory === category ? 600 : 500,
              px: 2.5,
              '&.MuiButton-contained': {
                backgroundColor: '#1976d2',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              },
            }}
          >
            {category}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default Buttons;
