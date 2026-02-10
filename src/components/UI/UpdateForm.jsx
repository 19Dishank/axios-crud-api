import { useEffect, useState } from "react"
import { updateData, editData } from "../../utils/GetApis" // Import editData

export const UpdateForm = ({ cardsData, setCardsData, updateCard, setUpdateCard }) => {
    const [data, setData] = useState({ title: "", body: "" })

   
    useEffect(() => {
        if (updateCard && Object.keys(updateCard).length > 0) {
            setData({
                title: updateCard.title || "",
                body: updateCard.body || ""
            });
        }
    }, [updateCard])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const isEmpty = Object.keys(updateCard).length === 0;

        try {
            if (isEmpty) {
                // ADD LOGIC
                const res = await updateData(data);
                if (res.status === 200 || res.status === 201) {
                    setCardsData((prev) => [...prev, res.data]);
                }
            } else {
                // UPDATE LOGIC
                const res = await editData(updateCard.id, data);
                if (res.status === 200) {
                    setCardsData((prev) => 
                        prev.map((cur) => (cur.id === updateCard.id ? res.data : cur))
                    );
                    setUpdateCard({}); 
                }
            }
            setData({ title: "", body: "" }); 
        } catch (error) {
            console.error("Operation failed:", error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <div className="max-w-sm mx-auto overflow-hidden rounded-xl bg-white shadow-lg border border-slate-200 transition-all ">
            <form onSubmit={handleSubmit}>
                <div className="bg-slate-900 px-4 py-2 text-white min-h-20 flex flex-row justify-center items-center">
                    
                    <p className="mt-1 text-2xl font-bold "> 
                        {Object.keys(updateCard).length === 0 ? "Add Post" : "Edit Post"} 
                    </p>
                </div>
                <div className="p-5">
                    <div className="space-y-2 min-h-30">
                        <input value={data.title} name="title" onChange={handleChange} placeholder="Title" className='placeholder:opacity-70 text-sm rounded-lg px-4 py-2 border w-full' type="text" />
                        <textarea value={data.body} name="body" onChange={handleChange} rows={5} placeholder="Write Comment" className='placeholder:opacity-70 text-sm rounded-lg px-4 py-2 w-full border'></textarea>
                    </div>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <button className="rounded-lg px-4 py-2 text-sm font-bold text-slate-600 ring-1 ring-inset ring-slate-300 transition-colors ">
                            {Object.keys(updateCard).length === 0 ? "Add" : "Update"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
