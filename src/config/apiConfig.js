// const api_base_url = "http://localhost:8000"
const api_base_url = "https://backend-personal-finance-v6cd.onrender.com"


const API_ENDPOINTS = {
    LOGIN: `${api_base_url}/api/login`,
    REGISTER: `${api_base_url}/api/register`,
    LOGOUT: `${api_base_url}/logout`,
    PROTECTED: `${api_base_url}/protected`,
    GET_USER: `${api_base_url}/`,
    ADD_INCOME: `${api_base_url}/api2/income`,
    GET_INCOME: (id) => `${api_base_url}/api2/getIncome/${id}`,
    ADD_EXPENSE: `${api_base_url}/api2/expense`,
    GET_EXPENSE: (id) => `${api_base_url}/api2/getExpense/${id}`,
    ADD_TRANS: `${api_base_url}/api2/transactions`,
    GET_TRANS: (id) => `${api_base_url}/api2/getTrans/${id}`,
    ADD_BUDGET: `${api_base_url}/api2/budget`,
    GET_BUDGET: (id) => `${api_base_url}/api2/getBudget/${id}`,
    UPDATE_BUDGET: (Budget_id) => `${api_base_url}/api2/updateBudget/${Budget_id}`,
    DELETE_BUDGET: (Budget_id) => `${api_base_url}/api2/deleteBudget/${Budget_id}`,
    ADD_FGOAL: `${api_base_url}/api2/financialgoal`,
    GET_FGOAL: (id) => `${api_base_url}/api2/getfinancialgoal/${id}`,
    UPDATE_FGOAL: (fid) => `${api_base_url}/api2/updateFinancialgoal/${fid}`,
    DELETE_FGOAL: (fid) => `${api_base_url}/api2/deleteFinancialgoal/${fid}`,
    PAYMENT:`${api_base_url}/api3/checkout`,
    GET_CATEGORY:`${api_base_url}/api2/getcategory`,
    ADD_CATEGORY:`${api_base_url}/api2/category`
};

export default API_ENDPOINTS;