import when from 'when';

export default (data) => {
  return when.promise((resolve) => {
    let maxPage = data.last_page;
    let examines = data.data.map((item) => {
      item.time = `${item.date_began_at}~${item.date_ended_at}`;
      return item;
    });
    resolve({examines, maxPage});
  });
};
