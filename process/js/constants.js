const sortBy = {
  petName: 'petName',
  aptDate: 'aptDate',
  ownerName: 'ownerName'
};

const sortDir = {
  asc: 'asc',
  desc: 'desc'
};

const sortByOptions = [
  { value: sortBy.petName, text: 'Pet Name' },
  { value: sortBy.aptDate, text: 'Date' },
  { value: sortBy.ownerName, text: 'Owner' }
];

const sortDirOptions = [
  { value: sortDir.asc, text: 'Asc' },
  { value: sortDir.desc, text: 'Desc' }
];

module.exports = {
  sortBy,
  sortDir,
  sortByOptions,
  sortDirOptions
};
