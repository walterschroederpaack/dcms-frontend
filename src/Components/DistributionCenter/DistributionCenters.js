import React from 'react';
import DistributionCenter from './DistributionCenter'

const DistributionCenters = (props) => {
  const {title, header } = props;
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  const tableHeader = () => {
    return header.map((field, idx) => {
      return (
        <th key={idx}>
          <button
            type="button"
            onClick={() => requestSort(field)}
            className={getClassNamesFor(field)}
          >
            {field}
          </button>
        </th>
      )
    })
  }

  const tableData = () => {
    return items.map((distributioncenter, idx) => {
      return (
        <DistributionCenter
          key={idx}
          distributioncenter={distributioncenter}
        />
      )
    })
  }

  return (
    <table>
      <caption>{title}</caption>
      <thead>
        <tr>
          {tableHeader()}
          {/* TODO Fix sorting by header field, add default sorting */}
        </tr>
      </thead>
      <tbody>
        {tableData()}
      </tbody>
    </table>
  );
};

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

export default DistributionCenters;