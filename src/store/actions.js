/*
通过mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_BRIDGE,
  RECEIVE_USERTYPE,
  RECEIVE_USERID,
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
import {
  reqBridge,reqPassage
} from '../api'

export default {

  // 异步获取桥梁列表
  async getBridge ({commit, state}) {
    // 发送异步ajax请求
    const {userid, usertype} = state
    const bridge = await reqBridge(userid, usertype)
    // 提交一个mutation
    commit(RECEIVE_BRIDGE, {bridge})
  },
  async getPassage ({commit, state}) {
    // 发送异步ajax请求
    const {userid, usertype} = state
    const bridge = await reqPassage(userid, usertype)
    // 提交一个mutation
    commit(RECEIVE_PASSAGE, {bridge})
  },
  getId ({commit}, userid) {
    commit(RECEIVE_USERID, {userid})
  },
  getBranch ({commit}, branch_id) {
    commit(RECEIVE_BRANCH, {branch_id})
  },
  getType ({commit}, usertype) {
    commit(RECEIVE_USERTYPE, {usertype})
  },
  getMap ({commit}, map) {
    commit(RECEIVE_MAP, {map})
  },
  getSelBri ({commit}, selectBridge) {
    commit(RECEIVE_SEL, {selectBridge})
  },
  getImage ({commit}, photos) {
    commit(RECEIVE_IMG, {photos})
  },
  getCode ({commit}, code) {
    commit(RECEIVE_CODE, {code})
  },
  getMaintain ({commit}, baseinfo_id) {
    commit(RECEIVE_MAINTAIN, {baseinfo_id})
  },
  getFacility ({commit}, facilities_type) {
    commit(RECEIVE_TYPE, {facilities_type})
  },
  getUser ({commit}, user) {
    commit(RECEIVE_USER, {user})
  },
  getImages ({commit}, path) {
    commit(RECEIVE_IMAGE, {path})
  },
  images ({commit}, path) {
    commit(RECEIVE_IMAGES, {path})
  },
  noShow1 ({commit}, path) {
    commit(RECEIVE_SHOW1, {path})
  },
  noShow2 ({commit}, path) {
    commit(RECEIVE_SHOW2, {path})
  },
  trueShow ({commit}, path) {
    commit(RECEIVE_SHOW_TRUE, {path})
  },
  getImageDis ({commit}, path) {
    commit(RECEIVE_SHOW_IMAGE_DIS, {path})
  },
  getParent ({commit}, path) {
    commit(RECEIVE_PARENT, {path})
  }
}
