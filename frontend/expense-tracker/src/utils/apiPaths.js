export const BASE_URL = "https://personal-finance-tracker-6o3h.onrender.com"

// utils/apiPath.js
export const API_PATHS = {
    AUTH : {
        REGISTER: "/api/v1/users/register",
        GET_USER_INFO: "/api/v1/users/getUserInfo",
        LOGIN: "/api/v1/users/login",
        LOGOUT: "/api/v1/users/logout",
    },
    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard"
    },
    INCOME: {
        ADD_INCOME: "/api/v1/income/addIncome",
        GET_ALL_INCOME: "/api/v1/income/getAllIncome",
        DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME : "/api/v1/income/downloadIncomeExcel",
    },
    EXPENSE: {
        ADD_EXPENSE: "/api/v1/expense/addExpense",
        GET_ALL_EXPENSE: "/api/v1/expense/getAllExpense",
        DELETE_EXPENSE: (expenseId) =>  `/api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: "/api/v1/expense/downloadExpenseExcel",
    },
    // IMAGE: {
    //     UPLOAD_IMAGE: "/api/v1/users/"
    // }
}