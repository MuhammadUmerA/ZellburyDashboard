import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from 'axios'
import { CSVLink } from "react-csv";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

function Top() {
    const [stdudentSubject, setStudentsubject] = useState([]);
    const [studentMarks, setStudentMarks] = useState([]);

    const [items, setItems] = useState([]) //this will represent the items that will be coming from the API
    // const [isLoading, setLoading] = useState(true)


    useEffect(() => {


        //date
        const current = new Date();
        const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
        const MounthDate = `${current.getMonth()}/01/${current.getFullYear()}`;

        // cahrt
        const sSubject = [];
        const sMarks = [];
        const getStudentdata = async () => {
            const reqData = await fetch(`https://posapi.gtech.com.pk/api/post/coBrandSummary?api=qTpq3bVFho&DateFrom=${MounthDate}&DateTo=${date}`);
            const resData = await reqData.json();
            for (let i = 0; i < resData.length; i++) {
                sSubject.push(resData[i].coBrand);
                sMarks.push(parseInt(resData[i].monthly));
            }
            setStudentsubject(sSubject);
            setStudentMarks(sMarks);
            //console.log(resData); 
        }

        getStudentdata();

        // table

        const getItems = async () => {
            const result = await axios(
                `https://posapi.gtech.com.pk/api/post/coBrandSummary?api=qTpq3bVFho&DateFrom=${MounthDate}&dateTo=${date}&Region=&Location=
                &Category=&Department=&CoBrand=&Channel=All`
            )
            // console.log(result.data)

            setItems(result.data)//sets the data to appear 
            // setLoading(false) //stop loading when data is fetched


        }
        getItems()


    }, []);

    // Today

    let idSum = 0;

    let idSumTodayQty = 0;
    let idSumYes = 0;
    let idSumYesQty = 0;
    let idSumMon = 0;
    let idSumMonQty = 0;
    let idSumpreMon = 0;
    let idSumpreMonQty = 0;

    for (let i = 0; items && i < items.length; i++) {
        idSum += items[i].today;
        idSumTodayQty += items[i].todayQty;
        idSumYes += items[i].yesterday;
        idSumYesQty += items[i].yesterdayQty;
        idSumMon += items[i].monthly;
        idSumMonQty += items[i].monthlyQty;
        idSumpreMon += items[i].previous;
        idSumpreMonQty += items[i].previousQty;
    }


    return (
        <>
            <h4>Top 10 Design Summary</h4>

        </>
    )
}

export default Top