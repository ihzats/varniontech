import React, { useState, useEffect, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import axios from 'axios';

function App() {
  const [barang, setBarang] = useState([]);
  const [fetchData, setFetchData] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    nama_barang: '',
    satuan_barang_id: '',
    kategori_barang_id: '',
    jumlah: '',
    user_id: '',
  });
  const [satuanBarangOptions, setSatuanBarangOptions] = useState([]);
  const [kategoriBarangOptions, setKategoriBarangOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: '',
    nama_barang: '',
    satuan_barang_id: '',
    kategori_barang_id: '',
    jumlah: '',
    user_id: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedBarang = barang.slice(indexOfFirstItem, indexOfLastItem);




  // add New
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/satuanbarang')
      .then(response => {
        setSatuanBarangOptions(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching satuan barang options:', error);
      });

    axios.get('http://127.0.0.1:8000/api/kategoribarang')
      .then(response => {
        setKategoriBarangOptions(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching kategori barang options:', error);
      });

    axios.get('http://127.0.0.1:8000/api/user')
      .then(response => {
        setUserOptions(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching user options:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/barang/addnew', formData)
      .then((response) => {
        // Handle response
        console.log('Barang added successfully:', response.data);
        // Close popup
        setShowPopup(false);
        // Clear form data
        setFormData({
          nama_barang: '',
          satuan_barang_id: '',
          kategori_barang_id: '',
          jumlah: '',
          user_id: '',
        });
        closePopup();
        // Trigger data fetching
        setFetchData(!fetchData);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error adding barang:', error);

      });

  };

  const closePopup = () => {
    setShowPopup(false);
  };
  //end addnew


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/barang')
      .then(response => {
        const data = response.data.data; // Simpan data respons ke dalam state barangList
        const barangArray = [];

        for (let i = 0; i < data.length; i++) {
          const barang = data[i];
          barangArray.push(barang);
        }

        setBarang(barangArray);
        console.log(barangArray)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setBarang([]);
      });
  }, [fetchData]);


  //delete
  const handleDelete = (itemId) => {
    setDeleteItemId(itemId);
    setShowDeletePopup(true);
  };

  // Confirm delete action
  const confirmDelete = () => {
    console.log('Deleting item with ID:', deleteItemId);
    if (deleteItemId) {
      axios.delete(`http://127.0.0.1:8000/api/barang/delete/${deleteItemId}`)
        .then(() => {
          console.log('Barang deleted successfully.');
          const updatedBarang = barang.filter(item => item.id !== deleteItemId);
          setBarang(updatedBarang);
          setShowDeletePopup(true);
        })
        .catch(error => {
          // console.error('Error deleting barang:', error);
        })

        .finally(() => {
          setFetchData(!fetchData);
          setDeleteItemId(null);
        });
    }
  };


  // edit

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
  };

  const openEditPopup = (barang) => {
    setEditFormData({
      id: barang.id,
      nama_barang: barang.nama_barang,
      satuan_barang_id: barang.satuan_barang_id,
      kategori_barang_id: barang.kategori_barang_id,
      jumlah: barang.jumlah,
      user_id: barang.user_id,
    });
    setShowEditPopup(true);
  };


  const handleEditSubmit = (e) => {
    console.log('Edit item with ID:', editFormData)
    e.preventDefault();
    // Make a request to update data in the API
    axios
      .put(`http://127.0.0.1:8000/api/barang/update/${editFormData.id}`, editFormData)
      .then((response) => {
        console.log('Data updated successfully:', response.data.data);
        // You can update the barang state with the new data if needed
        const updatedBarang = barang.map((item) =>
          item.id === response.data.id ? response.data : item
        );
        setBarang(updatedBarang);

      })
      .catch((error) => {
        // console.error('Error updating data:', error);
      })
      .finally(() => {
        setFetchData(!fetchData);
        closeEditPopup(null)
      });
  };

  // pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='bg-gray-200 min-h-screen'>
      <h1 className='pt-5 font-black text-4xl text-center items-center'>Tabel Barang</h1>
      <div className=' flex justify-between mb-4 mt-2 text-center'>
        <button
          onClick={() => setShowPopup(true)}
          className='p-2 mx-24 rounded-md text-white hover:bg-red-300 bg-blue-500'
        >
          Addnew
        </button>
        <Transition show={showPopup} as={React.Fragment}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
              </Transition.Child>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>

              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-8 py-6">
                    <div className="text-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                        Tambah Data
                      </h3>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">

                      <div>
                        <label htmlFor="nama_barang" className="block text-sm font-medium text-gray-700">
                          Nama Barang
                        </label>
                        <input
                          type="text"
                          id="nama_barang"
                          name="nama_barang"
                          value={formData.nama_barang}
                          onChange={handleInputChange}
                          required
                          className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="satuan_barang_id" className="block text-sm font-medium text-gray-700">
                          Satuan Barang
                        </label>
                        <select
                          id="satuan_barang_id"
                          name="satuan_barang_id"
                          value={formData.satuan_barang_id}
                          onChange={handleInputChange}
                          required
                          className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Pilih Satuan Barang</option>
                          {satuanBarangOptions.map(option => (
                            <option key={option.id} value={option.id}>{option.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="kategori_barang_id" className="block text-sm font-medium text-gray-700">
                          Kategori Barang
                        </label>
                        <select
                          id="kategori_barang_id"
                          name="kategori_barang_id"
                          value={formData.kategori_barang_id}
                          onChange={handleInputChange}
                          required
                          className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Pilih Kategori Barang</option>
                          {kategoriBarangOptions.map(option => (
                            <option key={option.id} value={option.id}>{option.nama}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="jumlah" className="block text-sm font-medium text-gray-700">
                          Jumlah
                        </label>
                        <input
                          type="number"
                          id="jumlah"
                          name="jumlah"
                          value={formData.jumlah}
                          onChange={handleInputChange}
                          required
                          className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
                          User ID
                        </label>
                        <select
                          id="user_id"
                          name="user_id"
                          value={formData.user_id}
                          onChange={handleInputChange}
                          required
                          className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Pilih User ID</option>
                          {userOptions.map(option => (
                            <option key={option.id} value={option.id}>{option.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex justify-center gap-4 text-center mt-6 ">
                        <button
                          type="submit"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Tambah
                        </button>

                        <button
                          type="button"
                          onClick={closePopup}
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                          Batal
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Transition>
      </div>


      <div className="px-24 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Kode Barang
              </th>
              <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Nama Barang
              </th>
              <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Kategori Barang
              </th>
              <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Satuan Barang
              </th>
              <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Jumlah
              </th>
              {/* <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
          User ID
        </th> */}
              <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-center">
            {barang.length > 0 ? (
              displayedBarang.map((barang, index) => (
                <tr key={`${barang.id}-${index + (currentPage - 1) * itemsPerPage}`}>
                  <td className="px-6 py-4 whitespace-no-wrap">{index + (currentPage - 1) * itemsPerPage + 1}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{barang.kode_barang}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{barang.nama_barang}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{barang.kategori_barang.kode}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{barang.satuan_barang.kode}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{barang.jumlah}</td>
                  {/* <td className="px-6 py-4 whitespace-no-wrap">{barang.user_id}</td> */}
                  <td className="px-6 py-4 whitespace-no-wrap text-center">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                      onClick={() => openEditPopup(barang)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(barang.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 whitespace-no-wrap text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {barang.length > itemsPerPage && (
          <nav className="block">
            <ul className="flex pl-0 rounded list-none flex-wrap">
              {[...Array(Math.ceil(barang.length / itemsPerPage)).keys()].map((number) => (
                <li key={number}>
                  <button
                    onClick={() => handlePageChange(number + 1)}
                    className={`${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                      } hover:bg-blue-100 hover:text-blue-700 px-3 py-2 border border-blue-500  cursor-pointer`}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Edit */}
      <Transition show={showEditPopup} as={Fragment}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
            </Transition.Child>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-8 py-6">
                  <div className="text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                      Edit Data Barang
                    </h3>
                  </div>
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="nama_barang" className="block text-sm font-medium text-gray-700">
                        Nama Barang
                      </label>
                      <input
                        type="text"
                        id="nama_barang"
                        name="nama_barang"
                        value={editFormData.nama_barang}
                        onChange={handleEditInputChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="satuan_barang_id" className="block text-sm font-medium text-gray-700">
                        Satuan Barang
                      </label>
                      <select
                        id="satuan_barang_id"
                        name="satuan_barang_id"
                        value={editFormData.satuan_barang_id}
                        onChange={handleEditInputChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Pilih Satuan Barang</option>
                        {satuanBarangOptions.map(option => (
                          <option key={option.id} value={option.id}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="kategori_barang_id" className="block text-sm font-medium text-gray-700">
                        Kategori Barang
                      </label>
                      <select
                        id="kategori_barang_id"
                        name="kategori_barang_id"
                        value={editFormData.kategori_barang_id}
                        onChange={handleEditInputChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Pilih Kategori Barang</option>
                        {kategoriBarangOptions.map(option => (
                          <option key={option.id} value={option.id}>{option.nama}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="jumlah" className="block text-sm font-medium text-gray-700">
                        Jumlah
                      </label>
                      <input
                        type="number"
                        id="jumlah"
                        name="jumlah"
                        value={editFormData.jumlah}
                        onChange={handleEditInputChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
                        User ID
                      </label>
                      <select
                        id="user_id"
                        name="user_id"
                        value={editFormData.user_id}
                        onChange={handleEditInputChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Pilih User ID</option>
                        {userOptions.map(option => (
                          <option key={option.id} value={option.id}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-center gap-4 text-center mt-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Simpan
                      </button>
                      <button
                        type="button"
                        onClick={() => closeEditPopup(null)}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Transition>


      {/* Delete */}
      <Transition show={deleteItemId !== null} as={Fragment}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
            </Transition.Child>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-8 py-6">
                  <div className="text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                      Delete Confirmation
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Are you sure you want to delete this item?
                    </p>
                  </div>
                  <div className="flex justify-center gap-4 text-center mt-6">
                    <button
                      type="button"
                      onClick={confirmDelete}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteItemId(null)}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Transition>

    </div>
  );
}

export default App;
