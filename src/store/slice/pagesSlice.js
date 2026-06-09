import { createSlice /*, nanoid*/ } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

enableMapSet();

const pagesSlice = createSlice({
  name: "pages",
  initialState: {
    poets: { isLoading: true, isError: false, contents: [] },
    articles: { isLoading: true, isError: false, contents: [] },
    collections: {
      contents: new Map([
        [
          "0",
          {
            id: 0,
            name: "童祭　～ Innocent Treasures",
            author: "ZUN",
            dynasty: "Booklet内容",
            passage: [
              "梦违，为幻之朝霭的世界的记忆",
              "现世，构筑在徐徐崩塌的沙土之上",
              "空梦，描绘着古老的幽玄世界的历史",
              "白日，映照于逐渐沉没的城市",
              "是幻想吗，亦或空中楼阁吗",
              "直至黎明，这场梦，蝴蝶之梦",
              "梦违，为幻之绯红的房屋的异彩",
              "现世，构筑在毫无血色的石块之上",
              "空梦，描绘着古老的美丽都市的童话",
              "白日，映照于越发肮脏的城市",
            ],
            type: "古诗（大嘘）",
          },
        ],
      ]),
    },
    info: {
      name: "无题",
      dynasty: "未知",
      author: "佚名",
      passage: "内容获取失败！",
    },
  },
  reducers: {
    modifyPoets: (state, action) => {
      state.poets.contents = action.payload;
    },
    modifyArticles: (state, action) => {
      state.articles.contents = action.payload;
    },
    /**
     * @param action.payload {object} 收藏的诗词对象,
     * e.g. {
     *  author: "李白",
     *  dynasty: "唐",
     *  id: 1,
     *  name: "静夜思",
     *  passage: "床前明月光，疑是地上霜。 举头望明月，低头思故乡",
     * }
     */
    addCollection: (state, action) => {
      // const id = nanoid(7);
      state.collections.contents.set(
        action.payload.id.toString(),
        action.payload
      );
    },
    /**
     * @param {String} action
     * 对应收藏的 nanoid
     */
    removeCollection: (state, action) => {
      state.collections.contents.delete(action.payload);
    },
    clearCollection: (state) => {
      state.collections.contents.clear();
    },
    modifyInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const {
  modifyPoets,
  modifyArticles,
  modifyInfo,
  addCollection,
  removeCollection,
  clearCollection
} = pagesSlice.actions;

export const SelectPoets = (state) => state.pages.poets.contents;
export const SelectArticles = (state) => state.pages.articles.contents;
export const SelectInfo = (state) => state.pages.info;
export const SelectColletions = (state) => state.pages.collections.contents;

export default pagesSlice.reducer;
