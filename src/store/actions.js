import types from './mutation-types'

const NO_OP = ({ commit }) => {
  commit(types.NO_OP, null)
}

export default {
  NO_OP
}
