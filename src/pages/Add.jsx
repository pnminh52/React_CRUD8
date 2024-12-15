import React from "react";

const Add = (props) => {
  const { errors, onHandleSubmit, onHandleChange } = props;
  const errDts = errors.map((item) => {
    return { [item.context.label]: item.message };
  });
  const [err1, err2, err3] = errDts;
  return (
    <>
      <div>
        <form action="" onSubmit={onHandleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="name"
            onInput={onHandleChange}
          />
          <span>{err1?.name}</span>
          <input
            type="number"
            name="price"
            placeholder="price"
            onInput={onHandleChange}
          />
          <span>{err2?.price}</span>
          <input
            type="text"
            name="description"
            placeholder="description"
            onInput={onHandleChange}
          />
          <span>{err3?.description}</span>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default Add;
