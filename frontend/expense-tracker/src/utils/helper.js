import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
};

export const getIntitials = (name) => {
    if(!name) return ""

    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
        
    }

    return initials.toUpperCase()
}

export const addThousandsSeperator = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInterger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart
    ? `${formattedInterger}.${fractionalPart}`
    : formattedInterger
}

export const prepareExpenseBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"), // Example: "10th Jan"
        amount: item?.amount,
        category: item?.category, // Assuming you track categories for expenses
    }));

    return chartData;
};
// export const prepareExpenseBarChartData = (data = []) => {
//     const chartData = data.map((item) => ({
//         category:item?.category,
//         amount: item?.amount,
//     }));

//     return chartData
// }

// export const prepareIncomeBarChartData = (data = []) => {
//     const sortedData = [...data].sort[(a,b) => new Date(a.date) - new Date(b.date)]

//     const chartData = sortedData.map((item) => ({
//         month: moment(item?.date).format("Do MMM"),
//         amount: item?.amount,
//         source: item?.source,
//     }))

//     return chartData
// }

export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"), // Example: "10th Jan"
        amount: item?.amount,
        source: item?.source,
    }));

    return chartData;
};