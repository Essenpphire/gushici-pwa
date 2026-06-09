import * as React from "react";
import Stack from "@mui/material/Stack";
import ItemCard from "@/components/ItemCard";
import ColletionDetail from "@/components/FullScreenDialog";
//import ErrorAlert from "@/components/ErrorAlert"

import { useSelector } from "react-redux";
import { SelectColletions } from "@/store/slice/pagesSlice";

export default function CollectionsMe() {
  const [open, setOpen] = React.useState(false);
  const handleCollectionDetail = (e) => {
    setOpen(e);
  };
  const collections = [];
  useSelector(SelectColletions).forEach((value, key, map) =>
    collections.push(
      <ItemCard
        key={key}
        displayItem={value}
        setParentState={handleCollectionDetail}
      />
    )
  );

  return (
    <Stack sx={{ width: "calc(100vw - 48px)" }} spacing={1}>
      {/*<ErrorAlert open={true} />*/}
      {collections.length != 0 ? (
        collections
      ) : (
        <span style={{ textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>
          空空如也……
          <br />
          去收藏你喜欢的诗词、古文吧！
        </span>
      )}
      <ColletionDetail
        open={open}
        type="remove"
        setParentState={handleCollectionDetail}
      />
    </Stack>
  );
}
