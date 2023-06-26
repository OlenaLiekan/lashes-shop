import React from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { SearchContext } from '../App';
import { useSelector } from 'react-redux';

const Pagination = ({arrItem, onChangePage }) => {
  const { searchValue } = React.useContext(SearchContext);
  const { categoryId, currentPage } = useSelector((state) => state.filter);
  const [items, setItems] = React.useState([]);
  const totalContent = items.length;
  const contentPerPage = 12;
  const totalPages = totalContent ? Math.ceil(totalContent / contentPerPage) : 1;
  const forcePage = currentPage - 1;


  React.useEffect(() => {
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
    axios
      .get(
          `http://localhost:3001/api/product`,
      )
      .then((res) => {
        setItems(res.data);
    });
    window.scrollTo(0, 0);
  }, [ arrItem, categoryId, searchValue]);

  return (

      <ReactPaginate
        className="product-main__pagination product-pagination"
        breakLabel="..."
        nextLabel={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
          </svg>
        }
        previousLabel={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
            </svg>
        }
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={12}
        pageCount={totalPages}
        forcePage={forcePage}
        pageClassName="product-pagination__page"
      />

  )
}

export default Pagination;