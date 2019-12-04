/*
直接更新state的多个方法的对象
 */
import {
  RECEIVE_BRIDGE,
  RECEIVE_USERID,
  RECEIVE_USERTYPE,
  RECEIVE_MAP,
  RECEIVE_SEL,
  RECEIVE_IMG,
  RECEIVE_BRANCH,
  RECEIVE_CODE,
  RECEIVE_MAINTAIN,
  RECEIVE_PASSAGE,
  RECEIVE_TYPE,
  RECEIVE_USER,
  RECEIVE_IMAGE,
  RECEIVE_IMAGES,
  RECEIVE_SHOW1,
  RECEIVE_SHOW2,
  RECEIVE_SHOW_TRUE,
  RECEIVE_SHOW_IMAGE_DIS,
  RECEIVE_PARENT
} from './mutation-types'

export default {
  [RECEIVE_BRIDGE] (state, {bridge}) {
    state.bridge = bridge
  },
  [RECEIVE_PASSAGE] (state, {bridge}) {
    state.bridge = bridge
  },
  [RECEIVE_USERID] (state, {userid}) {
    state.userid = userid
  },
  [RECEIVE_BRANCH] (state, {branch_id}) {
    state.branch_id = branch_id
  },
  [RECEIVE_USERTYPE] (state, {usertype}) {
    state.usertype = usertype
  },
  [RECEIVE_MAP] (state, {map}) {
    state.map = map
  },
  [RECEIVE_SEL] (state, {selectBridge}) {
    state.selectBridge = selectBridge
  },
  [RECEIVE_IMG] (state, {photos}) {
    state.photos = photos
  },
  [RECEIVE_CODE] (state, {code}) {
    state.code = code
  },
  [RECEIVE_MAINTAIN] (state, {baseinfo_id}) {
    state.baseinfo_id = baseinfo_id
  },
  [RECEIVE_TYPE] (state, {facilities_type}) {
    state.facilities_type = facilities_type
  },
  [RECEIVE_USER] (state, {user}) {
    state.user = user
  }, // RECEIVE_IMAGE
  [RECEIVE_IMAGE] (state, {path}) {
    state.imageArr.push(path)
  },
  [RECEIVE_IMAGES] (state, {path}) {
    state.imageArr = path
  },
  [RECEIVE_SHOW1] (state, {path}) {
    state.isShow1 = path
  },
  [RECEIVE_SHOW2] (state, {path}) {
    state.isShow2 = path
  },
  [RECEIVE_SHOW_TRUE] (state, {path}) {
    state.isShow1 = state.isShow2 = path
  },
  [RECEIVE_SHOW_IMAGE_DIS] (state, {path}) {
    state.imageDis = path
  },
  [RECEIVE_PARENT] (state, {path}) {
    state.parentId = path
  },
}
