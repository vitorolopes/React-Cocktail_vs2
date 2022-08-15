import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const StateContextProvider = ( {children }) => { 

    const [isLoading, setIsLoading] = useState(true);
    const [cocktailsData, setCocktailsData] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

    const fetchData = async () => {
      try{
        // const res = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
        const res = await fetch(`${baseUrl}${searchTerm}`)
        const data = await res.json()
        console.log(data.drinks)
        setCocktailsData(data.drinks)
        setIsLoading(false)
      }catch (error) {
            console.log(error)
       }
    }

    useEffect(() => {
        fetchData()
    }, [searchTerm])
    

    return(
        <StateContext.Provider
            value = {{
                cocktailsData,
                isLoading,
                setSearchTerm
            }}
        >
            { children }
        </StateContext.Provider>
    )
 }

 export const useStateContext = () => useContext(StateContext)

