import * as React from "react";
import Stack from "@mui/material/Stack";

import ItemCard from "@/components/ItemCard";
import { axiosInstance } from "@/api/instance";
import { LoadingText, Skeletons } from "@/components/Loading";
//import ErrorAlert from "@/components/ErrorAlert";
import PoetDetail from "@/components/FullScreenDialog";

import { useSelector, useDispatch } from "react-redux";
import { modifyPoets, SelectPoets } from "@/store/slice/pagesSlice";
import { modifyLoading, SelectIsLoading } from "@/store/slice/isLoadingSlice";
import { SelectSettings } from "@/store/slice/GenSettingSlice";

function Poets(props) {
  const [isError, setError] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const isLoading = useSelector(SelectIsLoading);
  const poets = useSelector(SelectPoets);
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
      /**
       * @example
       * // 若成功 return [{author: "李白", dynasty: "唐", id: 1, name: "静夜思", passage: "床前明月光，疑是地上霜。 举头望明月，低头思故乡",},{...}];
       * @returns {Array}
      */
      const res = await axiosInstance.post(
        //"http://192.168.193.252:8000/api/poet/"
        settings.req_url + val
      );
      if (res) {
        dispatch(modifyLoading(false));
        dispatch(modifyPoets(res.data));
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
    console.log(`页面：Poets 启动成功！`);
    if(isLoading) window.handleRefresh('poet/tang');
  }, []);

  return (
    <React.Fragment>
      {/*<ErrorAlert open={isError} />*/}
      {isLoading ? (
        LoadingScreen
      ) : (
        <Stack sx={{ width: "100%" }} spacing={1}>
          {poets.map((each) => (
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

export default Poets;