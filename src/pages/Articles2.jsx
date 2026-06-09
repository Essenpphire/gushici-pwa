import * as React from "react";
import Stack from "@mui/material/Stack";

import ItemCard from "@/components/ItemCard";
import { axiosInstance } from "@/api/instance";
import { LoadingText, Skeletons } from "@/components/Loading";
import PoetDetail from "@/components/FullScreenDialog";

import { useSelector, useDispatch } from "react-redux";
import { modifyArticles, SelectArticles } from "@/store/slice/pagesSlice";
import { modifyLoading, SelectIsLoading } from "@/store/slice/isLoadingSlice";
import { SelectSettings } from "@/store/slice/GenSettingSlice";

function Articles2(props) {
  const [isError, setError] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const isLoading = useSelector(SelectIsLoading);
  const articles = useSelector(SelectArticles);
  const settings = useSelector(SelectSettings);
  const dispatch = useDispatch();

  const LoadingScreen = (
    <React.Fragment>
      <LoadingText />
      <Skeletons />
    </React.Fragment>
  );

  window.handleRefresh = async (val = '') => {
    try {
      const res = await axiosInstance.get(
        settings.req_url + val
      );
      if (res) {
        dispatch(modifyLoading(false));
        dispatch(modifyArticles(res.data));
        console.log(res);
      }
    } catch (err) {
      console.log('网络错误!\n' + err);
      setError(true);
      console.log('isError: ' + isError);
    }
  };

  const handlePoetDetail = (e) => {
    console.log(`页面打开状态为：${e}`);
    setOpen(e);
  }

  // 开始生命周期
  React.useEffect(() => {
    console.log(`页面：Articles 启动成功！`);
    if(isLoading) handleRefresh();
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        LoadingScreen
      ) : (
        <Stack sx={{ width: "100%" }} spacing={1}>
          {articles.map((each) => (
            <ItemCard
              displayItem={each}
              setParentState={handlePoetDetail}
            />
          ))}
          <PoetDetail open={open} setParentState={handlePoetDetail} />
        </Stack>
      )}
    </React.Fragment>
  );
}

export default Articles2;