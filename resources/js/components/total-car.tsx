import React from 'react'

type myCar = {
    title:string,
    brand:string,
    model:string,
    brands_id:number,
    models_id:number,
    user_id:number,
}

type Props = {
    items: myCar[]
}

function TotalCar({items}:Props) {
  return (
    <div className='px-2'>
          <h4 className='text-xl font-light'>Registered Vehicle</h4>
          <div className='pt-2'>
              <h1 className='text-3xl font-bold flex justify-end'>{ items.length}</h1>
          </div>
    </div>
  )
}

export default TotalCar
