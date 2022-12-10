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

import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'

import { Link } from 'react-router-dom'

export default function ClassItem(props) {
  let { data, subjectName } = props
  // console.log('check from class item: ', data)
  return (
    <Link to={`detail-class-${data?.class_id}`} className="no-underline w-1/4 flex justify-center mb-5">
      <Card
        sx={{
          width: '95%',
          borderRadius: '10px',
          background: `${data?.bg_color}`,
        }}
      >
        {/* , background: `${data?.background_color}`  */}
        <CardActionArea>
          <CardMedia component="img" height="140" image={data?.image} alt="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div" className="text-center text-white">
              {subjectName}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              {data?.description}
            </Typography> */}
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}
