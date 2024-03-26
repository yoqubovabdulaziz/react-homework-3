import React, { useState } from 'react'
import "./todoApp.scss"

import { BiAddToQueue } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

function TodoApp() {
    const [plan, setPlan] = useState("")
    const [data, setData] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        let newPlan = {
            id: `user-${new Date().getTime()}`,
            plan: plan,
        }

        setData(p => [...p, newPlan])
        setPlan("")
    }

    const deleteItem = (id) => {
        let items = document.querySelectorAll(".todo__item");

        items.forEach(item => {
            if (item.id === id) {
                item.classList.add("todo__animation");

                let filteredData = data.filter((item) => item.id !== id);

                setTimeout(() => {
                    setData(filteredData);
                }, 1000);
            }
        });
    }


    let itemPlan = data?.map((item) =>
        <div id={item.id} key={item.id} className="todo__item">
            <h3>{item.plan}</h3>
            <button onClick={() => deleteItem(item.id)} className="todo__delete__btn"><MdDelete className='delete-icon' /></button>
        </div>
    )

    return (
        <div className='todo__box'>
            <div className="todo__header">
                <form onSubmit={handleSubmit} className='todo__form'>
                    <input required value={plan} onChange={(e) => setPlan(e.target.value)} type="text" placeholder='Write your plans' />
                    <button>
                        Add
                        <BiAddToQueue className='add-icon' />
                    </button>
                </form>
            </div>
            <div className="todo__items__row">
                {itemPlan}
            </div>
        </div>
    )
}

export default TodoApp