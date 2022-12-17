export const state = () => (
  {
    list: [
      {
        id: 1,
        title: 'タイトル1',
        body: 'まだなにも！',
        label: 'Ruby',
        updatedAt: new Date(),
      }
    ]
  }
);

export const mutations = {
  add(state, note) {
    state.list.push(note);
  }
};
