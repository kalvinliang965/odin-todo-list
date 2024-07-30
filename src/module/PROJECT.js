export default function(title, id, dom) {
    const getTitle = () => {return title}

    const getID = () => {return id}

    const getDom = () => {return dom}
    
    return {
        getTitle,
        getID,
        getDom,
    }
}