import { useContext, useEffect, useState } from "react";
import { getAllUsers } from "../api/admin";
import { UserContext } from "../contexts/UserContext";
import UserCard from "../components/cards/UserCard";
import ComplexSkeleton from "../components/skeletons/ComplexSkeleton";
import NextGenHeader from "../components/headers/NextGenHeader";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [q, setQ] = useState("");
    const [searchValue, setSearchValue] = useState("");

    const { userId } = useContext(UserContext);

    const [loadingUsers, setLoadingUsers] = useState(true);

    function handlePagination(direction) {
        if (
            (direction === 1 && currentPage === totalPages) ||
            (direction === -1 && currentPage === 1)
        )
            return;
        setCurrentPage((page) => page + direction);
    }

    useEffect(() => {
        setLoadingUsers(true);
        getAllUsers(currentPage - 1, q, userId).then(
            ({ status, data, count }) => {
                if (status === "success") {
                    setUsers(data);
                    setLoadingUsers(false);
                    setTotalPages(Math.ceil(count / 12));
                }
            }
        );
    }, [userId, q]);

    return (
        <div>
            <NextGenHeader />
            <div className="flex flex-col max-w-[1200px] m-auto gap-8 p-5">
                <div className="flex flex-row gap-3">
                    <input
                        className="input input-bordered flex-1"
                        placeholder="Search by email..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button
                        className="btn btn-warning"
                        onClick={() => setQ(searchValue)}
                    >
                        Search
                    </button>
                </div>
                <div className="my-5 flex w-full justify-center">
                    <div className="join">
                        <button
                            className="join-item btn btn-neutral"
                            onClick={() => handlePagination(-1)}
                        >
                            «
                        </button>
                        <button
                            className="join-item btn btn-neutral"
                            onClick={() => handlePagination(0)}
                        >
                            Page {currentPage}
                        </button>
                        <button
                            className="join-item btn btn-neutral"
                            onClick={() => handlePagination(1)}
                        >
                            »
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5">
                    {loadingUsers
                        ? Array(12)
                              .fill(0)
                              .map((_, index) => (
                                  <ComplexSkeleton key={index} />
                              ))
                        : users.map((item) => (
                              <UserCard
                                  key={item.id}
                                  role={item.role}
                                  email={item.email}
                                  userId={item.user_id}
                                  id={item.id}
                                  createAt={item.created_at}
                              />
                          ))}
                </div>
                <div className="my-5 flex w-full justify-center">
                    <div className="join">
                        <button
                            className="join-item btn btn-neutral"
                            onClick={() => handlePagination(-1)}
                        >
                            «
                        </button>
                        <button
                            className="join-item btn btn-neutral"
                            onClick={() => handlePagination(0)}
                        >
                            Page {currentPage}
                        </button>
                        <button
                            className="join-item btn btn-neutral"
                            onClick={() => handlePagination(1)}
                        >
                            »
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
