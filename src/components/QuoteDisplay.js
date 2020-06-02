import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { IoLogoTwitter } from 'react-icons/io'

const QuoteDisplay = () => {
    const [quote, setQuote] = useState('')
    const [author, setAuthor] = useState('')
    const [error, setError] = useState('')
    const [showLoader, setShowLoader] = useState(false)
    const [tweetUrl, setTweetUrl] = useState('')

    useEffect(() => {
        fetchQuote()
    },[])

    const fetchQuote = () => {
        setShowLoader(true)
        axios.get('https://quote-garden.herokuapp.com/api/v2/quotes/random')
        .then(res => {
            console.log(res)
            setQuote(res.data.quote.quoteText)
            setAuthor(res.data.quote.quoteAuthor)
            setTweetUrl(`https://twitter.com/intent/tweet?text=%22${res.data.quote.quoteText}%22 \n - ${res.data.quote.quoteAuthor}`)
        })
        .then(() => {
            setShowLoader(false)
        })
        .catch(err => {
            console.log(err.message)
            setError(err.message)
        })
    }

    return (
        
        showLoader ? 
        <p>...loading</p>
        :
        <div id="quote-box">
            <p id="text">{quote}</p>
            <p id="author">- {author}</p>
            <button id="new-quote" onClick={fetchQuote}>New Quote</button>
            <a href={tweetUrl} title="tweet this quote" target="_blank" id="tweet-quote"><IoLogoTwitter color="#fa8072"/></a>
        </div>
        
    )
}

export default QuoteDisplay
