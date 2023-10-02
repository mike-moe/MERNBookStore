import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/spinner";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (books.length > 0) return;
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create" className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-md">
          <MdOutlineAddBox className="mr-2" />
          Add Book
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="min-w-full text-center text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th className="font-bold">No</th>
              <th className="font-bold">Title</th>
              <th className="font-bold">Author</th>
              <th className="font-bold">Publish Year</th>
              <th className="font-bold">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((item, index) => (
              <tr key={item._id} className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">{item.title}</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">{item.author}</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">{item.publishYear}</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  <div className="flex justify-center gap-x-4">
                    <Link className="text-red-500" to={`/books/details/${item._id}`}>
                      <BsInfoCircle />
                    </Link>
                    <Link className="text-yellow-500" to={`/books/edit/${item._id}`}>
                      <AiOutlineEdit />
                    </Link>
                    <Link className="text-blue-500" to={`/books/delete/${item._id}`}>
                      <MdOutlineAddBox />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
