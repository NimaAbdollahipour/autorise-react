import { useEffect, useState } from "react";
import { CheckIcon, DeleteIcon, PenIcon, TrashIcon, XIcon } from "lucide-react";
import { updateUser } from "../../api/admin";

export default function UserCard({ email, id, role, userId, createAt }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(role);
  const [beforeChange, setBeforeChange] = useState();

  function handleChange() {
    updateUser(id, value).then(({ status }) => {
      console.log(status);
    });
  }

  const roles = ["buyer", "seller", "admin"];
  return (
    <div className="card bg-base-100 w-full shadow-xl p-8 hover:shadow-2xl transition">
      <div className="flex flex-row justify-between items-center py-2">
        {edit ? (
          <label className="form-control w-full max-w-xs">
            <select
              className="select select-bordered"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <option value={1}>Buyer</option>
              <option value={2}>Seller</option>
              <option value={3}>Admin</option>
            </select>
          </label>
        ) : (
          <span>
            <strong>Role:</strong> {roles[value - 1]}
          </span>
        )}
        <div className="flex flex-row">
          {edit ? (
            <>
              <button
                className="btn btn-link"
                onClick={() => {
                  setEdit(false);
                  setValue(beforeChange);
                }}
              >
                <XIcon color="black" />
              </button>
              <button
                className="btn btn-link"
                onClick={() => {
                  setEdit(false);
                  handleChange();
                }}
              >
                <CheckIcon color="green" />
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-link"
                onClick={() => {
                  setEdit(true);
                  setBeforeChange(value);
                }}
              >
                <PenIcon color="black" />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-gray-300 gap-3 text-left py-3">
        <span>
          <strong>Email: </strong>
          {email}
        </span>
        <span>
          <strong>Joined On: </strong>
          {createAt}
        </span>
        <span>
          <strong>Profile ID: </strong>
          {id}
        </span>
        <span>
          <strong>User ID: </strong>
          {userId}
        </span>
      </div>
    </div>
  );
}
