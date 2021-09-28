import React from "react";
import ReactHtmlParser from "react-html-parser";
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
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.info.light,
    },
    cardActionsRoot: {
      justifyContent: "center",
    },
  }));

  const classes = useStyles();
  let boxLabelProps = {
    color: "primary.main",
  };
  let boxItemProps = {
    component: "h3",
    color: "primary.main",
  };

  return item !== itemsToRender
    ? null
    : arr.map((item, index) => {
        return (
          <Grid item xs={6} key={index}>
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
                  <Grid>
                    <Box {...boxLabelProps}>Name: </Box>
                    <Box {...boxItemProps}>{item.name}</Box>
                  </Grid>
                  <Grid>
                    <Box {...boxLabelProps}>Species: </Box>
                    <Box {...boxItemProps} fontStyle="italic">
                      {item.species}
                    </Box>
                  </Grid>
                  <Grid>
                    <Box {...boxLabelProps}>Location: </Box>
                    <Box {...boxItemProps}>{item.city}</Box>
                  </Grid>
                  <Grid>
                    <Box {...boxLabelProps}>Country: </Box>
                    <Box {...boxItemProps}>{item.country}</Box>
                  </Grid>
                  <Grid>
                    <Box {...boxLabelProps}>Continent: </Box>
                    <Box {...boxItemProps}>{item.continent}</Box>
                  </Grid>
                  <Grid>
                    <Box {...boxLabelProps}>Date: </Box>
                    <Box {...boxItemProps}>{item.date}</Box>
                  </Grid>
                  <Grid>
                    <Box {...boxLabelProps}>Image Credit: </Box>
                    <Box {...boxItemProps}>
                      {ReactHtmlParser(item.linksToPhotos[1])}
                    </Box>
                  </Grid>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.cardActionsRoot}>
                <Button
                  size="small"
                  color="primary"
                  href={item.linkToInfo}
                  target="_blank"
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      });
};
