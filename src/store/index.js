import { configureStore } from '@reduxjs/toolkit';
import isLoadingReducer from '@/store/slice/isLoadingSlice'
import pagesReducer from '@/store/slice/pagesSlice';
import GenSettingReducer from '@/store/slice/GenSettingSlice';

// persistStore 为redux-persist状态管理仓库；
// persistReducer 为切片管理；
import {
  persistStore,
  persistReducer,
  createTransform,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// 将要存储的数据通过storage存储在本地localstorage中；
import storage from 'redux-persist/lib/storage';
// autoMergeLevel2 会将默认的/新的 State 值合并，默认是用新状态代替旧状态
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

/* 操蛋的是，Redux-persist 在把 State 持久化的时候，
 * 会使用 JSON.stringify() 把 State 对象转成 JSON 格式，
 * 因此，它不支持 js 的很多数据结构，其中就有我用到的 Map
 * 所以说要自己基于转换
 */
const SetTransform = createTransform(
  // 在 State(这里是Map) 被序列化和持久化的时候把它转换成数组
  (inboundState, key) => {
    // 把集合转成二维数组，形如[[key, val],[key, val]]
    console.log(inboundState);
    return { ...inboundState, contents: [...inboundState.contents] };
  },
  // 转换被持久化的 State
  (outboundState, key) => {
    // 转回去
    return { ...outboundState, contents: new Map(outboundState.contents) };
  },
  // 定义要转换的 reducer
  { whitelist: ['collections'] }
);

// 配置要存储的Slice；
const persistConfig = {
  key: 'general',
  version: 1,
  storage,
  transforms: [SetTransform],
  // 设置状态调和器
  stateReconciler: autoMergeLevel2
};
const persistedSettings = persistReducer(persistConfig, GenSettingReducer);
const persistedPages = persistReducer(persistConfig, pagesReducer);

export const store = configureStore({
  reducer: {
    pages: persistedPages,
    settings: persistedSettings,
    isLoading: isLoadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

export const persistor = persistStore(store);
// 需要用 persistStore 包裹 store，两者均导出