"use client"
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
// import { useParams } from 'react-router-dom';

function ListProd() {
    const router = useRouter()

    const [inputValue, setValue] = useState('')

    function handleChange(event){
        const inputValue = event.target.value;
        setValue(inputValue);
    }

    function handleSearch(){
        if (inputValue) return router.push(`/?q=${inputValue}`, undefined, { replace: true });
        if (!inputValue) return router.push("/", undefined, { replace: true })

    }

    function handleKeyPress(event) {
        if (event.key === "Enter") return handleSearch()
    }
    return (

        <div className="searchInput">
            <label htmlFor="inputId">searchIcon</label>
            <input type="text"
                id="inputId"
                placeholder="Enter your keywords"
                value={inputValue ?? ""} onChange={handleChange}
                onKeyDown={handleKeyPress}
                className="textSearch" />
        </div>

    )
}
export default ListProd;
