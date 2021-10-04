import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

function ProductTesting() {
    const {id} = useParams();
    const product = useSelector((state) => state.updatedDatas.data);
    const[updatedData, setUpdatedData] = useState(null);
    useEffect(() => {
        const a = parseInt(id);
        for(var j=0; j<product.length; j++){
            if(product[j].id === a){
                setUpdatedData(product[j]);
            }
        }
    }, [product, id])
    return (
        <div>
            <h1>sjdhsfdlkslkd</h1>
            {
                console.log(updatedData)
            }
        </div>
    )
}

export default ProductTesting
