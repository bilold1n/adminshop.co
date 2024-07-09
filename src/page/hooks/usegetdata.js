import { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";

export default function usegetdata(collectionName, fresh) {
  const [data, setdata] = useState([]);
  const [ispending, setispending] = useState(true);
  const [error, seterror] = useState({ status: false, massege: "" });
  useEffect(() => {
    const getdata = async () => {
      try {
        const documen = [];
        const querySnapshot = await getDocs(collection(db, collectionName));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          documen.push({ id: doc.id, ...doc.data() });
        });
        setdata(documen);
      } catch (error) {
        seterror({ status: true, massage: error.massage });
      } finally {
        setispending(false);
      }
    };
    getdata();
  }, [fresh]);

  return { data, ispending, error };
}
