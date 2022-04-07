import { Fragment, useEffect } from "react";
import { selection } from "../core/apis/selection";

const SelectionComponent: React.FC = () => {

    let localStorageData: any = null;

    if (localStorage.getItem('storage_auth')) {
        localStorageData = JSON.parse(localStorage?.getItem('storage_auth') || '');
    }

    const fetchVessels = async (userId: number) => {
        const result = await selection(userId);
    }

    useEffect(() => {
        if (localStorageData?.isAuthenticated) {
            fetchVessels(localStorageData?.user.id)
        } else {
            alert('not user authentication');
        }
    }, []);


    return <Fragment>
        <h4> Vessel Selection </h4>
    </Fragment>
}

export default SelectionComponent;