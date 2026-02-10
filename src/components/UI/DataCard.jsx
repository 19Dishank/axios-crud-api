import React, { useState } from 'react';
import { deleteData, updateData } from '../../utils/GetApis';

function DataCard({ curElem, cardsData, setCardsData, data, setData, updateCard, setUpdateCard }) {
    const handleDelete = async (id) => {
        try {
            const res = await deleteData(id);
            // console.log(res);
            if (res.status === 200) {
                const newData = cardsData.filter((curData) => {
                    return curData.id !== id;
                })
                setCardsData(newData)
            }
        } catch (error) {

        }
    }

    const handleUpdate = (curElem) => setUpdateCard(curElem)



    return (
        <div className="max-w-lg w-full  mx-auto overflow-hidden rounded-xl bg-white shadow-lg border border-slate-200 transition-all ">
            <div className="bg-slate-900 px-4 py-2 text-white min-h-30">
                <h3 className="text-xs  tracking-widest opacity-70">{curElem.id}</h3>
                <p className="mt-1 text-md font-bold "> {curElem.title}</p>
            </div>

            <div className="p-2">
                <div className="space-y-2 min-h-35 pl-4">
                    <p className="text-sm leading-relaxed text-slate-600">
                        {curElem.body}
                    </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                        onClick={() => handleUpdate(curElem)}
                        className="rounded-lg px-4 py-2 text-sm font-bold text-slate-600 ring-1 ring-inset ring-slate-300 transition-colors ">
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(curElem.id)}
                        className="rounded-lg px-4 py-2 text-sm font-bold text-slate-600 ring-1 ring-inset ring-red-500 transition-colors hover:bg-red-500 hover:text-slate-100">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DataCard;