import { createStore } from 'redux'
import likeRestaurante from './Reducers/LikeReducer'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

export default createStore(persistReducer(rootPersistConfig, likeRestaurante))

