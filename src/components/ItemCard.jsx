import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useDispatch } from "react-redux";
import { modifyInfo } from "@/store/slice/pagesSlice";

export default function ItemCard(props) {
  const item = props.displayItem;
  const dispatch = useDispatch();

  const handlePaState = (e) => {
    if (props.setParentState) {
      props.setParentState(true);
      dispatch(modifyInfo(item));
    } else e.preventDefault();
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardActionArea onClick={handlePaState}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={item.name}
          subheader={`「${item.dynasty}」${item.author}`}
        />

        <CardContent>
          <Typography
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
            variant="body2"
            color="text.secondary"
          >
            {item.passage.map
              ? item.passage.map((each) => (
                  <>
                    {each}
                    <br />
                  </>
                ))
              : item.passage}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

//ItemCard.defaultProps = {
//  displayItem: {

//  },
//  setParentState: undefined,

//}
