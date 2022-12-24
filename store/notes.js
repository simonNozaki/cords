export const state = () => (
  {
    list: []
  }
);

export const mutations = {
  add(state, note) {
    note.tag = note.tag ? note.tag : 'なし'
    note.updatedAt = getDateString(note.updatedAt);
    state.list.push(note);
  },
  update(state, note) {
    const _note = state.list.find((elm) => (elm.id).toString() === note.id);
    _note.title = note.title;
    _note.tag = note.tag;
    _note.body = note.body;
  },
  delete(state, id) {
    state.list = state.list.filter((note) => note.id !== id);
  }
};

function getDateString(date) {
  const y = date.getFullYear();
  const month = date.getMonth();
  const d = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  return `${y}-${month}-${d} ${h}:${m}:${s}`;
}
