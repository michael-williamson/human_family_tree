import React from "react";
// import ReactHtmlParser from "react-html-parser";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Box,
  Grid,
} from "@material-ui/core";

export const GalleryItemComponent = (props) => {
  const { item, itemsToRender, arr } = props;
  const useStyles = makeStyles({
    root: {
      backgroundColor: "black",
    },
  });

  const classes = useStyles();
  let boxProps = {
    component: "h3",
    color: "primary.main",
  };

  return item !== itemsToRender
    ? null
    : arr.map((item, index) => {
        return (
          <Grid item key={index}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={item.name}
                  height="140"
                  image={item.linksToPhotos[0]}
                  title={item.name}
                />
                <CardContent>
                  <Box {...boxProps}>{item.name}</Box>
                  <Box {...boxProps}>{item.city}</Box>
                  <Box {...boxProps}>{item.country}</Box>
                  <Box {...boxProps}>{item.continent}</Box>
                  <Box {...boxProps}>{item.date}</Box>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      });
};
