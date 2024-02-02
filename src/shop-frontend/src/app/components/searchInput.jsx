"use client"
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import {useSearchParams} from 'next/navigation'

function SearchInput() {

    const router = useRouter();
    // We need to grab the current search parameters and use it as default value for the search input

    const [inputValue, setValue] = useState('');
    const handleChange = (event) =>{
        const inputValue = event.target.value;
        setValue(inputValue);
    }
    function handleSearch(){
        if (inputValue) return router.push(`/?q=${inputValue}`);
        if (!inputValue) return router.push("/")
    }
    function handleKeyPress(event){
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
export default SearchInput;