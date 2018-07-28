import * as types from './mutation-types'

const mutations = {
[types.SET_RECOMMEND](state, recommend) {
    state.recommend = recommend
    },
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_RANK](state, rank) {
    state.rank = rank
  },

}

export default mutations