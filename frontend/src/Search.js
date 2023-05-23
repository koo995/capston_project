import React, { useState, createContext } from "react";
import { Input } from "antd";

export const QueryContext = createContext();

const { Search } = Input;

function SearchBar({ onSearch }) {
  return (
    <Search
      placeholder="검색어를 입력해 주세요"
      style={{ width: 300 }}
      size="middle"
      onSearch={onSearch}
    />
  );
}

export const QueryProvider = ({ children }) => {
  const [queryList, setQueryList] = useState([]);

  const handleSearch = (e) => {
    const newQueryList = e.split(" ");
    setQueryList(newQueryList);
    console.log("queryList: ", newQueryList);
  };

  return (
    <QueryContext.Provider value={{ queryList, handleSearch }}>
      {children}
    </QueryContext.Provider>
  );
};

export default SearchBar;
