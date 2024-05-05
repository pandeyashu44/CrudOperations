import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:5001/delete/' + id)
      .then(res => {
        // Update data after delete
        setData(data.filter(item => item.id !== id));
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-10 bg-white p-3'>
        <h2 className="text-danger">User List</h2>
        <div className='d-flex justify-content-end'>
          <Link to="/create" className='btn btn-success'>Create +</Link>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th className="text-danger">Id</th>
              <th className="text-danger">Principal Entity Id</th>
              <th className="text-danger">Sender Id</th>
              <th className="text-danger">Template Id</th>
              <th className="text-danger">Template Content</th>
              <th className="text-danger">Created At</th>
              <th className="text-danger">Updated At</th>
              <th className="text-danger">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dlt, index) => {
              return (
                <tr key={index}>
                  <td>{dlt.id}</td>
                  <td>{dlt.principal_entity_id}</td>
                  <td>{dlt.sender_id}</td>
                  <td>{dlt.template_id}</td>
                  <td>{dlt.template_content}</td>
                  <td>{dlt.created_at}</td>
                  <td>{dlt.updated_at}</td>
                  <td>
                    <Link to={`/read/${dlt.id}`} className='btn btn-sm btn-info'>Read</Link>
                    <Link to={`/edit/${dlt.id}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                    <button onClick={() => handleDelete(dlt.id)} className='btn btn-sm btn-danger'>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home;
