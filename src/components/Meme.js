import React from 'react'

const Meme = ({template, onClick} ) => {
    return (
        <img style={{width: 200}} key={template.id} src={template.url} alt={template.meme} onClick={onClick} />
    )
}

export default Meme
