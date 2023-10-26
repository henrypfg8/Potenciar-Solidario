import { useEffect, useState } from "react";
import data from "../../assets/data";
import ForumView from '../../views/ForumView/ForumView';

function Forum(){
    const { usuarios } = data;
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        setDatos(usuarios)
    }, [usuarios])

    return <ForumView datos={datos} />
}

export default Forum;
