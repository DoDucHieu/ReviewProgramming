import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'
import { flexbox, width } from '@mui/system'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'

const bull = <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}></Box>

export default function OutstandingClass(props) {
  let { data, id } = props
  return (
    <Box
      sx={{
        width: '22%',
        height: '200px',
        m: '16px',
        display: 'flex',
        alignItems: 'center',
        background: `${data?.bg_color}`,
        borderRadius: '10px',
        fontFamily: 'Roboto Slab',
        orientation: 'horizontal',
      }}
    >
      <Link to={`classes/detail-class-${id}`} className="no-underline flex flex-col items-center ">
        <img src={`${data?.image}`} alt="" className=" w-10/12 h-10/12 bg-opacity-50" />
        <Typography variant="h6" component="div" className=" text-white">
          {data?.subject?.subject_name}
        </Typography>
      </Link>
    </Box>
  )
}
