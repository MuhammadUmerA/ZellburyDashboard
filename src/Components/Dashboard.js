import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import zellbury from '../images/OrientLogo.png'
import gtech from '../images/logo.png'
import BlueBox from './BlueBox';
import Summary from "./Summary";
import Location from "./Summaryies/Location";
import Region from "./Summaryies/Region";
import CoBrand from "./Summaryies/CoBrand";
import Department from "./Summaryies/Department";
import Category from "./Summaryies/Category";
import Production from "./Summaryies/Production";
import Top from "./Summaryies/Top";

function Dashboard() {


    //back to top 


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'

        });
    };

    // Tabs

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    }

    //  date
    const current = new Date();
    const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
    const MounthDate = `${current.getMonth()}/01/${current.getFullYear()}`;
    const currentYear = current.getFullYear();
    const nextYear = current.getFullYear() + 1;


    // Hooks For Fetching Data

    const [isLoading, setLoading] = useState(true)
    // hooks for Blue Boxes
    const [blueBoxData, setBlueBoxData] = useState([])
    // Sales Summary
    const [items, setItems] = useState([])
    // LOcation
    const [itemsLocation, setItemsLocation] = useState([])

    // CAtegory

    const [itemsCategory, setItemsCategory] = useState([])

    //CoBrand


    const [itemsCoBrand, setItemsCoBrand] = useState([])


    // Production Year

    const [itemsProduction, setItemsProduction] = useState([])

    // Department

    const [itemsDepartment, setItemsDepartment] = useState([])

    // hooks for filters

    const [region, setRegion] = useState([])
    const [Locationitems, setLocationitems] = useState([])
    const [category, setCategory] = useState([])
    const [department, setDepartment] = useState([])
    const [coBrand, setCoBrand] = useState([])


    // chart for summaries
    // LOCATION  SUMMARY
    const [LocationLabelsHook, setLocationLabelsHook] = useState([]);
    const [LocationValueHook, setLocationValueHook] = useState([]);

    //SALES

    const [previousYearMonthnetSale, setPreviousYearMonthnetSale] = useState("");
    const [monthlynetSale, setMonthlynetSale] = useState("");

    // CATEGORY SUMMARY
    const [CategoryValueHook, setCategoryValueHook] = useState([]);
    const [CategoryLableHook, setCategoryLableHook] = useState([]);

    //CO BRAND
    const [CoBrandValueHook, setCoBrandValueHook] = useState([]);
    const [CoBrandLableHook, setCoBrandLableHook] = useState([]);

    //DEPARTMENT

    const [DepartmentValueHook, setDepartmentValueHook] = useState([]);
    const [DepartmentLableHook, setDepartmentLableHook] = useState([]);


    // PRODUCTION YEAR 

    const [ProductionValueHook, setProductionValueHook] = useState([]);
    const [ProductionLableHook, setProductionLableHook] = useState([]);

    // constants for chart 
    const LocationLabels = [];
    const LocationValue = [];
    // Category
    const CategoryLable = [];
    const CategoryValue = [];
    //coobarnd
    const CoBrandLable = [];
    const CoBrandValue = [];
    //DEPARTMENT
    const DepartmentLable = [];
    const DepartmentValue = [];

    // PRODUCTION

    const ProductionLable = [];
    const ProductionValue = [];

    // Login
    const navigate = useNavigate();

    const logout = () => {
        navigate('/Login');
    }

    // auto refresh start
    const [show, setShow] = useState(true);

    const handleClick = () => {
        setShow(s => !s);
    };



    // filters  
    // Getting codes from drop down
    //Region
    const [valRegion, setValRegion] = useState('');

    const handleChangeRegion = (e) => {
        setValRegion(e.target.value);
    };
    //Location
    const [valLocation, setValLocation] = useState('');

    const handleChangeLocation = (e) => {
        setValLocation(e.target.value);
    };
    //Category
    const [valCategory, setValCategory] = useState('');

    const handleChangeCategory = (e) => {
        setValCategory(e.target.value);
    };
    //Department
    const [valDepartment, setValDepartment] = useState('');

    const handleChangeDepartment = (e) => {
        setValDepartment(e.target.value);
    };
    //Channel
    const [valChannel, setValChannel] = useState("All");

    const handleChangeChannel = (e) => {
        setValChannel(e.target.value);
    };
    // Cobrand
    const getInitialState = () => {
        const value = '';
        return value;
    };

    const [value, setValue] = useState(getInitialState);

    const handleChange = (e) => {
        setValue(e.target.value);
    };
    // Click On Filter Btn
    const Filter = () => {

        // Hooks For Fetching Data

        setLoading(true);
        setBlueBoxData([]);
        setItems([]);
        setItemsCategory([]);
        setItemsCoBrand([]);
        setItemsDepartment([]);
        setItemsLocation([]);
        setItemsProduction([]);

        // Blue Box  


        const getBlueBoxes = async () => {
            const result = await axios(
                `https://posapi.gtech.com.pk/api/post/SummaryBoxes?api=qTpq3bVFho&DateFrom=${MounthDate}&dateTo=${date}&Region=${valRegion}&Location=${valLocation}
                &Category=${valCategory}&Department=${valDepartment}&CoBrand=${value}&Channel=${valChannel}` //Endpoint and parameter or base Url
            )
            // console.log(result.data)

            setBlueBoxData(result.data)

            setLoading(false) //stop loading when data is fetched

        }
        getBlueBoxes()

        // Sales Summary table

        const getSalesSummary = async () => {
            const result = await axios(
                `https://posapi.gtech.com.pk/api/post/SalesSummary?api=qTpq3bVFho&DateFrom=${MounthDate}&dateTo=${date}&Region=${valRegion}&Location=${valLocation}
                &Category=${valCategory}&Department=${valDepartment}&CoBrand=${value}&Channel=${valChannel}`
            )
            // console.log(result.data)

            setItems(result.data)//sets the data to appear 
            setLoading(false) //stop loading when data is fetched

        }
        getSalesSummary()


        // Location Summary

        const getLocationSummary = async () => {
            const result = await axios(
                `https://posapi.gtech.com.pk/api/post/LocationSummary?api=qTpq3bVFho&DateFrom=${MounthDate}&dateTo=${date}&Region=${valRegion}&Location=${valLocation}
                &Category=${valCategory}&Department=${valDepartment}&CoBrand=${value}&Channel=${valChannel}`
            )
            // console.log(result.data)

            setItemsLocation(result.data)//sets the data to appear 
            setLoading(false) //stop loading when data is fetched

        }
        getLocationSummary()
        //Category

        const getItemsCategory = async () => {
            const result = await axios(
                `https://posapi.gtech.com.pk/api/post/CategorySummary?api=qTpq3bVFho&DateFrom=${MounthDate}&dateTo=${date}&Region=${valRegion}&Location=${valLocation}
                &Category=${valCategory}&Department=${valDepartment}&CoBrand=${value}&Channel=${valChannel}`
            )
            // console.log(result.data)

            setItemsCategory(result.data)//sets the data to appear 
            // setLoading(false) //stop loading when data is fetched


        }
        getItemsCategory()

        // CoBrand


        const getItemsCoBrand = async () => {
            const result = await axios(
                `https://posapi.gtech.com.pk/api/post/coBrandSummary?api=qTpq3bVFho&DateFrom=${MounthDate}&dateTo=${date}&Region=${valRegion}&Location=${valLocation}
                &Category=${valCategory}&Department=${valDepartment}&CoBrand=${value}&Channel=${valChannel}`
            )
            // console.log(result.data)

            setItemsCoBrand(result.data)//sets the data to appear 
            // setLoading(false) //stop loading when data is fetched


        }
        getItemsCoBrand()

        const getItemsDepartment = async () => {
            const result = await axios(
                `https://posapi.gtech.com.pk/api/post/departmentSummary?api=qTpq3bVFho&DateFrom=${MounthDate}&dateTo=${date}&Region=${valRegion}&Location=${valLocation}
                &Category=${valCategory}&Department=${valDepartment}&CoBrand=${value}&Channel=${valChannel}` //Endpoint and parameter or base Url
            )
            // console.log(result.data)

            setItemsDepartment(result.data)//sets the data to appear 
            // setLoading(false) //stop loading when data is fetched


        }
        getItemsDepartment()

        // production year summary

        const getItemsProductionYear = async () => {
            const result = await axios(
                `https://posapi.gtech.com.pk/api/post/Attribute2Summary?api=qTpq3bVFho&DateFrom=${MounthDate}&dateTo=${date}&Region=${valRegion}&Location=${valLocation}
                &Category=${valCategory}&Department=${valDepartment}&CoBrand=${value}&Channel=${valChannel}`
            )
            // console.log(result.data)

            setItemsProduction(result.data)//sets the data to appear 
            // setLoading(false) //stop loading when data is fetched


        }
        getItemsProductionYear()


        // CHARTS OF SUMMARIES

        // SALES SUMMARY

        const getSalesSummaryChart = () => {

            const url = `https://posapi.gtech.com.pk/api/post/SalesSummary?api=qTpq3bVFho&DateFrom=${MounthDate}&dateTo=${date}&Region=${valRegion}&Location=${valLocation}
            &Category=${valCategory}&Department=${valDepartment}&CoBrand=${value}&Channel=${valChannel}`
            //console.log(url);

            axios
                .get(url, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                })
                .then(({ data }) => {
                    //console.log(data);
                    //console.log(data[0].description);
                    setMonthlynetSale(data[2].netSale)
                    setPreviousYearMonthnetSale(data[4].netSale)

                });

        }
        getSalesSummaryChart();
        // LOCATION SUMMARY


        const getLocationChartdata = async () => {
            const reqData = await fetch(`https://posapi.gtech.com.pk/api/post/LocationSummary?api=qTpq3bVFho&DateFrom=${MounthDate}&dateTo=${date}&Region=${valRegion}&Location=${valLocation}
            &Category=${valCategory}&Department=${valDepartment}&CoBrand=${value}&Channel=${valChannel}`);
            const resData = await reqData.json();
            for (let i = 0; i < resData.length; i++) {
                LocationLabels.push(resData[i].locationName);
                LocationValue.push(parseInt(resData[i].monthly));
            }
            setLocationLabelsHook(LocationLabels);
            setLocationValueHook(LocationValue);
            //console.log(resData); 
        }

        getLocationChartdata();

        // category summary

        const getCategoryChart = async () => {
            const reqData = await fetch(`https://posapi.gtech.com.pk/api/post/CategorySummary?api=qTpq3bVFho&DateFrom=${MounthDate}&dateTo=${date}&Region=${valRegion}&Location=${valLocation}
            &Category=${valCategory}&Department=${valDepartment}&CoBrand=${value}&Channel=${valChannel}`);
            const resData = await reqData.json();
            for (let i = 0; i < resData.length; i++) {
                CategoryLable.push(resData[i].categoryName);
                CategoryValue.push(parseInt(resData[i].monthly));
            }
            setCategoryLableHook(CategoryLable);
            setCategoryValueHook(CategoryValue);
            //console.log(resData); 
        }


        getCategoryChart();

        const getCoBrandChart = async () => {
            const reqData = await fetch(`https://posapi.gtech.com.pk/api/post/coBrandSummary?api=qTpq3bVFho&DateFrom=${MounthDate}&dateTo=${date}&Region=${valRegion}&Location=${valLocation}
            &Category=${valCategory}&Department=${valDepartment}&CoBrand=${value}&Channel=${valChannel}`);
            const resData = await reqData.json();
            for (let i = 0; i < resData.length; i++) {
                CoBrandLable.push(resData[i].coBrand);
                CoBrandValue.push(parseInt(resData[i].monthly));
            }
            setCoBrandLableHook(CoBrandLable);
            setCoBrandValueHook(CoBrandValue);
            //console.log(resData); 
        }

        getCoBrandChart();

        // DEPARTMENT



        const getDepartmentChart = async () => {
            const reqData = await fetch(`https://posapi.gtech.com.pk/api/post/departmentSummary?api=qTpq3bVFho&DateFrom=${MounthDate}&dateTo=${date}&Region=${valRegion}&Location=${valLocation}
            &Category=${valCategory}&Department=${valDepartment}&CoBrand=${value}&Channel=${valChannel}`);
            const resData = await reqData.json();
            for (let i = 0; i < resData.length; i++) {
                DepartmentLable.push(resData[i].departmentName);
                DepartmentValue.push(parseInt(resData[i].monthly));
            }
            setDepartmentLableHook(DepartmentLable);
            setDepartmentValueHook(DepartmentValue);
            //console.log(resData); 
        }

        getDepartmentChart();


        // PRODUCTION YEAR

        const getStudentdata = async () => {
            const reqData = await fetch(`https://posapi.gtech.com.pk/api/post/Attribute2Summary?api=qTpq3bVFho&DateFrom=${MounthDate}&dateTo=${date}&Region=${valRegion}&Location=${valLocation}
            &Category=${valCategory}&Department=${valDepartment}&CoBrand=${value}&Channel=${valChannel}`);
            const resData = await reqData.json();
            for (let i = 0; i < resData.length; i++) {
                ProductionLable.push(resData[i].attribute2Name);
                ProductionValue.push(parseInt(resData[i].monthly));
            }
            setProductionLableHook(ProductionLable);
            setProductionValueHook(ProductionValue);
            //console.log(resData); 
        }

        getStudentdata();
    }

    useEffect(() => {

        Filter();


        // filters
        // Region
        const getRegion = async () => {
            const result = await axios(
                `https://posapi.gtech.com.pk/api/post/GetDropDownList?api=qTpq3bVFho&Filter=Region&User=1157-ZAREEN` //Endpoint and parameter or base Url
            )
            // console.log(result.data)

            setRegion(result.data)//sets the data to appear 
            // setLoading(false) //stop loading when data is fetched


        }
        getRegion()
        // location
        const getLocationItems = async () => {
            const result = await axios(
                `https://posapi.gtech.com.pk/api/post/GetDropDownList?api=qTpq3bVFho&Filter=Location` //Endpoint and parameter or base Url
            )
            // console.log(result.data)

            setLocationitems(result.data)//sets the data to appear 
            // setLoading(false) //stop loading when data is fetched


        }
        getLocationItems()

        //Category

        const getCategory = async () => {
            const result = await axios(
                `https://posapi.gtech.com.pk/api/post/GetDropDownList?api=qTpq3bVFho&Filter=Category` //Endpoint and parameter or base Url
            )
            // console.log(result.data)

            setCategory(result.data)//sets the data to appear 
            // setLoading(false) //stop loading when data is fetched


        }
        getCategory()

        //Department

        const getDepartment = async () => {
            const result = await axios(
                `https://posapi.gtech.com.pk/api/post/GetDropDownList?api=qTpq3bVFho&Filter=Department` //Endpoint and parameter or base Url
            )
            // console.log(result.data)

            setDepartment(result.data)//sets the data to appear 
            // setLoading(false) //stop loading when data is fetched


        }
        getDepartment()

        //CoBrand
        const getCoBrand = async () => {
            const result = await axios(
                `https://posapi.gtech.com.pk/api/post/GetDropDownList?api=qTpq3bVFho&Filter=CoBrand` //Endpoint and parameter or base Url
            )
            // console.log(result.data)

            setCoBrand(result.data)//sets the data to appear 
            // setLoading(false) //stop loading when data is fetched


        }
        getCoBrand()

        // sesson over

        const sessonOver = () => {
            setTimeout(() => {
                navigate('/Login');
            }, 1800000);
        }

        sessonOver()


    }, [])//when we use useEffect we put dependency as a second paramers




    return (
        <>


            <div className="skin-info dark-sidebar sidebar-mini pace-done sidebar-collapse dashboardWidth">
                {/* {/* Site wrapper  */}
                <div className="wrapper">


                    <header className="main-header">
                        {/* Logo  */}
                        <a className="logo">
                            {/* mini logo  */}
                            <div className="logo-mini">
                                <span className="light-logo"><img src={zellbury} width="100px" alt="logo" /></span>
                                <span className="dark-logo"><img src={zellbury} width="100px" alt="logo" /></span>
                            </div>
                            {/* logo */}
                            <div className="logo-lg">
                                <span className="light-logo"><img src={gtech} width="100px" alt="logo" /></span>
                                <span className="dark-logo"><img src={gtech} width="100px" alt="logo" /></span>
                            </div>
                        </a>
                        {/* Header Navbar  */}
                        <nav className="navbar navbar-static-top">
                            {/* Sidebar toggle button */}
                            <div className="alien">
                                <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                                    <i className="ti-align-left"></i>
                                </a>
                            </div>
                            <div className="alien-2">
                                <a href="#" className="sidebar-toggle" role="button">
                                    <i className="ti-align-left"></i>
                                </a>
                            </div>

                            <div className="navbar-custom-menu r-side">
                                <ul className="nav navbar-nav" >
                                    {/* Messages  */}
                                    <li className="dropdown messages-menu" >
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">

                                        </a>
                                        <ul className="dropdown-menu animated bounceIn">
                                            <li>
                                                {/* inner menu: contains the actual data  */}
                                                <ul className="menu sm-scrol">
                                                    <li>
                                                        {/* start message  */}
                                                        <a href="#">
                                                            <div className="pull-left">
                                                                <img src="../../images/user2-160x160.jpg" className="rounded-circle"
                                                                    alt="User Image" />
                                                            </div>
                                                            <div className="mail-contnet">
                                                                <h4>
                                                                    Lorem Ipsum
                                                                    <small><i className="fa fa-clock-o"></i> 15 mins</small>
                                                                </h4>
                                                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing
                                                                    elit.</span>
                                                            </div>
                                                        </a>
                                                    </li>

                                                </ul>
                                            </li>
                                            <li className="footer">
                                                <a href="#" className="bg-light">See all e-Mails</a>
                                            </li>
                                        </ul>
                                    </li>

                                    {/* Auto Refresh */}
                                    <li className="dropdown user user-menu">

                                        <div className="auto">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" onClick={handleClick} type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
                                                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Auto Refresh</label>
                                            </div>
                                        </div>
                                    </li>


                                    {/* User Account*/}
                                    <li className="dropdown user user-menu">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                            </svg>
                                        </a>
                                        <ul className="dropdown-menu animated flipInX">
                                            {/* User image  */}
                                            <li className="user-header bg-img"
                                                data-overlay="3">
                                                <div className="flexbox align-self-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                    </svg>
                                                    <h4 className="user-name align-self-center">
                                                        <span>Admin</span>
                                                    </h4>
                                                </div>
                                            </li>
                                            {/* Logout  */}
                                            <li className="user-body">
                                                <div className="p-10"><a onClick={logout}
                                                    className="btn btn-sm btn-rounded btn-danger">LogOut <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                                    </svg></a></div>

                                            </li>
                                        </ul>
                                    </li>
                                    {/* gtech logo */}
                                    <li className="dropdown user user-menu alien">

                                        <div style={{ marginTop: '20px', marginLeft: '10px' }}>
                                            <img src={gtech} width="70px" alt="logo" />
                                        </div>
                                    </li>
                                    {/* Control Sidebar Toggle Button  */}
                                    <li>
                                        <a href="#" data-toggle="control-sidebar"></a>
                                    </li>

                                </ul>
                            </div>
                        </nav>
                    </header>
                    <aside className="main-sidebar">
                        {/* sidebar */}
                        <section className="sidebar">
                            {/* sidebar menu */}
                            <ul className="sidebar-menu" data-widget="tree">
                                <li className="treeview">
                                    <a href="#">
                                        <i className="ti-dashboard"></i>
                                        <span>Dashboard</span>
                                        <span className="pull-right-container">
                                            <i className="fa fa-angle-right pull-right"></i>
                                        </span>
                                    </a>

                                    <ul className="treeview-menu">
                                        {/* pagee */}
                                        <li><p className="ti-more" to="/Dashboard"><i className="ti-more"></i>Main Dashboard   </p></li>

                                    </ul>
                                </li>
                            </ul>
                        </section>
                    </aside>

                    <div className="content-wrapper">
                        <div className="container">
                            {/* Content Header (Page header)  */}


                            {/* Main content  */}
                            {/*  */}

                            {/*  */}
                            <section className="bg-white bott">
                                <div className="content-header">
                                    <div className="d-flex align-items-center">
                                        <div className="mr-auto">

                                            <div className="d-inline-block align-items-center">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Filters */}
                                <div>


                                    <div>
                                        <div className="box-header " style={{ borderBottom: '1px solid #0bb2d4' }}>
                                            <h4 id="titl" className="box-title" style={{ fontWeight: 500, fontFamily: '"calibri"' }}>Sales Dashboard</h4>
                                            <div style={{ float: 'right', marginLeft: '7px' }} className="right-title">
                                                <h5 className="mb-0" style={{ float: 'right' }}>
                                                    <button className="btn btn-link collapsed " type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                                        <i className="fa fa-plus"> Apply Filters</i>
                                                    </button>
                                                </h5>
                                                <button type="button" className="btn btn-primary" onClick={Filter} id="refresh"><i className="fa fa-refresh" /></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="collapse" id="collapseExample">
                                        <div className="card card-body ">

                                            <div className='row '>
                                                <div className="col-md-4 col-12">
                                                    <div className="form-group">
                                                        <label>Region</label>
                                                        <select className="form-control select2 select2-accessible" style={{ width: '100%' }} tabIndex={-3} value={valRegion} onChange={handleChangeRegion}>
                                                            <option value="">&lt;--Select Region--&gt;</option>
                                                            {region.map((param) => (   //here we map through the items                                                                
                                                                <option key={param.code} value={param.code}>{param.name}</option>

                                                            ))}
                                                        </select>
                                                    </div>
                                                    {/* /.form-group */}
                                                </div>
                                                <div className="col-md-4 col-12">
                                                    <div className="form-group">
                                                        <label>Location</label>
                                                        <select className="form-control select2 select2-accessible" style={{ width: '100%' }} tabIndex={-1} value={valLocation} onChange={handleChangeLocation}
                                                        >
                                                            <option value="">&lt;--Select Location--&gt;</option>
                                                            {Locationitems.map((param) => (   //here we map through the items                                                                
                                                                <option key={param.code} value={param.code}>{param.name}</option>

                                                            ))}
                                                        </select>

                                                    </div>
                                                    {/* /.form-group */}
                                                </div>
                                                <div className="col-md-4 col-12">
                                                    <div className="form-group">
                                                        <label>Category</label>
                                                        <select className="form-control select2 select2-accessible" style={{ width: '100%' }} tabIndex={-4} value={valCategory} onChange={handleChangeCategory}>
                                                            <option value="">&lt;--Select Category--&gt;</option>
                                                            {category.map((param) => (   //here we map through the items                                                                
                                                                <option key={param.code} value={param.code}>{param.name}</option>

                                                            ))}
                                                        </select>
                                                    </div>
                                                    {/* /.form-group */}
                                                </div>


                                            </div>
                                            <div className='row '>
                                                <div className="col-md-4 col-12">
                                                    <div className="form-group">
                                                        <label>Department</label>
                                                        <select className="form-control select2 select2-accessible" style={{ width: '100%' }} tabIndex={-3} value={valDepartment} onChange={handleChangeDepartment}>
                                                            <option value="">&lt;--Select Department--&gt;</option>
                                                            {department.map((param) => (   //here we map through the items                                                                
                                                                <option key={param.code} value={param.code}>{param.name}</option>

                                                            ))}
                                                        </select>
                                                    </div>
                                                    {/* /.form-group */}
                                                </div>
                                                <div className="col-md-4 col-12">
                                                    <div className="form-group">
                                                        <label>CoBrand</label>
                                                        <select className="form-control select2 select2-accessible" style={{ width: '100%' }} tabIndex={-1} value={value} onChange={handleChange}>
                                                            <option value="">&lt;--Select CoBrand--&gt;</option>
                                                            {coBrand.map((param) => (   //here we map through the items                                                                
                                                                <option key={param.code} value={param.code}>{param.name}</option>

                                                            ))}
                                                        </select>
                                                    </div>
                                                    {/* /.form-group */}
                                                </div>
                                                <div className="col-md-4 col-12">
                                                    <div className="form-group">
                                                        <label>Channel</label>
                                                        <select className="form-control select2 select2-accessible" style={{ width: '100%' }} tabIndex={-2} value={valChannel} onChange={handleChangeChannel}>

                                                            <option value="All">All</option>
                                                            <option value="Retail">Retail</option>
                                                            <option value="OnLine">OnLine</option>
                                                            <option value="Wholesale">Wholesale</option>
                                                        </select>
                                                    </div>
                                                    {/* /.form-group */}
                                                </div>


                                            </div>

                                            <div className="box-footer flexbox">
                                                <div className="text-center flex-grow">
                                                    <button id="btnFilter" className="btn btn-sm btn-primary" onClick={Filter}>Apply Filter</button>
                                                    {/* <button id="btnFilterDetail" className="btn btn-sm btn-primary" style={{ display: 'none' }} >Apply</button> */}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Filters */}

                                <div className="f5">

                                    <div className="contaiin bot mb-5">
                                        <BlueBox isLoading={isLoading} blueBoxData={blueBoxData} />
                                    </div>
                                </div>

                            </section>
                            {/* Summary */}
                            <div className="cont">
                                <div className="contain containMobile">
                                    <div className='myTbl'>
                                        <h3 className="page-title mar">Summary</h3>
                                        <hr className="mx-1" />
                                        <Summary isLoading={isLoading} items={items} monthlynetSale={monthlynetSale} previousYearMonthnetSale={previousYearMonthnetSale} />

                                    </div>
                                </div>
                                {/* tabs */}

                                <div className="contain bg-white  mt-5">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item"> <a onClick={() => toggleTab(1)} className="nav-link active pointer" data-toggle="tab"><span className="hidden-sm-up">Location</span> <span className="hidden-xs-down">Location</span></a> </li>
                                        <li className="nav-item"> <a onClick={() => toggleTab(2)} className="nav-link pointer" data-toggle="tab"><span className="hidden-sm-up">Region</span> <span className="hidden-xs-down">Region</span></a></li>
                                        <li className="nav-item"> <a onClick={() => toggleTab(3)} className="nav-link pointer" data-toggle="tab" ><span className="hidden-sm-up">CoBrand</span> <span className="hidden-xs-down">CoBrand</span></a></li>
                                        <li className="nav-item"> <a onClick={() => toggleTab(4)} className="nav-link pointer" data-toggle="tab"><span className="hidden-sm-up">Department</span> <span className="hidden-xs-down">Department</span></a></li>
                                        <li className="nav-item"> <a onClick={() => toggleTab(5)} className="nav-link pointer" data-toggle="tab" ><span className="hidden-sm-up">Category</span> <span className="hidden-xs-down">Category</span></a></li>
                                        <li className="nav-item"> <a onClick={() => toggleTab(6)} className="nav-link pointer" data-toggle="tab"><span className="hidden-sm-up">ProductionYear</span> <span className="hidden-xs-down">ProductionYear</span></a></li>
                                        <li className="nav-item"> <a onClick={() => toggleTab(7)} className="nav-link pointer" data-toggle="tab" ><span className="hidden-sm-up">Top 10 Designs</span> <span className="hidden-xs-down">Top 10 Designs</span></a></li>
                                    </ul>
                                    <div className={toggleState === 1 ? "content-active" : "content-inactive"}>
                                        <h4 className='mt-4'>Location Summary</h4>
                                        <Location isLoading={isLoading} itemsLocation={itemsLocation} LocationLabelsHook={LocationLabelsHook} LocationValueHook={LocationValueHook} />
                                    </div>
                                    <div className={toggleState === 2 ? "content-active" : "content-inactive"}>
                                        <Region />

                                    </div>
                                    <div className={toggleState === 3 ? "content-active" : "content-inactive"}>
                                        <CoBrand isLoading={isLoading} itemsCoBrand={itemsCoBrand} CoBrandValueHook={CoBrandValueHook} CoBrandLableHook={CoBrandLableHook} />
                                    </div>
                                    <div className={toggleState === 4 ? "content-active" : "content-inactive"}>
                                        <Department isLoading={isLoading} itemsDepartment={itemsDepartment} DepartmentValueHook={DepartmentValueHook} DepartmentLableHook={DepartmentLableHook} />
                                    </div>
                                    <div className={toggleState === 5 ? "content-active" : "content-inactive"}>
                                        <Category isLoading={isLoading} itemsCategory={itemsCategory} CategoryValueHook={CategoryValueHook} CategoryLableHook={CategoryLableHook} />
                                    </div>
                                    <div className={toggleState === 6 ? "content-active" : "content-inactive"}>
                                        <Production isLoading={isLoading} itemsProduction={itemsProduction} ProductionValueHook={ProductionValueHook} ProductionLableHook={ProductionLableHook} />
                                    </div>
                                    <div className={toggleState === 7 ? "content-active" : "content-inactive"}>
                                        <Top />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* footer */}
                    <footer className="main-footer" style={{ marginTop: "50px" }}>
                        <div className="footer-flex">
                            <p>{currentYear}-{nextYear} AL RAHIM RETAIL LTD Powered by G-Tech.  All Rights Reserved.</p>
                            <p onClick={scrollToTop} className="Top-Arrow"> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" className="bi bi-arrow-down-square" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                            </svg></p>
                        </div>
                    </footer>
                    <div className="control-sidebar-bg"></div>
                </div>
            </div>
        </>
    )

}

export default Dashboard