import { createSlice } from "@reduxjs/toolkit";

const GenSettingSlice = createSlice({
  name: "settings",
  initialState: {
    //"req_url": "http://172.19.11.59:8000/api/poet/",
    "req_url": "http://127.0.0.1:8888/",
    "switches": ["font"],
  },
  reducers: {
    /**
     * @param {object} action
     * 格式: {target1(设置的对象): String(对应值), target2...}
     * e.g. {"req_url": "http://naidesu.com"} 
     */
    applyGenSettings: (state, action) => {
      const patch = action.payload;
      for(let target in patch) {
        if(patch[target]) state[target] = patch[target];
      }
    },
  },
});

export const { applyGenSettings } = GenSettingSlice.actions;
export const SelectSettings = (state) => state.settings;
export default GenSettingSlice.reducer;
