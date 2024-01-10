export const convertDbRowsToObjects = (metaData, rows) => {
  return rows.map((row) => {
    const rowObject = {};
    metaData.forEach((column, index) => {
      const columnName = column.name.toLowerCase();
      rowObject[columnName] = row[index];
    });
    return rowObject;
  });
};
