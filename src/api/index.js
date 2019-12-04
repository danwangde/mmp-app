import ajax from './ajax'
const BASE_URL = 'http://47.92.137.78:5000'
// const BASE_URL = '/api'

// 1.获取桥梁信息
export const reqBridge = (userid, usertype) => ajax(BASE_URL + '/bridgeinfo/select', {userid, usertype})

// 2.获取人行通道信息
export const reqPassage = (userid, usertype) => ajax(BASE_URL + '/bridgeinfo/select_facility', {userid, usertype})

// 2.登录接口
export const reqLogin = (code) => ajax(BASE_URL + '/loginCheck/app_login', {code})

// 3.病害查询
export const reqDisease = (uid) => ajax(BASE_URL + '/curing/select_diseases', {uid})

// 4.材质查询
export const reqMaterial = (id) => ajax(BASE_URL + '/curing/select_material', {id})

// 5.查任务
export const reqPlan = (branch_id,bridge_id, facilities_type) => ajax(BASE_URL + '/curing/select_app_plan', {branch_id,bridge_id, facilities_type})

// 6.新增查询计划
export const reqCuring = (BridgeName, A_Signin_date, B_Signin_date, branch, Inspecting_Officer, Bridge_brand, Limit_height_load,  Roadway, Sidewalk, expansion_joint, Railing, Drainage_facilities, Bridge_connection, Superstructure, Bearing, Substructure, Whether_construction, other_disease, Inspection_date, weather, plan, Other, Reporting_time, facilities_type) => ajax(BASE_URL + '/curing/insert_into_app', {BridgeName, A_Signin_date, B_Signin_date, branch, Inspecting_Officer, Bridge_brand, Limit_height_load,  Roadway, Sidewalk, expansion_joint, Railing, Drainage_facilities, Bridge_connection, Superstructure, Bearing, Substructure, Whether_construction, other_disease, Inspection_date, weather, plan, Other, Reporting_time, facilities_type}, 'POST')


// 7.查上报当前需要上报流程
export const reqMaintain = (uid) => ajax(BASE_URL + '/curing/select_maintain', {uid})

// 8.病害添加
export const reqAddDis = (id, disease_name, Reported_quantity, Audit_quantity, MaterialID, longitude, latitude, disPosition, structure) => ajax(BASE_URL + '/curing/add_disease_app', {id, disease_name, Reported_quantity, Audit_quantity, MaterialID, longitude, latitude, disPosition, structure}, 'POST')

// 9.病害上报
export const reqDisReport = (Reporting_time, Other, id, branch_id) => ajax(BASE_URL + '/curing/insert_disease', {Reporting_time, Other, id, branch_id}, 'POST')

// 10.添加移动轨迹

export const reqTrajectory = (longitude,latitude,time,facilitiesid,facilities_type) => ajax(BASE_URL + '/curing/insert_trajectory', {longitude,latitude,time,facilitiesid,facilities_type}, 'POST')

// 11.查养护流程工单上报阶段信息

export const reqOrder = (uid) => ajax(BASE_URL + '/curing/select_maintain_app', {uid})

// 12.新增需要传给前端的数据(病害名，病害id，板厚，上报数量，材质)

export const reqDisInfo = (id) => ajax(BASE_URL + '/curing/select_data', {id})

// 13.新增需要传给前端的数据(养护项目，单价，项目特征，单位)

export const reqDisInfoNew = (dis_id) => ajax(BASE_URL + '/curing/select_date_1', {dis_id})

// 14.新增工程量清单

export const reqList = (data) => ajax(BASE_URL + '/curing/insert_list', {data}, 'POST')

// 15.查询工程量清单

export const reqQuantity = (id) => ajax(BASE_URL + '/curing/select_list', {id})

// 16.竣工申报

export const reqFinish = (Completion_time, Cost, Remarks, submitter, Reporting_time, Odd_Numbers) => ajax(BASE_URL + '/curing/insert_finished', {Completion_time, Cost, Remarks, submitter, Reporting_time, Odd_Numbers}, 'POST')

//17.查当前单号下的病害  select_photo

export const reqOddDis = (id) => ajax(BASE_URL + '/curing/select_disease', {id})

//18.查当前单号下的图片  select_photo

export const reqPhoto = (baseinfo_id, photo_type) => ajax(BASE_URL + '/curing/select_photo', {baseinfo_id, photo_type})

//19.查当前单号下的图片  select_photo

export const selList = (id) => ajax(BASE_URL + '/curing/select_list', {id})

//20.查完成时限和处置要求

export const selRequire = (Odd_Numbers) => ajax(BASE_URL + '/curing/select_require', {Odd_Numbers})


//21.查单项病害详情
export const getItem = (id) => ajax(BASE_URL + '/curing/select_item', {id})

// select_pid

//22.查最大id
export const getMaxId = () => ajax(BASE_URL + '/curing/select_pid')

//22.查图片
export const getImages = ( baseinfo_id, photo_type, project_id) => ajax(BASE_URL + '/curing/select_photo_app', { baseinfo_id, photo_type, project_id})
