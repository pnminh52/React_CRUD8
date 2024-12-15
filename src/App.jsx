import React, { useState, useEffect } from "react";
import Add from "./pages/Add";
import Update from "./pages/Update";
import List from "./pages/List";
import { productSchema } from "./schema/product";
import { useNavigate, Route, Routes } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState({});
  const [errorList, setErrorList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3000/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  const onHandleRemove = (id) => {
    if (confirm("xoa?") == true) {
      fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      const newProductList = products.filter((item) => {
        return item.id != id;
      });
      setProducts(newProductList);
    }
  };
  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    const { error } = productSchema.validate(inputValue, { abortEarly: false });
    if (error) {
      setErrorList(error.details);
      return;
    }
    fetch(`http://localhost:3000/products/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(inputValue),
    })
      .then((response) => response.json())
      .then((data) => setProducts([...products, data]))
      .then(() => navigate("/products/list"));
  };
  const onHandleUpdate = (product) => {
    fetch(`http://localhost:3000/products/${product.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(products.map((item) => (item.id == data.id ? data : item)));
        alert("done");
      })
      .then(() => navigate("/products/list"));
  };
  return (
    <>
      <Routes>
        <Route
          path="/products/list"
          element={<List products={products} onHandleRemove={onHandleRemove} />}
        />
        <Route
          path="/products/add"
          element={
            <Add
              errors={errorList}
              onHandleChange={onHandleChange}
              onHandleSubmit={onHandleSubmit}
            />
          }
        />
        <Route
          path="/products/:id/update"
          element={
            <Update products={products} onHandleUpdate={onHandleUpdate} />
          }
        />
      </Routes>
    </>
  );
};

export default App;
