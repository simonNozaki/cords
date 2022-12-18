export const state = () => (
  {
    list: []
  }
);

export const mutations = {
  add(state, note) {
    state.list.push(note);
  }
};
