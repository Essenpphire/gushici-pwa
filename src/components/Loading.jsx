import * as React from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
//import Divider from '@mui/material/Divider';

let view_items = [...Array(10)].map((each, index) => index + 1);

export function Skeletons() {
  return (
    <Stack sx={{ width: '18rem' }} spacing={1}>
      {view_items.map((number) => (
        <React.Fragment>
            <Skeleton variant="rounded" height={'5rem'} key={number} animation="wave" />
            {/*<Divider />*/}
        </React.Fragment>
      ))}
    </Stack>
  );
}

export class LoadingText extends React.Component {
  constructor(props) {
    super(props); // 继承 props
    this.state = { content: "加载中" };
    this.content = this.props.content ? this.props.content : "加载中";
  }

  // 开始生命周期
  componentDidMount() {
    let sec = 0,
      ch = [".", "..", "..."];
    this.timer = setInterval(() => {
      this.setState({ content: this.content + ch[sec] });
      sec = (sec + 1) % 3;
    }, 1000);
  }

  // 结束生命周期
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <span className="al-center app-view-loading">{this.state.content}</span>
    );
  }
}
