import React, { useState } from 'react';
import { Input, Table } from 'antd';

const { Search } = Input;

const columns = [
  {
    title: 'Movie Name',
    dataIndex: 'movie_name',
    key: 'movie_name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
  },
  // Diğer kolonlarınızı buraya ekleyebilirsiniz.
];

const SearchTable = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState(); // Arama terimi için state
    const [loading, setloading] = useState(false); // Arama terimi için state

    const onSearch = async () => {
        setloading(true);
      try {
        const response = await fetch('http://localhost:3001/search?term=' + searchTerm);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const jsonData = await response.json();
        const dataWithKey = jsonData.map(item => ({
          ...item,
          key: item._id,
        }));
    
        setData(dataWithKey);
        setloading(false);
      } catch (error) {
        console.error('Arama sırasında bir hata oluştu:', error);
        setloading(false);
      }
    };
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value); // Arama kutusuna girilen değeri güncelle
      console.log(searchTerm);
    };
  
    return (
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <div className='text-[50px] mt-10 mb-10'>Bilgi Erişim Sistemlerine Giriş</div>
        
        <div className='text-[30px] mb-10'>Film Arama Algoritması</div>

        <Search
        className=' w-1/2'
          value={searchTerm}
          onChange={handleSearchChange}
          onSearch={onSearch}
          placeholder="Film adı girin..."
          style={{ marginBottom: 16 }}
        />
        <Table loading={loading} className=' w-1/2' columns={columns} dataSource={data} />
      </div>
    );
  };
  
  export default SearchTable;