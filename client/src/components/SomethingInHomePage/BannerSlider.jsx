import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'
import { flexbox, margin, width } from '@mui/system'
import Stack from '@mui/material/Stack'

import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'

import { Link } from 'react-router-dom'
import useClassQuery from '../../hooks/reactQueryHooks/useClassQuery'

import Carousel from 'react-elastic-carousel'

let BannerItem = (props) => {
  let { description, subjectName, id, image, bgColor } = props
  return (
    <Box
      sx={{
        width: '100%',
        height: 300,
        display: 'flex',
        alignItems: 'center',
        background: `${bgColor}`,
        borderRadius: '10px',
        fontFamily: 'Roboto Slab',
        orientation: 'horizontal',
        justifyContent: 'center',
      }}
    >
      <CardContent sx={{ color: 'white' }}>
        <Typography gutterBottom variant="h4" component="div">
          {subjectName}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {description}
        </Typography>
      </CardContent>

      <img src={`${image}`} alt="" className=" w-2/5 h-full bg-opacity-50" />
    </Box>
  )
}

export default function BannerSlider() {
  const carouselRef = React.useRef(null)

  //react query
  const { data } = useClassQuery.getAll({ sort_by: 'current_number_students', order: 'desc', limit: 10 })
  let dataClass = data?.data

  const onNextStart = (currentItem, nextItem) => {
    if (currentItem.index === nextItem.index) {
      carouselRef.current.goTo(0)
    }
  }

  return (
    <>
      <Carousel
        itemsToShow={1}
        disableArrowsOnEnd={false}
        disableArrowsOnStart={false}
        enableAutoPlay
        ref={carouselRef}
        onNextStart={onNextStart}
      >
        {dataClass &&
          dataClass.map((item, index) => {
            return (
              <BannerItem
                description={item?.description}
                id={item?.class_id}
                subjectName={item?.subject?.subject_name}
                bgColor={item?.bg_color}
                image={item?.image}
              />
            )
          })}
      </Carousel>
    </>
  )
}
