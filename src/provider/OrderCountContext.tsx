import React, { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react'


interface OrderCountType{
    ordercount:boolean;
    setOrdercount: Dispatch<SetStateAction<boolean>>;
}

export const OrderContext = createContext<OrderCountType | null>(null);

// Define the props for the provider component
interface OrderCountProvideProps {
    children: ReactNode; // Properly type the children prop
  }

const OrderCountContext: FC<OrderCountProvideProps> = ({children}) => {
    const [ordercount,setOrdercount] = useState(false);
    console.log(ordercount)
  return (
    <OrderContext.Provider value={{ordercount,setOrdercount}}>
        {children}
    </OrderContext.Provider>
  )
}

export default OrderCountContext
