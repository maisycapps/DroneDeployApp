const QueryForm = ({ query, setQuery, handleQueries }) => {

    const handleSubmit = (e, query) => {
        e.preventDefault()
        handleQueries(query)
        setQuery("")
    }
    return ( 
        <>
        <div className="queryForm">

            <form>

            <input id="userInput" type="text" placeholder="ask openAI about the datasets below..." className="textInput" value={query} 
            onChange={(e) => {
            setQuery(e.target.value)
            }}/> {"   "}

            <button type="submit" onClick={(e)=>handleSubmit(e, query)}>submit</button>

            </form>
        </div>
        </>
     );
}
 
export default QueryForm;