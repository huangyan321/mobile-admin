
import {
  Message
} from 'element-ui'
import {
  getToken,
  setToken,
  removeToken,
  getRoleId,
  setRoleId
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    roleId: getRoleId(),
    name: '',
    avatar: '',
    classes: [],
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.roleId = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_CLASSES: (state, classes) => {
    state.classes = classes.split(';')
  },
  SET_CLASSES1: (state, classes) => {
    state.classes = classes
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
