import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  department: string;
  salary: number;
  phone: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    search: '',
    sortBy: 'id',
    sortOrder: 'asc'
  });
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/users', {
        params: filters
      });
      setUsers(response.data.users);
      setPagination({
        total: response.data.total,
        totalPages: response.data.total_pages
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleSort = (column: string) => {
    setFilters(prev => ({
      ...prev,
      sortBy: column,
      sortOrder: prev.sortBy === column && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Simple Data Explorer</h1>
      
      {/* Search */}
      <input
        type="text"
        placeholder="Search users..."
        value={filters.search}
        onChange={handleSearch}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            {['id', 'first_name', 'last_name', 'email', 'company', 'department', 'salary', 'phone'].map(column => (
              <th 
                key={column}
                onClick={() => handleSort(column)}
                style={{ padding: '10px', border: '1px solid #ddd', cursor: 'pointer' }}
              >
                {column.replace('_', ' ').toUpperCase()} 
                {filters.sortBy === column && (filters.sortOrder === 'asc' ? ' ↑' : ' ↓')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} style={{ textAlign: 'center', padding: '20px' }}>
                Loading...
              </td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.first_name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.last_name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.company}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.department}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>${user.salary.toLocaleString()}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.phone}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          Page {filters.page} of {pagination.totalPages} | Total: {pagination.total} users
        </div>
        <div>
          <button 
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
            style={{ marginRight: '10px', padding: '5px 10px' }}
          >
            Previous
          </button>
          <button 
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page === pagination.totalPages}
            style={{ padding: '5px 10px' }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}