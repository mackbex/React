import React, {useEffect} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {fetchUsesAsync, incrementAsync} from "./counterSlice";

export default function Test() {

  const dispatch = useAppDispatch()
  useEffect(() => {
    const promise = dispatch(fetchUsesAsync())
    return () => {
      promise.abort()
    }
  }, [dispatch]);

  return(
    <div></div>
  )
}