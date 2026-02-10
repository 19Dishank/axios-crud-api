import React, { useEffect, useState } from 'react';
import { getData } from '../utils/GetApis';
import DataCard from './UI/DataCard';
import { UpdateForm } from './UI/UpdateForm';

const Data = () => {
    const [cardsData, setCardsData] = useState([]);
    const [updateCard, setUpdateCard] = useState({})

    const fetchData = async () => {
        try {
            const res = await getData();
            console.log(res.data);
            setCardsData(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5 py-10 px-10">
            <div className='flex flex-row'>
                <UpdateForm
                    cardsData={cardsData}
                    setCardsData={setCardsData}
                    updateCard={updateCard}
                    setUpdateCard={setUpdateCard} />
            </div>
            {cardsData.map((curElem) => {
                return <DataCard
                    curElem={curElem}
                    key={curElem.id}
                    cardsData={cardsData}
                    setCardsData={setCardsData}
                    setUpdateCard={setUpdateCard} />
            })}


        </div>
    );
};

export default Data;

