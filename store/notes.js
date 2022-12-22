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
