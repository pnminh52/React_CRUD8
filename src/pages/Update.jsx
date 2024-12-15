import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Update = ({ products, onHandleUpdate }) => {
  const { id } = useParams();
  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  const [inputValue, setInputValue] = useState({});
  const crtPrd = products.find((item) => item.id == id);
  const onUpdate = (e) => {
    e.preventDefault();
    const updateData = { ...crtPrd, ...inputValue };
    onHandleUpdate(updateData);
  };
  return (
    <>
      <div>
        <form action="" onSubmit={onUpdate}>
          <input
            type="text"
            name="name"
            placeholder="name"
            onInput={onHandleChange}
            defaultValue={crtPrd?.name}
          />

          <input
            type="number"
            name="price"
            placeholder="price"
            onInput={onHandleChange}
            defaultValue={crtPrd?.price}
          />

          <input
            type="text"
            name="description"
            placeholder="description"
            onInput={onHandleChange}
            defaultValue={crtPrd?.description}
          />

          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default Update;
