
import React, { useEffect, useState } from "react";
import Card from "./Card";

let API_key="&api_key=e08c058f3e7b51fbda9263ea2f266d08";
let base_url="https://api.themoviedb.org/3";
let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
let arr=["Popular", "Theater", "Kids", "Drama", "Comedy"]
const Main=()=> {
    const [movieData, setData]=useState([]);
    const [url_set, setUrl]=useState(url);
    const [search, setSearch]=useState();

    useEffect(()=>{
        fetch(url_set)
        .then(res=>res.json())
        .then(data=>{
            // console.log(data.results);
            setData(data.results);
        });
    }, [url_set]);

    const getData=(movieType)=>{
        if(movieType==="Popular")
        {
            url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
        }
        if (movieType==="Theater")
        {
            url=base_url+"/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22"+API_key
        }
        if (movieType==="Kids")
        {
            url=base_url+"/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc"+API_key
        }
        if (movieType==="Drama")
        {
            url=base_url+"/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10"+API_key
        }
        if (movieType==="Comedy")
        {
            url=base_url+"/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc"+API_key
        }
        setUrl(url);
    }

    const searchMovie=(evt)=>{
        if(evt.key==="Enter")
        {
            // console.log("hello")
            url=base_url+"/search/movie?api_key=e08c058f3e7b51fbda9263ea2f266d08&query="+search;
            setUrl(url);
            setSearch(" ");
        }
    }

    return (
        <>
            <div className="header">
                <nav>
                    <ul>
                        {
                            arr.map((value)=>{
                                return(
                                    <li><a name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <form>
                    <div className="search-btn">
                        <input type="text" placeholder="Enter Movie Name" className="inputText" onChange={(e)=>{
                          setSearch(e.target.value)  
                        }} 
                        value={search}
                        onKeyPress={searchMovie}>
                        </input>
                        <button><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </form>
            </div>
            <div className="container">
                {
                    (movieData.length===0)?<p className="notfound">Not Found</p>: movieData.map((res,pos)=>{
                        return(
                            <Card info={res} key={pos} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default Main