import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../components/layouts/DashboardLayout'
import { IncomeOverview } from '../../components/income/IncomeOverview';
import { axiosInstance } from '../../utils/axiosInsatce';
import { API_PATHS } from '../../utils/apiPaths';
import { Modal } from '../../components/Modal';
import { AddIncomeForm } from '../../components/income/AddIncomeForm';
import toast from 'react-hot-toast';
import { IncomeList } from '../../components/income/IncomeList';
import { DeleteAlert } from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

export const Income = () => {

  useUserAuth();

  const[incomeData, setIncomeData] = useState([]);
  const[loading, setLoading] = useState(false);
  const[openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

const [openAddIncomeModel, setOpenAddIncomeModal] = useState(false)

//Get all income details
const fetchIncomeDetails = async () => {
  if (loading) return;
  try {
    const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
    if (response.data) {
      setIncomeData(response.data);
    }
  } catch (error) {
    console.log("Something went wrong, Please try again",error);
    
  }finally{
    setLoading(false);
  }
};

//Handle add income
const handleAddIncome = async (income) => {
  const {source, amount, date, icon } = income;

  //validation checks
  if (!source.trim()) {
    toast.error("Source is required.");
    return;
  }

  if(!amount || isNaN(amount) || Number(amount) <= 0) {
    toast.error("Amonut should be valid number greater than 0.");
    return;
  }

  if(!date) {
    toast.error("Date is required.");
    return;
  }
  try {
    await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
      source,
      amount,
      date,
      icon,
    });

    setOpenAddIncomeModal(false);
    toast.success(" added successfully");
    fetchIncomeDetails();
  } catch (error) {
    console.error("Error adding income:", error.response?.data?.message || error.message);
  }
};

//Delete income
const deleteIncome = async (id) => {
  try {
    await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

    setOpenDeleteAlert({show:false, data:null});
    toast.success("Income details delted successfully");
    fetchIncomeDetails();
  } catch (error) {
    console.error("Error deleting income:",error.response?.data?.message || error.message); 
  }
};

//Handle download income details
const handleDownloadIncomeDetails = async () => {
    try {
    const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME,{responseType:"blob",});
    //Create a url for the blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "income_details.xlsx");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading income details:",error);
    toast.error("failed to download income details. Please try again");
  }
};

useEffect(() => {
  fetchIncomeDetails();

  return () => {
    
  }
}, [])

  return (
    <DashboardLayout activeMenu="Income">
         <div className="my-5 mx-auto">
          <div className='grid grid-cols-1 gap-6'>
            <div className=''>

              <IncomeOverview
              transactions={incomeData}
              onAddIncome={()=> setOpenAddIncomeModal(true)}
              />

            </div>

            <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({show:true, data:id});
            }}
            onDownload={handleDownloadIncomeDetails}
            />
          </div>

          <Modal
          isOpen={openAddIncomeModel}
          onClose={()=>setOpenAddIncomeModal(false)}
          title="Add Income"
          >
            <AddIncomeForm onAddIncome={handleAddIncome}/>

          </Modal>

            <Modal
          isOpen={openDeleteAlert.show}
          onClose={()=>setOpenDeleteAlert({show:false, data:null})}
          title="Delete Income"
          >
            <DeleteAlert
            content="Are you sure you want to delete this income details?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}/>

          </Modal>
          </div>
          </DashboardLayout>
  )
}
