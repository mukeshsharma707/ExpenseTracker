import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ActionAreaCard({ title, balance, color, butname, buttonColor,handleClick }) {
  return (
    <Card sx={{ minWidth: 245, minHeight: 180 ,background:'#aeadadff'}}>
      <CardActionArea>
        <CardContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            style={{
              textAlign: 'center',
              padding: '10px',
              color: color,
            }}
          >
            <span style={{color:'white'}}>{title}:</span> ₹{balance}
            
          </Typography>

          <button
            style={{
              background: buttonColor,
              color: 'white',
              borderRadius: '5px',
              padding: '6px 12px',
              border: 'none',
              cursor: 'pointer',
              
            }}
            onClick={handleClick}
          >
            {butname}
          </button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
