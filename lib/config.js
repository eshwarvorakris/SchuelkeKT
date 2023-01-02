export const config = {
  paginationComponent: {
    noRowsPerPage: true
  },
  swrConfig: {
    refreshInterval: 0,
    revalidateOnFocus: false
  },
  dataTableStyle: {
    rows: {
      style: {
        color: 'black'
      },
    },
    headCells: {
      style: {
        color: 'rgba(0, 0, 0, 0.555)',
        padding: '15px',
      },
    }
  }
};

